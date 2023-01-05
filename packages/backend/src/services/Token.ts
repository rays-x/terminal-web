import {chunk, get, set} from 'lodash';
import Redis from 'ioredis';
import {InjectRedisClient} from 'nestjs-ioredis-tags';
import got from 'got';
import {HttpException, HttpStatus, Inject, OnModuleInit} from '@nestjs/common';
import {awaiter, promiseMap} from '../utils';
import {CMC_ID_USD_COIN, CMC_USER_AGENT, REDIS_TAG, TOKEN_CHAIN_IDS} from '../constants';
import {BitQueryService} from './BitQuery';
import {OptionsOfJSONResponseBody} from 'got/dist/source/types';
import {TokenCMCTokenInfoResponse} from '../types/Token/TokenCMCTokenInfoResponse';
import TokenEntity, {
  TokenEntityDefaultPopulate,
  TokenEntityDefaultSelect,
  TokenEntityDetailPopulate,
  TokenEntityPlatformPopulate
} from '../entities/Token/Token';
import {ReturnModelType} from '@typegoose/typegoose';
import {InjectModel} from 'nestjs-typegoose';
import TokenTagEntity from '../entities/Token/TokenTag';
import PlatformEntity from '../entities/Platform';
import {Logger} from '../config/logger/api-logger';
import {NewQueryTokensDto, TokenPaginationDto, TokensSortBy, TokensSortOrder} from '../dto/CoinMarketCapScraper';
import {CmcToken} from './CoinMarketCapScraper';
import TokenHistoryEntity from '../entities/Token/History/TokenHistory';
import {addDays, differenceInDays, format} from 'date-fns';
import {CoinMarketCapHistoricalResponse} from '../types/CoinMarketCap/CoinMarketCapHistoricalResponse';
import {Types} from 'mongoose';
import {TokenVolumeItem} from '../types/Token/TokenVolumeItem';
import {CmcPairListResponse} from '../types';
import PairEntity, {
  PairEntityBasePopulate,
  PairEntityDefaultPopulate,
  PairEntityDefaultSelect,
  PairEntityQuotePopulate
} from '../entities/Pair/Pair';
import DexEntity from '../entities/Dex';
import {TokenPairItem} from '../types/Token/TokenPairItem';
import {TokenCMCPlatformsResponse} from '../types/Token/TokenCMCPlatformsResponse';
import {TokenCMCPlatformDexsResponse} from '../types/Token/TokenCMCPlatformDexsResponse';
import PairHistoryEntity, {PairHistoryEntityDefaultSelect} from '../entities/Pair/PairHistory';
import {PairLiquidityItem} from '../types/Token/PairLiquidityItem';
import {HttpStatusMessages} from '../messages/http';
import {TokenTransfersItem} from '../types/Token/TokenTransfersItem';

const DEFAULT_AWAIT_TIME: number = 0.65 * 1000;

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const getDateDaysAgoArraysBy100 = (date: Date) => {
  const until = new Date(`${format(new Date(), 'yyyy-MM-dd')}T00:00:00.000Z`);
  const daysDiff = differenceInDays(until, date);
  const result = Array.from({length: daysDiff}).map((_, i) => {
    return `${format(addDays(new Date(until), -(i + 1)), 'yyyy-MM-dd')}T00:00:00.000Z`;
  }).reverse();
  return chunk(result, 100);
};

export class TokenService implements OnModuleInit {

  awaitTime: number = DEFAULT_AWAIT_TIME;
  sharedFilter = {
    slug: {
      $exists: true
    },
    $or: [
      {
        volume: {$exists: true, $ne: 0}
      },
      {
        volumeChangePercentage24h: {$exists: true, $ne: 0}
      },
      {
        'statistics.priceChangePercentage1h': {$exists: true, $ne: 0}
      },
      {
        'statistics.priceChangePercentage24h': {$exists: true, $ne: 0}
      },
      {
        'statistics.marketCap': {$exists: true, $ne: 0}
      },
      {
        'statistics.marketCapChangePercentage24h': {$exists: true, $ne: 0}
      }
    ],
    volume: {$exists: true, $ne: 0},
    platforms: {
      $elemMatch: {
        platform: {
          $in: TOKEN_CHAIN_IDS
        }
      },
      $exists: true, $type: 'array', $ne: []
    }
  };

  constructor(
    @InjectRedisClient(REDIS_TAG) private readonly redisClient: Redis,
    @InjectModel(TokenEntity) private readonly repoToken: ReturnModelType<typeof TokenEntity>,
    @InjectModel(TokenTagEntity) private readonly repoTokenTag: ReturnModelType<typeof TokenTagEntity>,
    @InjectModel(PlatformEntity) private readonly repoPlatform: ReturnModelType<typeof PlatformEntity>,
    @InjectModel(TokenHistoryEntity) private readonly repoTokenHistory: ReturnModelType<typeof TokenHistoryEntity>,
    @InjectModel(PairEntity) private readonly repoPair: ReturnModelType<typeof PairEntity>,
    @InjectModel(PairHistoryEntity) private readonly repoPairHistory: ReturnModelType<typeof PairHistoryEntity>,
    @InjectModel(DexEntity) private readonly repoDex: ReturnModelType<typeof DexEntity>,
    @Inject(BitQueryService) private readonly bitQueryService: BitQueryService
  ) {
  }

