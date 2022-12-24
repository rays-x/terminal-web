import {get, chunk} from 'lodash';
import Redis from 'ioredis';
import {InjectRedisClient} from 'nestjs-ioredis-tags';
import got from 'got';
import {Inject, OnModuleInit} from '@nestjs/common';
import {awaiter, promiseMap} from '../utils';
import {CMC_ID_USD_COIN, CMC_USER_AGENT, TOKEN_CHAIN_IDS} from '../constants';
import {BitQueryService} from './BitQuery';
import {CovalentService} from './Covalent';
import {OptionsOfJSONResponseBody} from 'got/dist/source/types';
import qs from 'qs';
import {TokenCMCTokenInfoResponse} from '../types/Token/TokenCMCTokenInfoResponse';
import TokenEntity, {TokenEntityDefaultSelect} from '../entities/Token/Token';
import {ReturnModelType} from '@typegoose/typegoose';
import {InjectModel} from 'nestjs-typegoose';
import TokenTagEntity from '../entities/Token/TokenTag';
import TokenPlatformEntity from '../entities/Token/TokenPlatforms';
import {Logger} from '../config/logger/api-logger';
import {NewQueryTokensDto, TokensSortBy, TokensSortOrder, TokenVolumeDto} from '../dto/CoinMarketCapScraper';
import {CmcToken} from './CoinMarketCapScraper';
import TokenHistory, {TokenHistoryEntityDefaultSelect} from '../entities/Token/TokenHistory';
import {addDays, format, differenceInDays} from 'date-fns';
import {CoinMarketCapHistoricalResponse} from '../types/CoinMarketCap/CoinMarketCapHistoricalResponse';
import {BaseDocumentType, Types} from "mongoose";
import {TokenVolumeItem} from "../types/Token/TokenVolumeItem";

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

  constructor(
    @InjectRedisClient('ray.sx') private readonly redisClient: Redis,
    @InjectModel(TokenEntity) private readonly repoToken: ReturnModelType<typeof TokenEntity>,
    @InjectModel(TokenTagEntity) private readonly repoTokenTag: ReturnModelType<typeof TokenTagEntity>,
    @InjectModel(TokenPlatformEntity) private readonly repoTokenPlatform: ReturnModelType<typeof TokenPlatformEntity>,
    @InjectModel(TokenHistory) private readonly repoTokenHistory: ReturnModelType<typeof TokenHistory>,
    @Inject(BitQueryService) private readonly bitQueryService: BitQueryService,
    @Inject(CovalentService) private readonly covalentService: CovalentService
  ) {
  }

  async onModuleInit() {
    // this.addInfoToCmcTokens().catch();
    // this.history().catch();
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
      console.log('mirror request', get(e, 'message', e));
      const uri = `${_url || url}${pathname || ''}${qs.stringify(searchParams || {}, {
        addQueryPrefix: true
      })}`;
      const encodeUri = encodeURIComponent(uri);
      return got.get<T>(`https://translate.yandex.ru/translate?url=${encodeUri}`, {
        ...rest,
        followRedirect: true,
        resolveBodyOnly: true
      });
    }
  }

  private async getCmcTokens(): Promise<string[]> {
    const {fields, values} = await this.proxyRequest<{
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

  private async getTokenData(slug: string): Promise<TokenCMCTokenInfoResponse> {
    await awaiter(this.awaitTime);
    const body = await this.proxyRequest<string>(`https://coinmarketcap.com/currencies/${slug}/`, {
      headers: {
        'user-agent': CMC_USER_AGENT,
        'accept-encoding': 'gzip, deflate, br'
      }
    });
    const regex = body.match(/<script id="__NEXT_DATA__" type="application\/json">(?<jsonData>.+)<\/script>/m);
    const data = JSON.parse(get(regex, 'groups.jsonData', 'null') || 'null');
    return get(data, 'props.pageProps.info');
  }

  private async addInfoToCmcTokens() {
    const tokenSlugs = await this.getCmcTokens();
    const tokenExists = (await this.repoToken.find().select(['slug', 'cmcAdded'])).map(({slug, cmcAdded}) => ({
      slug,
      cmcAdded
    }));
    const tokenExistsSlugs = (await this.repoToken.find().select(['slug'])).map(({slug}) => slug);
    const tokenSlugsNew = tokenSlugs.filter((slug) => tokenExistsSlugs.indexOf(slug) === -1);
    const tokenSlugsNeedUpdate = tokenSlugs.filter((slug) => {
      const found = tokenExists.find(({slug: _}) => _ === slug);
      if(!found) return false;
      return !found?.cmcAdded;
    });
    const tokenSlugsOld = tokenExistsSlugs.filter((slug) => tokenSlugs.indexOf(slug) === -1);
    console.log(`tokenSlugsNew:${tokenSlugsNew.length}`);
    console.log(`tokenSlugsNeedUpdate:${tokenSlugsNeedUpdate.length}`);
    Logger.debug(`tokenSlugsOld:${tokenSlugsOld.length}`);
    await promiseMap([...new Set([...tokenSlugsNew, ...tokenSlugsNeedUpdate])], async (slug) => {
      for(let i = 1; i < 6; i++) {
        try {
          const data = await this.getTokenData(slug);
          if(data) {
            try {
              await this.repoToken.findOneAndUpdate({slug},
                {
                  cmc: data.id,
                  cmcAdded: new Date(`${format(new Date(data.dateAdded), 'yyyy-MM-dd')}T00:00:00.000Z`),
                  slug: data.slug,
                  name: data.name,
                  symbol: data.symbol,
                  category: data.category,
                  description: data.description,
                  tags: await Promise.all(get(data, 'tags', []).map(async ({
                                                                             slug,
                                                                             name,
                                                                             category
                                                                           }) => {
                    const platform = await this.repoTokenTag.findOneAndUpdate({
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
                      tag: platform.id
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
                  platforms: await Promise.all(get(data, 'platforms', []).map(async ({
                                                                                       contractPlatform: name,
                                                                                       contractChainId: chainId,
                                                                                       contractAddress: address
                                                                                     }) => {
                    const platform = await this.repoTokenPlatform.findOneAndUpdate({
                      name
                    }, {
                      name,
                      chainId
                    }, {
                      upsert: true,
                      new: true
                    });
                    return {
                      platform: platform.id,
                      address
                    };
                  })),
                  selfReportedTags: data.selfReportedTags,
                  selfReportedCirculatingSupply: data.selfReportedCirculatingSupply
                },
                {
                  upsert: true,
                  new: true
                });
              console.log('updated', slug);
              break;
            } catch(e) {
              console.error(e);
            }
          } else {
            await awaiter(i * 30 * 1000);
          }
        } catch(e) {
          await awaiter(i * 60 * 1000);
        }
      }
    });
  }

  async tokens({
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
      $or: [
        {
          volume: {$exists: true, $ne: 0}
        },
        {
          volumeChangePercentage24h: {$exists: true, $ne: 0}
        },
        {
          'statistics.price': {$exists: true, $ne: 0}
        },
        {
          'statistics.priceChangePercentage1h': {$exists: true, $ne: 0}
        },
        {
          'statistics.priceChangePercentage24h': {$exists: true, $ne: 0}
        },
        {
          'statistics.priceChangePercentage7d': {$exists: true, $ne: 0}
        },
        {
          'statistics.marketCap': {$exists: true, $ne: 0}
        },
        {
          'statistics.marketCapChangePercentage24h': {$exists: true, $ne: 0}
        },
        {
          'statistics.fullyDilutedMarketCap': {$exists: true, $ne: 0}
        },
        {
          'statistics.fullyDilutedMarketCapChangePercentage24h': {$exists: true, $ne: 0}
        },
        {
          'statistics.circulatingSupply': {$exists: true, $ne: 0}
        },
        {
          'statistics.totalSupply': {$exists: true, $ne: 0}
        }
      ],
      platforms: {
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
    const [tokens, tokensCount] = await Promise.all([this.repoToken.find(filter)
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
    .select([...TokenEntityDefaultSelect]),
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
            platform: {id: platformId}
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

  private async history() {
    const filterShared = {
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
      platforms: {
        $elemMatch: {
          platform: {
            $in: TOKEN_CHAIN_IDS
          }
        }
      }
    };
    const tokens = await this.repoToken.find({
      ...filterShared,
      cmcAdded: {
        $exists: true
      }
    }).select(['id', 'slug', 'cmc', 'cmcAdded']).sort({cmc: 1});
    console.log('history start of:', tokens.length);
    await promiseMap(tokens, async token => {
      const lastHistoryDate = get(await this.repoTokenHistory.findOne({
        token: token.id
      }).sort('-date').select(['date']), 'date', token.cmcAdded);
      if (lastHistoryDate.getTime() === new Date(`${format(addDays(new Date(), -1), 'yyyy-MM-dd')}T00:00:00.000Z`).getTime()) {
        return;
      }
      const chunksDate = getDateDaysAgoArraysBy100(lastHistoryDate);
      await promiseMap(chunksDate, async dateChunk => {
        const [timeStart, timeEnd] = [
          new Date(dateChunk.at(0)).getTime() / 1000,
          new Date(dateChunk.at(-1)).getTime() / 1000
        ];
        for (let i = 1; i < 6; i++) {
          try {
            const data = await this.proxyRequest<CoinMarketCapHistoricalResponse>(`https://api.coinmarketcap.com/data-api/v3/cryptocurrency/historical`, {
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
            if (data.data) {
              await Promise.all(data.data.quotes.map(async quote => {
                const date = new Date(`${format(new Date(quote.quote.timestamp), 'yyyy-MM-dd')}T00:00:00.000Z`);
                try {
                  await this.repoTokenHistory
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
                } catch (e) {
                  console.error(e);
                }
              }));
            } else {
              // console.log('!data', token.cmc, data);
            }
            break;
          } catch (e) {
            console.error(e);
            await awaiter(i * 60 * 1000);
          }
        }
        // await awaiter(1000);
      });
      console.log('history done', token.cmc, tokens.findIndex(({slug}) => slug === token.slug) + 1, 'of', tokens.length);
    });
    console.log('history finished of:', tokens.length);
  }

  async token(slug: string): Promise<any> {
    return this.repoToken.findOne({slug});
  }

  async volume(token: Types.ObjectId, {limit, offset,}: TokenVolumeDto): Promise<{
    items: TokenVolumeItem[],
    count: number
  }> {
    const filter = {
      token
    }
    const [items, count] = await Promise.all([this.repoTokenHistory.find(filter)
    .skip(Number(offset))
    .limit(Number(limit))
    .sort('-date')
    .select([...TokenHistoryEntityDefaultSelect]),
      this.repoTokenHistory.count(filter)
    ]);
    return {
      items,
      count
    };
  }
}
