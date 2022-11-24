import {get} from 'lodash';
import Redis from 'ioredis';
import {InjectRedisClient} from 'nestjs-ioredis-tags';
import got from 'got';
import {Inject, OnModuleInit} from '@nestjs/common';
import md5 from 'md5';
import {Logger} from '../config/logger/api-logger';
import {awaiter, promiseMap} from '../utils';
import {toFixedToken} from '../utils/diff';
import {TokensSwap, TransactionsResponse} from '../dto/CoinMarketCapScraper';
import {CmcPairListResponse} from '../types';
import {CMC_ID_BTC_PLATFORM, CMC_ID_ETH_PLATFORM} from '../constants';
import {BitQueryService} from './BitQuery';
import {CovalentService} from './Covalent';

type UniToken = {
  chainId: number;
  name: string;
  address: string;
  decimals: number;
  symbol: string;
  logoURI: string;
  slug: string;
}

type CmcToken = {
  id: string,
  slug: string,
  name: string,
  symbol: string,
  logoURI: string,
  liquidity: number,
  volume: number,
  volumeChangePercentage24h: number,
  circulatingSupply: number,
  marketCap: number,
  price: number,
  priceChangePercentage1h: number,
  priceChangePercentage24h: number,
  cmcId: number
}

const DEFAULT_AWAIT_TIME: number = 0.65 * 1000;