  async onModuleInit() {
    promiseMap([
      /*this._syncTokens, this._syncTokensHistory, this._syncPlatforms, this._syncDexs*/
      this._syncTokenTransfers
    ], async (start) => {
      try {
        await start(this);
      } catch(e) {
        Logger.error(get(e, 'message', e));
      }
    });
  }

  private async proxyRequest<T>(_url: string = undefined, {
    url = undefined,
    pathname = undefined,
    searchParams = undefined,
    ...rest
  }: OptionsOfJSONResponseBody) {
    try {
      return await got.get<T>(_url, {
        url,
        pathname,
        searchParams,
        ...rest,
        resolveBodyOnly: true
      });
    } catch(e) {
      Logger.debug(`mirror request ${get(e, 'message', e)} ${{
        url: _url || url,
        pathname,
        searchParams
      }}`);
      /*const uri = `${_url || url}${pathname || ''}${qs.stringify(searchParams || {}, {
        addQueryPrefix: true
      })}`;
      const encodeUri = encodeURIComponent(uri);
      return got.get<T>(`https://translate.yandex.ru/translate?url=${encodeUri}`, {
        ...rest,
        followRedirect: true,
        resolveBodyOnly: true
      });*/
      const {host} = new URL(_url || url);
      const hostReplaced = `${host.replace(/\./g, '-')}.translate.goog`;
      if(_url) {
        _url = _url.replace(host, hostReplaced);
      }
      if(url) {
        url = _url.replace(host, hostReplaced);
      }
      return got.get<T>(_url, {
        url,
        pathname,
        searchParams,
        ...rest,
        resolveBodyOnly: true
      });
    }
  }

  private async __getCmcTokens(self: TokenService): Promise<string[]> {
    await awaiter(self.awaitTime);
    const {fields, values} = await self.proxyRequest<{
      fields: string[],
      values: any[][],
    }>('https://s3.coinmarketcap.com/generated/core/crypto/cryptos.json', {
      responseType: 'json'
    });
    const slugIndex = fields.indexOf('slug');
    const activeIndex = fields.indexOf('is_active');
    const actives = values.filter((item) => item[activeIndex]);
    return actives.map((item) => item[slugIndex]);
  }

  private async __getTokenData(self: TokenService, slug: string): Promise<TokenCMCTokenInfoResponse> {
    await awaiter(self.awaitTime);
    const body = await self.proxyRequest<string>(`https://coinmarketcap.com/currencies/${slug}/`, {
      headers: {
        'user-agent': CMC_USER_AGENT,
        'accept-encoding': 'gzip, deflate, br'
      }
    });
    const regex = body.match(/<script id="__NEXT_DATA__" type="application\/json">(?<jsonData>.+)<\/script>/m);
    const data = JSON.parse(get(regex, 'groups.jsonData', 'null') || 'null');
    return get(data, 'props.pageProps.info');
  }

  private async __getPlatformsData(self: TokenService): Promise<TokenCMCPlatformsResponse['data']> {
    await awaiter(self.awaitTime);
    const body = await self.proxyRequest<TokenCMCPlatformsResponse>(`https://api.coinmarketcap.com/dexer/v3/dexer/platforms`, {
      headers: {
        'user-agent': CMC_USER_AGENT,
        'accept-encoding': 'gzip, deflate, br'
      },
      responseType: 'json'
    });
    return get(body, 'data', []).filter(({visibilityOnDexscan}) => visibilityOnDexscan);
  }

