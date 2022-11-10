import {get} from 'lodash';
import Redis from 'ioredis';
import {InjectRedisClient} from 'nestjs-ioredis-tags';
import got from 'got';
import {OnModuleInit} from '@nestjs/common';
import {Logger} from '../config/logger/api-logger';
import {awaiter, promiseMap} from '../utils';
import {TokensSwap} from '../dto/CoinMarketCapScraper';

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

export class CoinMarketCapScraperService implements OnModuleInit {

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
    @InjectRedisClient('ray.sx') private readonly redisClient: Redis
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
    Logger.info(`waiting for: ${cacheKey}...`);
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
    Logger.info(`waiting for: ${cacheKey}...`);
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
    await awaiter(0.65 * 1000);
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
      for (let i = 1; i < 6; i++) {
        try {
          const data = await this.getTokenData(token.slug);
          if (data) {
            await this.redisClient.set(cacheKey, JSON.stringify(
              Object.fromEntries(
                Object.entries(data)
                  .filter(([key]) =>
                    !['platforms',
                      'relatedCoins',
                      'relatedExchanges',
                      'wallets',
                      'holders'
                    ].includes(key)
                  )
              )
            ), 'PX', 24 * 60 * 60 * 1000);
            Logger.info(`cmc:uniInfo, ${step}, ${tokens.length}`);
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
      for (let i = 1; i < 6; i++) {
        try {
          const data = await this.getTokenData(token.slug);
          if (data) {
            await this.redisClient.set(cacheKey, JSON.stringify(
              Object.fromEntries(
                Object.entries(data)
                  .filter(([key]) =>
                    !['platforms',
                      'relatedCoins',
                      'relatedExchanges',
                      'wallets',
                      'holders'
                    ].includes(key)
                  )
              )
            ), 'PX', 24 * 60 * 60 * 1000);
            Logger.info(`cmc:panInfo, ${step}, ${tokens.length}`);
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
        id: token.address,
        slug: token.slug,
        name: data.name,
        symbol: data.symbol,
        logoURI: `https://s2.coinmarketcap.com/static/img/coins/64x64/${data.id}.png`,
        liquidity: data.statistics.fullyDilutedMarketCap,
        volume: data.volume,
        volumeChangePercentage24h: data.volumeChangePercentage24h,
        circulatingSupply: data.statistics.circulatingSupply,
        marketCap: data.statistics.marketCap,
        price: data.statistics.price,
        priceChangePercentage1h: data.statistics.priceChangePercentage1h,
        priceChangePercentage24h: data.statistics.priceChangePercentage24h,
        cmcId: data.id
      };
    }))).filter(Boolean);
  }
}