const CMC_ID_UNISWAP_V3 = 1348;
const CMC_ID_UNISWAP_V2 = 1069;
const CMC_ID_PANCAKE_V2 = 1344;

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export class CoinMarketCapScraperService implements OnModuleInit {

  awaiterPairsList: {
    [k: string]: boolean
  } = {};
  awaitTime: number = DEFAULT_AWAIT_TIME;
  _uniTokens: {
    [k: string]: {
      address: string
      slug: string
    }
  } = {};
  _panTokens: {
    [k: string]: {
      address: string
      slug: string
    }
  } = {};

  constructor(
    @InjectRedisClient('ray.sx') private readonly redisClient: Redis,
    @Inject(BitQueryService) private readonly bitQueryService: BitQueryService,
    @Inject(CovalentService) private readonly covalentService: CovalentService
  ) {
  }

  async onModuleInit() {
    this.addInfoToUniTokens().finally();
    this.addInfoToPanTokens().finally();
  }

  private async getUniTokens(): Promise<typeof this._uniTokens> {
    const cacheKey = 'cmc:getUniswapTokens';
    const cache = JSON.parse(await this.redisClient.get(cacheKey) || 'null');
    if (cache) {
      this._uniTokens = cache;
      return cache;
    }
    Logger.debug(`waiting for: ${cacheKey}...`);
    const {body: cryptos} = await got.get<{
      fields: string[],
      values: any[][],
    }>('https://s3.coinmarketcap.com/generated/core/crypto/cryptos.json', {
      responseType: 'json'
    });
    const slugIndex = cryptos.fields.indexOf('slug');
    const addressIndex = cryptos.fields.indexOf('address');
    const slugs: {
      [k: string]: string[]
    } = Object.fromEntries(
      cryptos.values
        .filter(_ => _[addressIndex].length)
        .map((item) => [
          item[slugIndex],
          item[addressIndex].map(_ => _.toLowerCase())
        ])
    );
    const {body: {tokens}} = await got.get <{
      tokens: Omit<UniToken, 'slug'>[]
    }>('https://api.coinmarketcap.com/data-api/v3/uniswap/all.json', {
      responseType: 'json'
    });
    this._uniTokens = Object.fromEntries(tokens.reduce((prev, {address = ''}) => {
      let slug = Object.entries(slugs).find(([, addresses]) => {
        return addresses.find(_ => _.includes(address.toLowerCase()));
      })?.shift();
      switch (slug) {
        case 'weth': {
          slug = 'ethereum';
          break;
        }
      }
      return slug ? [
        ...prev,
        [
          slug,
          {
            address,
            slug
          }
        ]
      ] : prev;
    }, []));
    await this.redisClient.set(cacheKey, JSON.stringify(this._uniTokens), 'PX', 24 * 60 * 60 * 1000);
    return this._uniTokens;
  }

  private async getPanTokens(): Promise<typeof this._panTokens> {
    const cacheKey = 'cmc:getPancakeswapTokens';
    const cache = JSON.parse(await this.redisClient.get(cacheKey) || 'null');
    if (cache) {
      this._panTokens = cache;
      return cache;
    }
    Logger.debug(`waiting for: ${cacheKey}...`);
    const {body: cryptos} = await got.get<{
      fields: string[],
      values: any[][],
    }>('https://s3.coinmarketcap.com/generated/core/crypto/cryptos.json', {
      responseType: 'json'
    });
    const slugIndex = cryptos.fields.indexOf('slug');
    const addressIndex = cryptos.fields.indexOf('address');
    const slugs: [string, string[]][] =
      cryptos.values
        .filter(_ => _[addressIndex].length)
        .map((item) => [
          item[slugIndex],
          item[addressIndex].map(_ => _.toLowerCase()).join(',')
        ]);
    const {body} = await got.get('https://api.covalenthq.com/v1/56/xy=k/pancakeswap_v2/tokens/', {
      searchParams: {
        key: 'ckey_65c7c5729a7141889c2cdea0556',
        'page-size': 50000
      }
    });
    const items = body.match(/"0x.{40}",/gm)?.map(_ => _.substring(1, 42).toLowerCase());
    this._panTokens = Object.fromEntries(items.reduce((prev, address) => {
      const slug = get(slugs.find(([, addresses]) => {
        return addresses.includes(address);
      }), 0);
      return slug ? [
        ...prev,
        [
          slug,
          {
            address,
            slug
          }
        ]
      ] : prev;
    }, []));
    await this.redisClient.set(cacheKey, JSON.stringify(this._panTokens), 'PX', 24 * 60 * 60 * 1000);
    return this._panTokens;
  }

  private async getTokenData(slug: string) {
    await awaiter(this.awaitTime);
    const {body} = await got.get<string>(`https://coinmarketcap.com/currencies/${slug}/`, {
      headers: {
        'user-agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)'
      }
    });
    const regex = body.match(/<script id="__NEXT_DATA__" type="application\/json">(?<jsonData>.+)<\/script>/m);
    const data = JSON.parse(get(regex, 'groups.jsonData', 'null') || 'null');
    return get(data, 'props.pageProps.info');
  }

  private async addInfoToUniTokens(fromLoop = false) {
    let step = 1;
    const tokens = Object.values(await this.getUniTokens());
    await promiseMap(tokens, async (token: {
      address: string
      slug: string
    }) => {
      const cacheKey = `cmc:ait:${token.slug}`;
      const cache = JSON.parse(await this.redisClient.get(cacheKey) || 'null');
      if (cache && (!fromLoop || get(cache, 'status') !== 'active')) {
        return step++;
      }
      if (cache
        && new Date(get(cache, 'latestUpdateTime')).getTime() > (new Date().getTime() - 60 * 60 * 60 * 1000)
      ) {
        return step++;
      }
      for (let i = 1; i < 6; i++) {
        try {
          const data = await this.getTokenData(token.slug);
          const platform_binance = get(get(data, 'platforms', [])
            .find(_ => _.contractChainId === 56), 'contractAddress', '').toLowerCase() || undefined;
          const platform_ethereum = get(get(data, 'platforms', []).find(_ => _.contractChainId === 1), 'contractAddress', '').toLowerCase() || undefined;
          if ((platform_binance || platform_ethereum) && IS_PRODUCTION) {
            this.bitQueryService.statsTransfers(platform_binance, platform_ethereum, true).catch();
            this.bitQueryService.statsSwaps(platform_binance, platform_ethereum, true).catch();
            this.bitQueryService.statsHolders(platform_binance, platform_ethereum, true).catch();
            this.covalentService.statsLiquidity(platform_binance, platform_ethereum, true).catch();
          }
          if (data) {
            await this.redisClient.set(cacheKey, JSON.stringify(
              Object.fromEntries(
                Object.entries(data)
                  .filter(([key]) =>
                    !['relatedCoins',
                      'relatedExchanges',
                      'wallets',
                      'holders'
                    ].includes(key)
                  )
              )
            ), 'PX', 24 * 60 * 60 * 1000);
            Logger.debug(`cmc:uniInfo, ${step}, ${tokens.length}`);
            return step++;
          } else {
            // await awaiter(i * 30 * 1000);
          }
        } catch (e) {
          await awaiter(i * 60 * 1000);
        }
      }
      return step++;
    });
    if (this.awaitTime === DEFAULT_AWAIT_TIME) {
      this.awaitTime = DEFAULT_AWAIT_TIME * 3;
    }
    return this.addInfoToUniTokens(true);
  }

  private async addInfoToPanTokens(fromLoop = false) {
    let step = 1;
    const tokens = Object.values(await this.getPanTokens());
    await promiseMap(tokens, async (token: {
      address: string
      slug: string
    }) => {
      const cacheKey = `cmc:ait:${token.slug}`;
      const cache = JSON.parse(await this.redisClient.get(cacheKey) || 'null');
      if (cache && (!fromLoop || get(cache, 'status') !== 'active')) {
        return step++;
      }
      if (cache
        && new Date(get(cache, 'latestUpdateTime')).getTime() > (new Date().getTime() - 60 * 60 * 60 * 1000)
      ) {
        return step++;
      }
      for (let i = 1; i < 6; i++) {
        try {
          const data = await this.getTokenData(token.slug);
          const platform_binance = get(get(data, 'platforms', [])
            .find(_ => _.contractChainId === 56), 'contractAddress', '').toLowerCase() || undefined;
          const platform_ethereum = get(get(data, 'platforms', []).find(_ => _.contractChainId === 1), 'contractAddress', '').toLowerCase() || undefined;
          if ((platform_binance || platform_ethereum) && IS_PRODUCTION) {
            this.bitQueryService.statsTransfers(platform_binance, platform_ethereum, true).catch();
            this.bitQueryService.statsSwaps(platform_binance, platform_ethereum, true).catch();
            this.bitQueryService.statsHolders(platform_binance, platform_ethereum, true).catch();
            this.covalentService.statsLiquidity(platform_binance, platform_ethereum, true).catch();
          }
          if (data) {
            await this.redisClient.set(cacheKey, JSON.stringify(
              Object.fromEntries(
                Object.entries(data)
                  .filter(([key]) =>
                    !['relatedCoins',
                      'relatedExchanges',
                      'wallets',
                      'holders'
                    ].includes(key)
                  )
              )
            ), 'PX', 24 * 60 * 60 * 1000);
            Logger.debug(`cmc:panInfo, ${step}, ${tokens.length}`);
            return step++;
          } else {
            // await awaiter(i * 30 * 1000);
          }
        } catch (e) {
          await awaiter(i * 60 * 1000);
        }
      }
      return step++;
    });
    if (this.awaitTime === DEFAULT_AWAIT_TIME) {
      this.awaitTime = DEFAULT_AWAIT_TIME * 3;
    }
    return this.addInfoToPanTokens(true);
  }

  async tokens(swap: TokensSwap): Promise<CmcToken[]> {
    const tokens = Object.values(
      swap === TokensSwap.uniswap
        ? this._uniTokens
        : this._panTokens
    );
    return (await Promise.all(tokens.map(async token => {
      const data = JSON.parse(await this.redisClient.get(`cmc:ait:${token.slug}`) || 'null');
      if (!data) {
        return null;
      }
      if (data.status !== 'active') {
        return;
      }
      return {
        id: get(get(data, 'platforms', []).find(p => p.contractChainId === (
          swap === TokensSwap.uniswap
            ? 1
            : 56
        )), 'contractAddress', token.address).toLowerCase(),
        slug: token.slug,
        name: data.name,
        symbol: data.symbol,
        logoURI: `https://s2.coinmarketcap.com/static/img/coins/64x64/${data.id}.png`,
        liquidity: data.statistics.fullyDilutedMarketCap,
        volume: data.volume,
        volumeChangePercentage24h: data.volumeChangePercentage24h,
        circulatingSupply: Number(data.statistics.circulatingSupply) || Number(data.selfReportedCirculatingSupply || 0),
        marketCap: data.statistics.marketCap,
        price: data.statistics.price,
        priceChangePercentage1h: data.statistics.priceChangePercentage1h,
        priceChangePercentage24h: data.statistics.priceChangePercentage24h,
        cmcId: data.id
      };
    }))).filter(Boolean);
  }

  async pairsInfo(platform: string, pairs: string[]): Promise<{
    [k: string]: unknown
  }> {
    const cacheKey = `cmc:pairInfo:${platform}:${md5(pairs.join(','))}`;
    const cache = JSON.parse(await this.redisClient.get(cacheKey) || 'null');
    const result = {};
    if (cache) {
      return cache;
    }
    await Promise.all(pairs.map(async (pair) => {
      const {body} = await got.get(`https://api.coinmarketcap.com/dexer/v3/dexer/pair-info`, {
        headers: {
          'user-agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)'
        },
        searchParams: {
          base: 0,
          t: new Date().getTime(),
          'dexer-platform-name': platform,
          address: pair
        },
        responseType: 'json'
      });
      const data = get(body, 'data');
      if (data) {
        result[data['address']] = data;
      }
    }));
    if (pairs.length === Object.keys(result).length) {
      await this.redisClient.set(cacheKey, JSON.stringify(result), 'PX', 30 * 24 * 60 * 60 * 1000);
    }
    return result;
  }

  async pairsList(dex: ('uniswap' | 'pancakeswap')[], address: string, platform: number): Promise<any> {
    const cacheKey = `cmc:pairList:${dex.sort((a, b) => {
      return a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: 'base'
      });
    }).join(',')}:${md5(address)}`;
    if (cacheKey in this.awaiterPairsList) {
      return [];
    }
    const cache = JSON.parse(await this.redisClient.get(cacheKey) || 'null');
    if (cache) {
      return cache;
    }
    if (!(cacheKey in this.awaiterPairsList)) {
      this.awaiterPairsList[cacheKey] = true;
    }
    try {
      const getData = async (params, prev: CmcPairListResponse['data']): Promise<CmcPairListResponse['data']> => {
        const {body: {data}} = await got.get<CmcPairListResponse>(`https://api.coinmarketcap.com/dexer/v3/dexer/pair-list`, {
          headers: {
            'user-agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)'
          },
          searchParams: params,
          responseType: 'json'
        });
        return !data?.length
          ? prev
          : await getData({
            ...params,
            start: params.start === 1 ? 100 : params.start + 100
          }, [...prev, ...data]);
      };
      const data = await getData({
        'base-address': address,
        start: 1,
        limit: 100,
        'platform-id': platform
      }, []);
      const result = data?.filter((item => dex.findIndex(_ => {
        return (() => {
          switch (_) {
            case 'uniswap': {
              return [
                CMC_ID_UNISWAP_V3,
                CMC_ID_UNISWAP_V2
              ];
            }
            case 'pancakeswap': {
              return [
                CMC_ID_PANCAKE_V2
              ];
            }
            default: {
              return [];
            }
          }
        })().includes(item.dexerInfo.id);
      }) > -1)).sort((a, b) => {
        return Number(b.volume24h) - Number(a.volume24h);
      });
      if (data) {
        await this.redisClient.set(cacheKey, JSON.stringify(result), 'PX', 30 * 24 * 60 * 60 * 1000);
      }
      if (cacheKey in this.awaiterPairsList) {
        delete this.awaiterPairsList[cacheKey];
      }
      return result;
    } catch (e) {
      if (cacheKey in this.awaiterPairsList) {
        delete this.awaiterPairsList[cacheKey];
      }
    }
    return [];
  }

  async transactions(btcPairs: string[], ethPairs: string[]): Promise<TransactionsResponse['data']['transactions']> {
    const pairs: {
      [k: string]: TransactionsResponse['data']['transactions']
    } = Object.fromEntries(await Promise.all([
      ...btcPairs.map(pairId => [CMC_ID_BTC_PLATFORM, pairId]),
      ...ethPairs.map(pairId => [CMC_ID_ETH_PLATFORM, pairId])
    ].map(async ([key, params]) => {
      const [pairId, reversOrder, from] = String(params).split('_');
      const {
        body: {data: {transactions}}
      } = await got.get<TransactionsResponse>({
        headers: {
          'user-agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)'
        },
        url: 'https://api.coinmarketcap.com',
        pathname: `/kline/v3/k-line/transactions/${key}/${pairId}`,
        searchParams: from ? {
          'reverse-order': reversOrder === 'true',
          from
        } : {
          'reverse-order': reversOrder === 'true'
        },
        responseType: 'json'
      });
      return [
        pairId,
        transactions.map(_ => ({
          pairId,
          exchange: key === CMC_ID_BTC_PLATFORM ? 'pancakeswap' : 'uniswap',
          ..._
        }))
      ];
    })));
    const pairsIds = Object.keys(pairs);
    const lastTime = pairsIds.reduce((prev, pairId) => {
      const transactions = pairs[pairId];
      const lastElementTime = Number(get(transactions.at(-1), 'time'));
      if (isNaN(prev)) {
        return lastElementTime;
      }
      return lastElementTime < prev ? lastElementTime : prev;
    }, NaN);
    if (isNaN(lastTime)) {
      return [];
    }
    return Object.values(pairs).reduce((prev, transactions) => {
      const filtered = transactions.filter(transaction => Number(transaction.time) >= lastTime);
      return [...prev, ...filtered];
    }, []).sort((a, b) => Number(b.time) - Number(a.time));
  }
}