  private async _syncTokens(self: TokenService) {
    Logger.debug(`_syncTokens start`);
    const tokenSlugs = await self.__getCmcTokens(self);
    if(!tokenSlugs.length) {
      return;
    }
    const tokenExists = await self.repoToken.find().select(['slug', 'updatedAt']);
    const tokenSlugsNew = tokenSlugs.filter((slug) => tokenExists.findIndex(({slug: _}) => _ === slug) === -1);
    const tokenSlugsNeedUpdate = tokenExists.filter(({slug, updatedAt}) => {
      return tokenSlugs.indexOf(slug) !== -1 && new Date(updatedAt).getTime() < (new Date().getTime() - 1000 * 60 * 60 * 24);
    }).map(({slug}) => slug);
    const tokenSlugsOld = tokenExists.filter(({slug}) => tokenSlugs.indexOf(slug) === -1).map(({slug}) => slug);
    Logger.debug(`tokenSlugsNew:${tokenSlugsNew.length}`);
    Logger.debug(`tokenSlugsNeedUpdate:${tokenSlugsNeedUpdate.length}`);
    Logger.debug(`tokenSlugsOld:${tokenSlugsOld.length}`);
    const tokensToDelete = (await self.repoToken.find({
      slug: {
        $in: tokenSlugsOld
      }
    }).select(['id'])).map(({id}) => id);
    await Promise.all(tokensToDelete.map(async tokenId => {
      await self.repoTokenHistory.deleteMany({
        token: tokenId
      });
      await self.repoToken.deleteOne({_id: tokenId});
      const repoPairsToDelete = (await self.repoPair.find({
        $or: [
          {
            base: tokenId
          },
          {
            quote: tokenId
          }
        ]
      })).map(({id}) => id);
      if(!repoPairsToDelete.length) {
        return;
      }
      await self.repoPairHistory.deleteMany({
        pair: {
          $in: repoPairsToDelete
        }
      });
      await self.repoPair.deleteMany({
        $in: repoPairsToDelete
      });
    }));
    const tokensToUpsert = [...new Set([...tokenSlugsNew, ...tokenSlugsNeedUpdate])];
    await promiseMap(tokensToUpsert, async (slug) => {
      for(let i = 1; i < 6; i++) {
        try {
          const data = await self.__getTokenData(self, slug);
          if(data) {
            try {
              const platforms = await Promise.all(get(data, 'platforms', []).map(async ({
                                                                                          contractPlatform: name,
                                                                                          contractChainId: chainId,
                                                                                          contractAddress: address,
                                                                                          // platformCryptoId: cmcCrypto,
                                                                                          contractPlatformId: cmc
                                                                                        }) => {
                const platform = await self.repoPlatform.findOneAndUpdate({
                  cmc
                }, {
                  name,
                  cmc,
                  chainId
                  // cmcCrypto
                }, {
                  upsert: true,
                  new: true
                });
                return {
                  platform: platform.id,
                  address
                };
              }));
              await self.repoToken.findOneAndUpdate({slug},
                {
                  cmc: data.id,
                  cmcAdded: new Date(`${format(new Date(data.dateAdded), 'yyyy-MM-dd')}T00:00:00.000Z`),
                  slug: data.slug,
                  name: data.name,
                  symbol: data.symbol,
                  category: data.category,
                  description: data.description,
                  dateLaunched: data.dateLaunched,
                  tags: await Promise.all(get(data, 'tags', []).map(async ({
                                                                             slug,
                                                                             name,
                                                                             category
                                                                           }) => {
                    const tag = await self.repoTokenTag.findOneAndUpdate({
                      slug
                    }, {
                      slug,
                      name,
                      category
                    }, {
                      upsert: true,
                      new: true
                    });
                    return {
                      tag: tag.id
                    };
                  })),
                  urls: {
                    website: get(data, 'urls.website', []).map((link) => ({link})),
                    technicalDoc: get(data, 'urls.technicalDoc', []).map((link) => ({link})),
                    explorer: get(data, 'urls.explorer', []).map((link) => ({link})),
                    sourceCode: get(data, 'urls.sourceCode', []).map((link) => ({link})),
                    messageBoard: get(data, 'urls.messageBoard', []).map((link) => ({link})),
                    chat: get(data, 'urls.chat', []).map((link) => ({link})),
                    announcement: get(data, 'urls.announcement', []).map((link) => ({link})),
                    reddit: get(data, 'urls.reddit', []).map((link) => ({link})),
                    facebook: get(data, 'urls.facebook', []).map((link) => ({link})),
                    twitter: get(data, 'urls.twitter', []).map((link) => ({link}))
                  },
                  volume: data.volume,
                  volumeChangePercentage24h: data.volumeChangePercentage24h,
                  cexVolume: data.cexVolume,
                  dexVolume: data.dexVolume,
                  statistics: {
                    price: get(data, 'statistics.price'),
                    priceChangePercentage1h: get(data, 'statistics.priceChangePercentage1h'),
                    priceChangePercentage24h: get(data, 'statistics.priceChangePercentage24h'),
                    priceChangePercentage7d: get(data, 'statistics.priceChangePercentage7d'),
                    marketCap: get(data, 'statistics.marketCap'),
                    marketCapChangePercentage24h: get(data, 'statistics.marketCapChangePercentage24h'),
                    fullyDilutedMarketCap: get(data, 'statistics.fullyDilutedMarketCap'),
                    fullyDilutedMarketCapChangePercentage24h: get(data, 'statistics.fullyDilutedMarketCapChangePercentage24h'),
                    circulatingSupply: get(data, 'statistics.circulatingSupply'),
                    totalSupply: get(data, 'statistics.totalSupply')
                  },
                  platforms: platforms,
                  selfReportedTags: data.selfReportedTags,
                  selfReportedCirculatingSupply: data.selfReportedCirculatingSupply
                },
                {
                  upsert: true,
                  new: true
                }).select(['id']);
              Logger.debug(`updated ${slug} ${tokensToUpsert.indexOf(slug) + 1} of ${tokensToUpsert.length}`);
              break;
            } catch(e) {
              Logger.error(e);
            }
          } else {
            await awaiter(i * 30 * 1000);
          }
        } catch(e) {
          await awaiter(i * 60 * 1000);
        }
      }
    });
    Logger.debug(`_syncTokens done`);
  }

  private async _syncTokensHistory(self: TokenService) {
    Logger.debug(`_syncPlatforms start`);
    const tokens = await self.repoToken.find({
      ...self.sharedFilter,
      cmcAdded: {
        $exists: true
      }
    }).select(['id', 'slug', 'cmc', 'cmcAdded']).sort({cmc: 1});
    await promiseMap(tokens, async token => {
      const lastHistoryDate = get(await self.repoTokenHistory.findOne({
        token: token.id
      }).sort('-date').select(['date']), 'date', token.cmcAdded);
      if(lastHistoryDate.getTime() === new Date(`${format(addDays(new Date(), -1), 'yyyy-MM-dd')}T00:00:00.000Z`).getTime()) {
        return;
      }
      const chunksDate = getDateDaysAgoArraysBy100(lastHistoryDate);
      await promiseMap(chunksDate, async dateChunk => {
        const [timeStart, timeEnd] = [
          new Date(dateChunk.at(0)).getTime() / 1000,
          new Date(dateChunk.at(-1)).getTime() / 1000
        ];
        for(let i = 1; i < 6; i++) {
          try {
            const data = await self.proxyRequest<CoinMarketCapHistoricalResponse>(`https://api.coinmarketcap.com/data-api/v3/cryptocurrency/historical`, {
              searchParams: {
                id: token.cmc,
                convertId: CMC_ID_USD_COIN,
                timeStart,
                timeEnd
              },
              headers: {
                'user-agent': CMC_USER_AGENT,
                'accept-encoding': 'gzip, deflate, br'
              },
              responseType: 'json'
            });
            await Promise.all(get(data, 'data.quotes', []).map(async quote => {
              const date = new Date(`${format(new Date(quote.quote.timestamp), 'yyyy-MM-dd')}T00:00:00.000Z`);
              try {
                await self.repoTokenHistory
                .findOneAndUpdate(
                  {
                    token: token.id,
                    date: date
                  },
                  {
                    token: token.id,
                    date: date,
                    volume: quote.quote.volume,
                    marketCap: quote.quote.marketCap,
                    price: quote.quote.close
                  },
                  {
                    upsert: true,
                    new: true
                  }
                );
              } catch(e) {
                Logger.error(e);
              }
            }));
            break;
          } catch(e) {
            Logger.error(e);
            await awaiter(i * 60 * 1000);
          }
        }
      });
      Logger.debug(`history done ${token.cmc} ${tokens.findIndex(({slug}) => slug === token.slug) + 1} of ${tokens.length}`);
    });
    Logger.debug(`_syncTokensHistory done`);
  }

  private async _syncPlatforms(self: TokenService): Promise<void> {
    Logger.debug(`_syncPlatforms start`);
    const platformsCmc = await self.__getPlatformsData(self);
    await Promise.all(platformsCmc.map(async platform => {
      return self.repoPlatform.findOneAndUpdate({
        cmc: platform.id
      }, {
        cmc: platform.id,
        cmcCrypto: platform.cryptoId,
        cmcDexerName: platform.dexerPlatformName,
        name: platform.name,
        explorerUrlFormat: platform.explorerUrlFormat,
        dexerTxHashFormat: platform.dexerTxhashFormat
      }, {
        upsert: true
      });
    }));
    Logger.debug(`_syncPlatforms done`);
  }

  private async _syncDexs(self: TokenService): Promise<void> {
    Logger.debug(`_syncDexs start`);
    const platforms = await self.repoPlatform.find({
      cmcDexerName: {
        $exists: true
      }
    }).select('cmc');
    await promiseMap<PlatformEntity>(platforms, async platform => {
      const data = await self.proxyRequest<TokenCMCPlatformDexsResponse>('https://api.coinmarketcap.com/dexer/v3/platformpage/platform-dexers', {
        headers: {
          'user-agent': CMC_USER_AGENT,
          'accept-encoding': 'gzip, deflate, br'
        },
        searchParams: {
          'platform-id': platform.cmc
        },
        responseType: 'json'
      });
      const dexs = get(data, 'data.exchangeList', []);
      await Promise.all(dexs.map(async dex => {
        return self.repoDex.findOneAndUpdate({
          cmc: dex.dexerId
        }, {
          cmc: dex.dexerId,
          name: dex.dexerName,
          platform: platform.id
        }, {
          upsert: true
        });
      }));
    });
    Logger.debug(`_syncDexs done`);
  }

  private async _syncPairs(self: TokenService) {
    Logger.debug(`_syncPairs start`);
    const tokens: { id: string, platforms: { [k: string]: { id: string, address: string } } }[] = (await self.repoToken.find({
      ...self.sharedFilter,
      platforms: {
        ...self.sharedFilter.platforms,
        $elemMatch: {
          platform: {
            $in: TOKEN_CHAIN_IDS
          }
        }
      },
      dexVolume: {
        $gt: 0
      }
    })
    .select(['_id', 'platforms.address'])
    .populate({
      ...TokenEntityPlatformPopulate,
      select: ['_id', 'cmc']
    }).sort('-statistics.marketCap'))
    .map(item => ({
      id: String(item.id),
      platforms: Object.fromEntries(item.platforms.map(({
                                                          platform,
                                                          address
                                                        }) => [(platform as PlatformEntity).cmc, {
        address: address.toLowerCase(),
        id: String(platform.id)
      }]))
    }));
    const dexsObject = Object.fromEntries((await self.repoDex.find().select(['_id', 'cmc'])).map((({
                                                                                                     _id,
                                                                                                     cmc
                                                                                                   }) => [cmc, _id])));
    const platformsObject = Object.fromEntries((await self.repoPlatform.find().select(['_id', 'cmc'])).map((({
                                                                                                               _id,
                                                                                                               cmc
                                                                                                             }) => [cmc, _id])));
    await promiseMap(tokens, async token => {
      const platformId = Object.keys(token.platforms).sort().shift();
      const cacheKey = `cmc:pairList:${token.id}`;
      const cache = JSON.parse(await self.redisClient.get(cacheKey) || 'null');
      if(cache) {
        return;
      }
      let start = 1;
      let hasNextPage = true;
      let pairList: CmcPairListResponse['data'] = [];
      const makeRequest = async (): Promise<boolean> => {
        await awaiter(self.awaitTime);
        const {data} = await this.proxyRequest<CmcPairListResponse>(`https://api.coinmarketcap.com/dexer/v3/dexer/pair-list`, {
          headers: {
            'user-agent': CMC_USER_AGENT,
            'accept-encoding': 'gzip, deflate, br'
          },
          searchParams: {
            'base-address': get(token.platforms, `${platformId}.address`),
            start,
            limit: 100,
            'platform-id': platformId,
            'sort-field': 'volume24h',
            desc: true
          },
          responseType: 'json'
        });
        start = start + 100;
        pairList = data || [];
        return Boolean(pairList.length && !pairList.find(item => get(item, 'volume24h', '0') === '0'));
      };
      for(let i = 1; i < 6; i++) {
        try {
          while(hasNextPage !== false) {
            hasNextPage = await makeRequest();
            await Promise.all(pairList.filter(({volume24h}) => volume24h !== '0').map(async (item) => {
              try {
                const quoteId = get(tokens.find(({platforms}) => {
                  return get<any, string>(platforms, `${item.platform.id}.address`) === item.quoteToken.address.toLowerCase();
                }), 'id');
                if(!quoteId) {
                  return;
                }
                await this.repoPair.findOneAndUpdate({cmc: item.poolId, base: token.id}, {
                  cmc: item.poolId,
                  base: token.id,
                  quote: quoteId,
                  dex: get(dexsObject, item.dexerInfo.id),
                  platform: get(platformsObject, item.platform.id),
                  address: item.pairContractAddress,
                  liquidity: item.liquidity,
                  volume24h: item.volume24h
                }, {
                  upsert: true
                }).select('id');
              } catch(e) {
                //skip shit coins found error
                Logger.error(get(e, 'message', e));
              }
            }));
            Logger.debug(`pair ${tokens.findIndex(_token => _token.id === token.id) + 1} of ${tokens.length}, ${token.id} , offset: ${start}`);
          }
          try {
            await self.redisClient.set(cacheKey, JSON.stringify(true), 'PX', 24 * 60 * 60 * 1000);
          } catch(e) {
            //
          }
          break;
        } catch(e) {
          await awaiter(i * 60 * 1000);
        }
      }
    });
    Logger.debug(`_syncPairs done`);
  }

  private async _syncPairsLiquidity(self: TokenService) {
    Logger.debug(`_syncPairsLiquidity start`);
    const TokenChainIdStrings = TOKEN_CHAIN_IDS.map(String);
    const platforms = (await self.repoPlatform.find({
      _id: {
        $in: TOKEN_CHAIN_IDS
      },
      bqSlug: {
        $exists: true
      }
    }).select('bqSlug')).map(({id, bqSlug}) => ({id, bqSlug}));
    const tokens: {
      id: string, platforms: {
        id: string
        pairs: {
          bqSlug: string
          id: string
          address: string
          base: {
            id: string
            address: string
          }
          quote: {
            id: string
            address: string
          }
        }[]
      }[]
    }[] = await Promise.all((await self.repoToken.find({
      ...self.sharedFilter,
      platforms: {
        ...self.sharedFilter.platforms,
        $elemMatch: {
          platform: {
            $in: TOKEN_CHAIN_IDS
          }
        }
      },
      dexVolume: {
        $gt: 0
      }
    })
    .select(['_id', 'platforms.address'])
    .populate({
      ...TokenEntityPlatformPopulate,
      select: ['_id', 'cmc']
    }).sort('-statistics.marketCap'))
    .map(async item => ({
      id: String(item.id),
      platforms: await Promise.all(item.platforms.filter(({platform}) => TokenChainIdStrings.includes(String(platform.id))).map(async ({
                                                                                                                                         platform
                                                                                                                                       }) => ({
        id: String(platform.id),
        pairs: (await self.repoPair.find({
            $or: [
              {
                base: item.id
              },
              {
                quote: item.id
              }
            ],
            platform: platform.id
          })
          .select(['base', 'quote', 'address'])
          .populate([
            {
              ...PairEntityBasePopulate,
              select: ['platforms.platform', 'platforms.address']
            },
            {
              ...PairEntityQuotePopulate,
              select: ['platforms.platform', 'platforms.address']
            }
          ])
        ).map((pair) => {
          return ({
            bqSlug: platforms.find(_platform => _platform.id === String(platform.id))?.bqSlug,
            id: pair.id,
            address: pair.address,
            base: {
              id: String(pair.base.id),
              address: ((pair.base as TokenEntity).platforms).find(_platform => String(_platform.platform) === String(platform.id))?.address?.toLowerCase()
            },
            quote: {
              id: String(pair.quote.id),
              address: ((pair.quote as TokenEntity).platforms).find(_platform => String(_platform.platform) === String(platform.id))?.address?.toLowerCase()
            }
          });
        })
      })))
    })));
    await promiseMap<typeof tokens[0]>(tokens, async token => {
      const cacheKey = `cmc:pairsLiquidity:${token.id}`;
      const cache = JSON.parse(await self.redisClient.get(cacheKey) || 'null');
      if(cache) {
        return;
      }
      await promiseMap<typeof token['platforms'][0]>(token.platforms, async platform => {
        await promiseMap(chunk(platform.pairs, 20), async chunkPairs => {
          await Promise.all(chunkPairs.map(async pair => {
            const lastHistoryDate = get(await self.repoPairHistory.findOne({
              pair: pair.id
            }).sort('-date').select(['date']), 'date', new Date(0));
            if(lastHistoryDate.getTime() === new Date(`${format(addDays(new Date(), -1), 'yyyy-MM-dd')}T00:00:00.000Z`).getTime()) {
              return;
            }
            const firstHistoryDate = get(await self.repoPairHistory.findOne({
              pair: pair.id
            }).sort('date').select(['date']), 'date');
            let daysOffset = 0;
            if(firstHistoryDate) {
              daysOffset = differenceInDays(firstHistoryDate, new Date(`${format(addDays(new Date(), -2), 'yyyy-MM-dd')}T00:00:00.000Z`));
            }
            for(let dayStep = -2 + daysOffset; true; dayStep--) {
              try {
                const date = new Date(`${format(addDays(new Date(), dayStep), 'yyyy-MM-dd')}T00:00:00.000Z`);
                const [priceBase, priceQuote] = [get(await self.repoTokenHistory.findOne({
                  token: pair.base.id,
                  date
                }).select('price'), 'price'), get(await self.repoTokenHistory.findOne({
                  token: pair.quote.id,
                  date
                }).select('price'), 'price')];
                if(!priceBase || !priceQuote) {
                  break;
                }
                const balances = await self.bitQueryService.getBalancesOfPair({
                  network: pair.bqSlug,
                  date: date.toISOString(),
                  poolAddress: pair.address,
                  baseToken: pair.base.address,
                  quoteToken: pair.quote.address
                });
                if(!Object.keys(balances || {}).length) {
                  if(daysOffset !== 0 && dayStep === -2 + daysOffset) {
                    dayStep = -1;
                    continue;
                  } else {
                    break;
                  }
                }
                const liquidity = get(balances, pair.base.address, 0) * priceBase + get(balances, pair.quote.address, 0) * priceQuote;
                await self.repoPairHistory.findOneAndUpdate({
                  pair: pair.id,
                  date
                }, {
                  pair: pair.id,
                  date,
                  liquidity
                }, {
                  upsert: true
                });
              } catch(e) {
                Logger.error(get(e, 'message', e));
                break;
              }
              // Logger.debug(`daysOffset ${pair.address} ${dayStep}`);
            }
            Logger.debug(`pair ${platform.pairs.findIndex(({id}) => id === pair.id) + 1} of:${platform.pairs.length}`);
          }));
        });
        Logger.debug(`platforms ${token.platforms.findIndex(({id}) => id === platform.id) + 1} of:${token.platforms.length}`);
      });
      try {
        await self.redisClient.set(cacheKey, JSON.stringify(true), 'PX', 24 * 60 * 60 * 1000);
      } catch(e) {
        //
      }
      Logger.debug(`tokens ${tokens.findIndex(({id}) => id === token.id) + 1} of:${tokens.length}`);
    });
    Logger.debug(`_syncPairsLiquidity done`);
  }

  private async _syncTokenTransfers(self: TokenService) {
    Logger.debug(`_syncTokenTransfers start`);
    const TokenChainIdStrings = TOKEN_CHAIN_IDS.map(String);
    const platforms = (await self.repoPlatform.find({
      _id: {
        $in: TOKEN_CHAIN_IDS
      },
      bqSlug: {
        $exists: true
      }
    }).select('bqSlug')).map(({id, bqSlug}) => ({id, bqSlug}));
    const tokens: {
      id: string,
      platforms: {
        address: string
        bqSlug: string
      }[]
    }[] = await Promise.all((await self.repoToken.find({
      ...self.sharedFilter,
      platforms: {
        ...self.sharedFilter.platforms,
        $elemMatch: {
          platform: {
            $in: TOKEN_CHAIN_IDS
          }
        }
      },
      dexVolume: {
        $gt: 0
      }
    })
    .select(['_id', 'platforms.address'])
    .populate({
      ...TokenEntityPlatformPopulate,
      select: ['_id', 'cmc']
    }).sort('-statistics.marketCap'))
    .map(async item => ({
      id: String(item.id),
      platforms: await Promise.all(item.platforms.filter(({platform}) => TokenChainIdStrings.includes(String(platform.id))).map(async ({
                                                                                                                                         platform,
                                                                                                                                         address
                                                                                                                                       }) => ({
        address,
        bqSlug: platforms.find(_platform => _platform.id === String(platform.id))?.bqSlug
      })))
    })));
    await promiseMap<typeof tokens[0]>(tokens, async token => {
      const cacheKey = `token:stt:${token.id}`;
      const cache = JSON.parse(await self.redisClient.get(cacheKey) || 'null');
      if(cache) {
        // return;
      }
      try {
        const data = await self.bitQueryService.statsTransfersNew(token.platforms.map(({
                                                                                         address,
                                                                                         bqSlug: network
                                                                                       }) => ({
          address,
          network
        })));
        await Promise.all(data.map(async ({date, ...transfers}) => {
          await self.repoTokenHistory.findOneAndUpdate({
            token: token.id,
            date: new Date(date)
          }, {
            transfers
          });
        }));
      } catch(e) {
        return console.error(e);
      }
      try {
        await self.redisClient.set(cacheKey, JSON.stringify(true), 'PX', 24 * 60 * 60 * 1000);
      } catch(e) {
        //
      }
      Logger.debug(`tokens ${tokens.findIndex(({id}) => id === token.id) + 1} of:${tokens.length}`);
    });
    Logger.debug(`_syncTokenTransfers done`);
  }

  public async tokens({
                        chains: _chainIds,
                        search: _search,
                        limit,
                        offset,
                        sortBy,
                        sortOrder
                      }: NewQueryTokensDto): Promise<{
    tokens: CmcToken[],
    tokensCount: number
  }> {
    const chainIds = _chainIds.length ? _chainIds : TOKEN_CHAIN_IDS;
    const search = _search?.toLowerCase();
    const filterShared = {
      ...this.sharedFilter,
      platforms: {
        ...this.sharedFilter.platforms,
        $elemMatch: {
          platform: {
            $in: chainIds
          }
        }
      }
    };
    const filter = search ? {
      $and: [
        {
          $or: [
            {
              name: {
                $regex: new RegExp(search, 'i')
              }
            },
            {
              symbol: {
                $regex: new RegExp(search, 'i')
              }
            },
            {
              platforms: {
                $elemMatch: {
                  address: {
                    $regex: new RegExp(search, 'i')
                  }
                }
              }
            }
          ]
        },
        {
          ...filterShared
        }
      ]
    } : filterShared;
    const [tokens, tokensCount] = await Promise.all([this.repoToken.find(filter).populate(TokenEntityDefaultPopulate)
    .skip(Number(offset))
    .limit(Number(limit))
    .sort((() => {
      return `${sortOrder === TokensSortOrder.desc ? '-' : ''}${(() => {
        switch(sortBy) {
          case TokensSortBy.symbol: {
            return 'symbol';
          }
          case TokensSortBy.volume: {
            return 'volume';
          }
          case TokensSortBy.volumeChangePercentage24h: {
            return 'volumeChangePercentage24h';
          }
          case TokensSortBy.marketCap: {
            return 'statistics.marketCap';
          }
          case TokensSortBy.liquidity: {
            return 'statistics.fullyDilutedMarketCap';
          }
          case TokensSortBy.circulatingSupply: {
            return 'statistics.circulatingSupply';
          }
          case TokensSortBy.price: {
            return 'statistics.price';
          }
          case TokensSortBy.priceChangePercentage1h: {
            return 'statistics.priceChangePercentage1h';
          }
          case TokensSortBy.priceChangePercentage24h: {
            return 'statistics.priceChangePercentage24h';
          }
        }
      })()}`;
    })())
    .select(TokenEntityDefaultSelect),
      this.repoToken.count(filter)
    ]);
    return {
      tokens: tokens.map((data) => ({
        id: data.id,
        slug: data.slug,
        name: data.name,
        symbol: data.symbol,
        logoURI: `https://s2.coinmarketcap.com/static/img/coins/64x64/${data.cmc}.png`,
        liquidity: data.statistics.fullyDilutedMarketCap,
        volume: data.volume,
        volumeChangePercentage24h: data.volumeChangePercentage24h,
        circulatingSupply: Number(data.statistics.circulatingSupply) || Number(data.selfReportedCirculatingSupply || 0),
        marketCap: data.statistics.marketCap,
        price: data.statistics.price,
        priceChangePercentage1h: data.statistics.priceChangePercentage1h,
        priceChangePercentage24h: data.statistics.priceChangePercentage24h,
        cmcId: data.cmc,
        platforms: data.platforms.map((
          {
            id,
            address,
            platform: platformId
          }
        ) => ({
          id,
          address,
          platformId
        }))
      })),
      tokensCount
    };
  }

  public async token(slug: string): Promise<any> {
    const {
      cmcAdded,
      ...token
    } = (
      await this.repoToken
      .findOne({slug})
      .select([...TokenEntityDefaultSelect, 'cmcAdded'])
      .populate(TokenEntityDetailPopulate)
    )?.toJSON();
    if(!token) {
      throw new HttpException(HttpStatusMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return {
      ...token,
      dateLaunched: token.dateLaunched || cmcAdded
    };
  }

  public async volume(token: Types.ObjectId, {limit, offset}: TokenPaginationDto): Promise<{
    items: TokenVolumeItem[],
    count: number
  }> {
    const cacheKey = `token:volume:${token}`;
    const cache = JSON.parse(await this.redisClient.get(cacheKey) || 'null');
    if(cache) {
      return cache;
    }
    const filter = {
      token
    };
    const [items, count] = await Promise.all([this.repoTokenHistory.find(filter)
    .skip(Number(offset))
    .limit(Number(limit) || Infinity)
    .sort('-date')
    .select(['_id', 'date', 'volume']),
      this.repoTokenHistory.count(filter)
    ]);
    const result = {
      items,
      count
    };
    await this.redisClient.set(cacheKey, JSON.stringify(result), 'PX', 24 * 60 * 60 * 1000);
    return result;
  }

  public async transfers(token: Types.ObjectId, {limit, offset}: TokenPaginationDto): Promise<{
    items: TokenTransfersItem[],
    count: number
  }> {
    const cacheKey = `token:transfers:${token}`;
    const cache = JSON.parse(await this.redisClient.get(cacheKey) || 'null');
    if(cache) {
      return cache;
    }
    const filter = {
      token,
      transfers: {
        $exists: true
      }
    };
    const [items, count] = await Promise.all([this.repoTokenHistory.find(filter)
    .skip(Number(offset))
    .limit(Number(limit) || Infinity)
    .sort('-date')
    .select(['_id', 'date', 'transfers']),
      this.repoTokenHistory.count(filter)
    ]);
    const result = {
      items: items.map((item) => {
        const {id, date, transfers} = item.toJSON();
        return {
          id,
          date,
          ...transfers
        };
      }),
      count
    };
    await this.redisClient.set(cacheKey, JSON.stringify(result), 'PX', 24 * 60 * 60 * 1000);
    return result;
  }

  public async liquidity(token: Types.ObjectId, {limit, offset}: TokenPaginationDto): Promise<{
    items: PairLiquidityItem[],
    count: number
  }> {
    const cacheKey = `token:liquidity:${token}`;
    const cache = JSON.parse(await this.redisClient.get(cacheKey) || 'null');
    if(cache) {
      return cache;
    }
    const pairs = (await this.repoPair.find({
      $or: [
        {
          base: token
        },
        {
          quote: token
        }
      ]
    }).select('_id')).map(({id}) => id);
    const filter = {
      pair: {
        $in: pairs
      }
    };
    const items = (await this.repoPairHistory.find(filter)
    .skip(Number(offset))
    .limit(Number(limit) || Infinity)
    .sort('-date')
    .select(PairHistoryEntityDefaultSelect)).map((item) => item.toJSON())
    .reduce<{ [k: string]: number }>((prev, {date: _date, liquidity}) => {
      const date = `${_date.getTime()}`;
      set(prev, date, get(prev, date, 0) + liquidity);
      return prev;
    }, {});
    const result = {
      items: Object.entries(items).map(([date, liquidity]) => ({
        id: new Types.ObjectId(),
        date: new Date(Number(date)).toISOString(),
        liquidity
      })),
      count: Object.keys(items).length
    };
    await this.redisClient.set(cacheKey, JSON.stringify(result), 'PX', 24 * 60 * 60 * 1000);
    return result;
  }

  public async pairs(token: Types.ObjectId, {limit, offset}: TokenPaginationDto): Promise<{
    items: TokenPairItem[],
    count: number
  }> {
    const filter = {
      $or: [
        {
          base: token
        },
        {
          quote: token
        }
      ],
      platform: {
        $in: TOKEN_CHAIN_IDS
      }
    };
    const [items, count] = await Promise.all([this.repoPair.find(filter)
    .skip(Number(offset))
    .limit(Number(limit) || Infinity)
    .select(PairEntityDefaultSelect)
    .populate(PairEntityDefaultPopulate)
    .sort('-volume24h')
    .collation({locale: 'en_US', numericOrdering: true}),
      this.repoPair.count(filter)
    ]);
    return {
      items,
      count
    };
  }
}
