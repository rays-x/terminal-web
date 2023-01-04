import {get, set} from 'lodash';
import Redis from 'ioredis';
import {InjectRedisClient} from 'nestjs-ioredis-tags';
import got from 'got';
import md5 from 'md5';
import {addDays, format} from 'date-fns';
import {BitQueryStatsTransfersQuery} from '../types/BitQuery/BitQueryStatsTransfersQuery';
import {BitQueryStatsSwapsQuery} from '../types/BitQuery/BitQueryStatsSwapsQuery';
import {BitQueryStatsHoldersQuery} from '../types/BitQuery/BitQueryStatsHoldersQuery';
import {promiseMap} from '../utils';
import {CMC_USER_AGENT} from '../constants';
import {BitQueryStatsTradersDistributionValueQuery} from '../types/BitQuery/BitQueryStatsTradersDistributionValueQuery';
import {getRange} from '../utils/diff';
import {BitQueryStatsPairStatisticsQuery} from '../types/BitQuery/BitQueryStatsPairStatisticsQuery';
import {BitQueryBalanceOfPairQuery} from '../types/BitQuery/BitQueryBalanceOfPairQuery';

const since = () => format(addDays(new Date(), -20), 'yyyy-MM-dd');
const sinceArray = () => Array.from({length: 21}).map((_, i) => format(addDays(new Date(), 0 - i), 'yyyy-MM-dd'));
const sinceYesterday = () => `${format(addDays(new Date(), -1), 'yyyy-MM-dd')}T00:00:00.000Z`;
const sinceLastWeek = () => `${format(addDays(new Date(), -8), 'yyyy-MM-dd')}T00:00:00.000Z`;
const tillToday = () => `${format(new Date(), 'yyyy-MM-dd')}T00:00:00.000Z`;
const DEEP_OF_STEP = 100;

export class BitQueryService {

  awaiterStatsTransfersList: {
    [k: string]: boolean
  } = {};

  awaiterStatsSwapsList: {
    [k: string]: boolean
  } = {};

  awaiterStatsHoldersList: {
    [k: string]: boolean
  } = {};

  awaiterTradersDistributionValueList: {
    [k: string]: boolean
  } = {};

  awaiterPairStatisticsList: {
    [k: string]: boolean
  } = {};

  cookie: string;
  token: string;

  constructor(
    @InjectRedisClient('ray.sx') private readonly redisClient: Redis
  ) {
    this.cookie = '_explorer_session=4yYmFNlXf5q5TDjTin4xPrXyePxBUkQEK%2B%2FdYf7BXatzbczijLoPeXsYnXmoZznqbF5lR%2BGShh61QnrqjCAtHkhQF2HUa8g9xTIP%2B1WEaUWjR9Ji1kUW48QKL86BCTuJBzozLcjksPexQqYQN9PymBHWVBzh%2FDkDfeXSn%2F5tsTJ6DZ5AYenUDcHRwpzCPzrs38j88O%2FX0cE3krIKfwMKVNpgv5bYqwE5fV5AzhlFdrI0tltWONK7nZLJaAxXtLxQ%2BdGTHttvpUNOp%2FrrlfV5MOWWPgWV7oQ06gudbs5fG79dz9nXthlWIETNNO6FB9FoAvkGHOxziE0ZdK1eeP0le%2F8%3D--XHqGDaPmOgSBQ%2F2a--HwvPr1erEbmpJu%2FS%2F2RGgw%3D%3D';
    this.token = '+LDiubcQUptEmjNSJQICeNWkdi77X3iAKQQ8dSyD+VkhwPhDf3lOj6oZyqnAmube1UyI57igIekZb87YHEMYjQ==';
  }

  private async getStatsTransfers(variables: {
    network: 'ethereum' | 'bsc',
    token: string
  }) {
    const {
      data: {
        stats: {
          transfers
        }
      }
    } = await got.post<BitQueryStatsTransfersQuery>('https://explorer.bitquery.io/proxy_graphql', {
      json: {
        query: `
        query (
          $network: EthereumNetwork!,
          $token: String!,
          $since: ISO8601DateTime,
          $till: ISO8601DateTime
        ) {
          stats: ethereum(network: $network) {
            transfers(
            options: {desc: "date.date"},
            currency: {is: $token},
            amount: {gt: 0},
            date: {since: $since, till: $till}
            ) {
              date {
                date: date
              }
              total_amount: amount
              total_amount_usd: amount(in: USD)
              median_transfer_amount: amount(calculate: median)
              median_transfer_amount_usd: amount(calculate: median, in: USD)
              average_transfer_amount: amount(calculate: average)
              average_transfer_amount_usd: amount(calculate: average, in: USD)
              uniq_receivers: count(uniq: receivers)
              uniq_senders: count(uniq: senders)
              transfer_count: count
            }
          }
        }
        `,
        variables: {
          ...variables,
          since: since()
        }
      },
      headers: {
        'user-agent': CMC_USER_AGENT,
        'accept-encoding': 'gzip, deflate, br',
        'Cookie': this.cookie,
        'X-CSRF-Token': this.token
      },
      responseType: 'json',
      resolveBodyOnly: true
    });
    return transfers;
  }

  private async getStatsSwaps(variables: {
    network: 'ethereum' | 'bsc',
    token: string
  }) {
    const {
      data: {
        stats: {
          swaps
        }
      }
    } = await got.post<BitQueryStatsSwapsQuery>('https://explorer.bitquery.io/proxy_graphql', {
      json: {
        query: `
        query ($network: EthereumNetwork!, $since: ISO8601DateTime, $token: String!) {
          stats: ethereum(network: $network) {
            swaps: dexTrades(
              baseCurrency: {is: $token}
              options: {desc: "date.date"}
              date: {since: $since, till: null}
            ) {
              date {
                date
              }
              tradeAmountUsd: tradeAmount(in: USD)
              countTxs: count(uniq: txs)
            }
          }
        }
        `,
        variables: {
          ...variables,
          since: since()
        }
      },
      headers: {
        'user-agent': CMC_USER_AGENT,
        'accept-encoding': 'gzip, deflate, br',
        'Cookie': this.cookie,
        'X-CSRF-Token': this.token
      },
      responseType: 'json',
      resolveBodyOnly: true
    });
    return swaps;
  }

  private async getStatsHolders(variables: {
    network: 'ethereum' | 'bsc',
    token: string,
    till: string
  }) {
    const {
      data: {
        stats: {
          holders
        }
      }
    } = await got.post<BitQueryStatsHoldersQuery>('https://explorer.bitquery.io/proxy_graphql', {
      json: {
        query: `
        query ($network: EthereumNetwork!, $till: ISO8601DateTime, $token: String!) {
          stats: ethereum(network: $network) {
            holders: transfers(
              currency: {is: $token}
              date: {till: $till}
            ) {
              count(uniq: receivers, amount: {gt: 0})
            }
          }
        }
        `,
        variables
      },
      headers: {
        'user-agent': CMC_USER_AGENT,
        'accept-encoding': 'gzip, deflate, br',
        'Cookie': this.cookie,
        'X-CSRF-Token': this.token
      },
      responseType: 'json',
      resolveBodyOnly: true
    });
    return holders?.shift();
  }

  private async getStatsTradersDistributionValue(variables: {
    network: 'ethereum' | 'bsc',
    token: string,
    since: string
    till: string
  }): Promise<BitQueryStatsTradersDistributionValueQuery['data']['stats']['tradersDistributionValue']> {
    let result = [];
    let offsetStep = 0;
    while(offsetStep < 10) {
      try {
        const {
          data: {
            stats: {
              tradersDistributionValue
            }
          }
        } = await got.post<BitQueryStatsTradersDistributionValueQuery>('https://explorer.bitquery.io/proxy_graphql', {
          json: {
            query: `
            query ($network: EthereumNetwork!, $token: String!, $since: ISO8601DateTime, $till: ISO8601DateTime, $limit: Int = 25000, $offset: Int = 0) {
              stats: ethereum(network: $network) {
                tradersDistributionValue: dexTrades(
                  options: {limit: $limit, offset: $offset}
                  baseCurrency: {is: $token}
                  date: {since: $since, till: $till}
                  tradeAmountUsd: {gt: 0}
                ) {
                  maker {
                    address
                  }
                  taker {
                    address
                  }
                  tradeAmount(in: USD)
                }
              }
            }
            `,
            variables: {
              ...variables,
              offset: 25000 * offsetStep
            }
          },
          headers: {
            'user-agent': CMC_USER_AGENT,
            'accept-encoding': 'gzip, deflate, br',
            'Cookie': this.cookie,
            'X-CSRF-Token': this.token
          },
          responseType: 'json',
          resolveBodyOnly: true
        });
        if(!tradersDistributionValue.length) {
          break;
        }
        result = result.concat(tradersDistributionValue);
      } catch(e) {
        break;
      }
      offsetStep++;
    }
    return result;
  }

  private async getStatsPairStatistics(variables: {
    network: 'ethereum' | 'bsc',
    contracts: string[],
    since: string
    till: string
  }): Promise<BitQueryStatsPairStatisticsQuery['data']['stats']['pairStatistics']> {
    let result = [];
    let offsetStep = 0;
    while(offsetStep < DEEP_OF_STEP) {
      try {
        const {
          data: {
            stats: {
              pairStatistics
            }
          }
        } = await got.post<BitQueryStatsPairStatisticsQuery>('https://explorer.bitquery.io/proxy_graphql', {
          json: {
            query: `
            query ($network: EthereumNetwork!, $contracts: [String!], $since: ISO8601DateTime, $till: ISO8601DateTime, $limit: Int = 25000, $offset: Int = 0) {
              stats: ethereum(network: $network) {
                pairStatistics: dexTrades(
                  options: {desc: ["block.height", "tradeIndex"], limit: $limit, offset: $offset}
                  smartContractAddress: {in: $contracts}
                  date: {since: $since, till: $till}
                  tradeAmountUsd: {gt: 0}
                ) {
                  maker {
                    address
                  }
                  taker {
                    address
                  }
                  block {
                    timestamp {
                      time(format: "%Y-%m-%d %H:%M:%S")
                    }
                    height
                  }
                  tradeIndex
                  exchange {
                    fullName
                  }
                  buyAmount(in: USD)
                  buyCurrency {
                    address
                    symbol
                  }
                  sellAmount(in: USD)
                  sellCurrency {
                    address
                    symbol
                  }
                  transaction {
                    hash
                  }
                  exchange {
                    fullName
                  }
                }
              }
            }
            `,
            variables: {
              ...variables,
              offset: 25000 * offsetStep
            }
          },
          headers: {
            'user-agent': CMC_USER_AGENT,
            'accept-encoding': 'gzip, deflate, br',
            'Cookie': this.cookie,
            'X-CSRF-Token': this.token
          },
          responseType: 'json',
          resolveBodyOnly: true
        });
        if(!pairStatistics.length) {
          break;
        }
        result = result.concat(pairStatistics);
      } catch(e) {
        break;
      }
      offsetStep++;
    }
    return result;
  }

  async statsTransfers(btcAddress?: string, ethAddress?: string, update = false): Promise<any> {
    const cacheKey = `cmc:statsTransfers:${md5(`${btcAddress}_${ethAddress}`)}`;
    try {
      const cache = JSON.parse(await this.redisClient.get(cacheKey) || 'null');
      if(cacheKey in this.awaiterStatsTransfersList) {
        if(cache && !update) {
          return cache;
        }
        return [];
      }
      if(cache && !update) {
        return cache;
      }
      if(!(cacheKey in this.awaiterStatsTransfersList)) {
        this.awaiterStatsTransfersList[cacheKey] = true;
      }
      const data: Promise<{
        eth?: BitQueryStatsTransfersQuery['data']['stats']['transfers']
        bsc?: BitQueryStatsTransfersQuery['data']['stats']['transfers']
      }> = Object.fromEntries((await Promise.all(Object.entries({
        btcAddress,
        ethAddress
      }).map(async ([key, token]) => {
        switch(key) {
          case 'btcAddress': {
            return ['btc', token ? await this.getStatsTransfers({
              network: 'bsc',
              token
            }) : undefined];
          }
          case 'ethAddress': {
            return ['eth', token ? await this.getStatsTransfers({
              network: 'ethereum',
              token
            }) : undefined];
          }
        }
      }))).filter(([, data]) => data));
      const map = {};
      Object.values(data)
      .reduce((p, n) => [...p, ...n], [])
      .forEach((item: BitQueryStatsTransfersQuery['data']['stats']['transfers'][0]) => {
        if(item['total_amount'] > get(map, `${item.date.date}.totalAmount`, 0)) {
          set(map, `${item.date.date}.medianTransferAmount`, item['median_transfer_amount']);
          set(map, `${item.date.date}.averageTransferAmount`, item['average_transfer_amount']);
          set(map, `${item.date.date}.medianTransferAmountUsd`, item['median_transfer_amount_usd']);
          set(map, `${item.date.date}.averageTransferAmountUsd`, item['average_transfer_amount_usd']);
        }
        set(map, `${item.date.date}.totalAmount`,
          item['total_amount'] + get(map, `${item.date.date}.totalAmount`, 0)
        );
        set(map, `${item.date.date}.totalAmountUsd`,
          item['total_amount_usd'] + get(map, `${item.date.date}.totalAmountUsd`, 0)
        );
        set(map, `${item.date.date}.uniqReceivers`,
          item['uniq_receivers'] + get(map, `${item.date.date}.uniqReceivers`, 0)
        );
        set(map, `${item.date.date}.uniqSenders`,
          item['uniq_senders'] + get(map, `${item.date.date}.uniqSenders`, 0)
        );
        set(map, `${item.date.date}.transferCount`,
          item['transfer_count'] + get(map, `${item.date.date}.transferCount`, 0)
        );
      });
      const result = Object.entries(map).map(([date, rest]: [string, any]) => ({date, ...rest}));
      await this.redisClient.set(cacheKey, JSON.stringify(result), 'PX', 24 * 60 * 60 * 1000);
      if(cacheKey in this.awaiterStatsTransfersList) {
        delete this.awaiterStatsTransfersList[cacheKey];
      }
      return result;
    } catch(e) {
      if(cacheKey in this.awaiterStatsTransfersList) {
        delete this.awaiterStatsTransfersList[cacheKey];
      }
    }
    return [];
  }

  async statsSwaps(btcAddress?: string, ethAddress?: string, update = false): Promise<any> {
    const cacheKey = `cmc:statsSwaps:${md5(`${btcAddress}_${ethAddress}`)}`;
    try {
      const cache = JSON.parse(await this.redisClient.get(cacheKey) || 'null');
      if(cacheKey in this.awaiterStatsSwapsList) {
        if(cache && !update) {
          return cache;
        }
        return [];
      }
      if(cache && !update) {
        return cache;
      }
      if(!(cacheKey in this.awaiterStatsSwapsList)) {
        this.awaiterStatsSwapsList[cacheKey] = true;
      }
      const data: Promise<{
        eth?: BitQueryStatsSwapsQuery['data']['stats']['swaps']
        bsc?: BitQueryStatsSwapsQuery['data']['stats']['swaps']
      }> = Object.fromEntries((await Promise.all(Object.entries({
        btcAddress,
        ethAddress
      }).map(async ([key, token]) => {
        switch(key) {
          case 'btcAddress': {
            return ['btc', token ? await this.getStatsSwaps({
              network: 'bsc',
              token
            }) : undefined];
          }
          case 'ethAddress': {
            return ['eth', token ? await this.getStatsSwaps({
              network: 'ethereum',
              token
            }) : undefined];
          }
        }
      }))).filter(([, data]) => data));
      const map = {};
      Object.values(data)
      .reduce((p, n) => [...p, ...n], [])
      .forEach((item: BitQueryStatsSwapsQuery['data']['stats']['swaps'][0]) => {
        set(map, `${item.date.date}.tradeAmountUsd`,
          item['tradeAmountUsd'] + get(map, `${item.date.date}.tradeAmountUsd`, 0)
        );
        set(map, `${item.date.date}.countTxs`,
          item['countTxs'] + get(map, `${item.date.date}.countTxs`, 0)
        );
      });
      const result = Object.entries(map).map(([date, rest]: [string, any]) => ({date, ...rest}));
      await this.redisClient.set(cacheKey, JSON.stringify(result), 'PX', 24 * 60 * 60 * 1000);
      if(cacheKey in this.awaiterStatsSwapsList) {
        delete this.awaiterStatsSwapsList[cacheKey];
      }
      return result;
    } catch(e) {
      if(cacheKey in this.awaiterStatsSwapsList) {
        delete this.awaiterStatsSwapsList[cacheKey];
      }
    }
    return [];
  }

  async statsHolders(btcAddress?: string, ethAddress?: string, update = false): Promise<any> {
    const cacheKey = `cmc:statsHolders:${md5(`${btcAddress}_${ethAddress}`)}`;
    try {
      const cache = JSON.parse(await this.redisClient.get(cacheKey) || 'null');
      if(cacheKey in this.awaiterStatsHoldersList) {
        // console.log('statsHolders.cacheKey in await');
        if(cache && !update) {
          return cache;
        }
        return [];
      }
      if(cache && !update) {
        return cache;
      }
      if(!(cacheKey in this.awaiterStatsHoldersList)) {
        this.awaiterStatsHoldersList[cacheKey] = true;
      }
      const data: Promise<{
        eth?: {
          date: string,
          count: number
        }[]
        bsc?: {
          date: string,
          count: number
        }[]
      }> = Object.fromEntries((await Promise.all(Object.entries({
        btcAddress,
        ethAddress
      }).map(async ([key, token]) => {
        switch(key) {
          case 'btcAddress': {
            return ['btc', token ? await promiseMap(sinceArray(), async (till) => {
              return {
                date: till,
                count: get(await this.getStatsHolders({
                  network: 'bsc',
                  token,
                  till
                }), 'count')
              };
            }) : undefined];
          }
          case 'ethAddress': {
            return ['eth', token ? await promiseMap(sinceArray(), async (till) => {
              return {
                date: till,
                count: get(await this.getStatsHolders({
                  network: 'ethereum',
                  token,
                  till
                }), 'count')
              };
            }) : undefined];
          }
        }
      }))).filter(([, data]) => data?.length));
      const map = {};
      Object.values(data)
      .reduce((p, n) => [...p || [], ...(n || [])], [])
      .forEach((item: {
        date: string,
        count: number
      }) => {
        set(map, `${item.date}.count`,
          item['count'] + get(map, `${item.date}.count`, 0)
        );
      });
      const result = Object.entries(map).map(([date, rest]: [string, any]) => ({date, ...rest}));
      await this.redisClient.set(cacheKey, JSON.stringify(result), 'PX', 24 * 60 * 60 * 1000);
      if(cacheKey in this.awaiterStatsHoldersList) {
        delete this.awaiterStatsHoldersList[cacheKey];
      }
      return result;
    } catch(e) {
      // console.log('statsHolders.error', e);
      if(cacheKey in this.awaiterStatsHoldersList) {
        delete this.awaiterStatsHoldersList[cacheKey];
      }
      return [];
    }
  }

  async statsTradersDistributionValue(btcAddress?: string, ethAddress?: string, update = false): Promise<any> {
    const since = sinceYesterday();
    const till = tillToday();
    const cacheKey = `cmc:tradersDistributionValue:${md5(`${btcAddress}_${ethAddress}`)}:${since}:${till}`;
    try {
      const cache = JSON.parse(await this.redisClient.get(cacheKey) || 'null');
      if(cacheKey in this.awaiterTradersDistributionValueList) {
        // console.log('statsHolders.cacheKey in await');
        if(cache && !update) {
          return cache;
        }
        return [];
      }
      if(cache && !update) {
        return cache;
      }
      if(!(cacheKey in this.awaiterTradersDistributionValueList)) {
        this.awaiterTradersDistributionValueList[cacheKey] = true;
      }
      const trades = (await Promise.all(Object.entries({
        btcAddress,
        ethAddress
      }).map(async ([key, token]) => {
        switch(key) {
          case 'btcAddress': {
            return ['btc', token ? await this.getStatsTradersDistributionValue({
              network: 'bsc',
              token,
              since,
              till
            }) : undefined];
          }
          case 'ethAddress': {
            return ['eth', token ? await this.getStatsTradersDistributionValue({
              network: 'ethereum',
              token,
              since,
              till
            }) : undefined];
          }
        }
      }))).reduce<BitQueryStatsTradersDistributionValueQuery['data']['stats']['tradersDistributionValue']>((prev, [, data]) => {
        return Array.isArray(data) && data.length ? [...prev, ...data] : prev;
      }, []);
      const amounts = trades.map((t) => t.tradeAmount);
      const minAmount: number = Math.min(...amounts);
      const maxAmount: number = Math.max(...amounts);
      const steps = getRange(minAmount, maxAmount, 25).map(tradeAmount => ({
        tradeAmount,
        userCount: 0,
        swapsCount: 0
      }));
      trades.reduce((userStepsCount: string[], trade) => {
        const stepIndex = steps.findIndex(({tradeAmount}, index) => {
          const lastStep = index + 1 === steps.length;
          return tradeAmount <= trade.tradeAmount
            && (lastStep || trade.tradeAmount < get(steps, `${index + 1}.tradeAmount`, 0));
        });
        if(stepIndex == -1) {
          return userStepsCount;
        }
        [...new Set([trade.maker.address, trade.taker.address])].forEach(user => {
          const cacheUserStep = `${user}_${stepIndex}`;
          if(userStepsCount.includes(cacheUserStep)) {
            return;
          }
          steps[stepIndex]['userCount']++;
          userStepsCount.push(cacheUserStep);
        });
        steps[stepIndex]['swapsCount']++;
        return userStepsCount;
      }, []);
      const result = steps.filter(({swapsCount, userCount}) => swapsCount || userCount);
      await this.redisClient.set(cacheKey, JSON.stringify(result), 'PX', 24 * 60 * 60 * 1000);
      if(cacheKey in this.awaiterTradersDistributionValueList) {
        delete this.awaiterTradersDistributionValueList[cacheKey];
      }
      return result;
    } catch(e) {
      // console.log('statsHolders.error', e);
      if(cacheKey in this.awaiterTradersDistributionValueList) {
        delete this.awaiterTradersDistributionValueList[cacheKey];
      }
      return [];
    }
  }

  async statsPairStatistics(btcAddress_poolContract: string[], ethAddress_poolContract: string[], update = false): Promise<any> {
    const [btcAddress, btcPoolContract] = btcAddress_poolContract.reduce<[string, string[]]>((_prev, pair) => {
      const [_, prev] = _prev;
      const [address, poolContract] = pair.split('_');
      prev.push(poolContract);
      return [address, prev];
    }, ['', []]);
    const [ethAddress, ethPoolContract] = ethAddress_poolContract.reduce<[string, string[]]>((_prev, pair) => {
      const [_, prev] = _prev;
      const [address, poolContract] = pair.split('_');
      prev.push(poolContract);
      return [address, prev];
    }, ['', []]);
    const tokenAddresses = `${btcAddress.toLowerCase()}:${ethAddress.toLowerCase()}`;
    const since = sinceLastWeek();
    const till = tillToday();
    const cacheKey = `cmc:pairStatistics:${md5(`${btcPoolContract.join('_')}_${ethPoolContract.join('_')}`)}:${since}:${till}`;
    try {
      const cache = JSON.parse(await this.redisClient.get(cacheKey) || 'null');
      if(cacheKey in this.awaiterPairStatisticsList) {
        // console.log('statsPairStatistics.cacheKey in await');
        if(cache && !update) {
          return cache;
        }
        return [];
      }
      if(cache && !update) {
        return cache;
      }
      if(!(cacheKey in this.awaiterPairStatisticsList)) {
        this.awaiterPairStatisticsList[cacheKey] = true;
      }
      const trades = (await Promise.all(Object.entries({
        btcContract: btcPoolContract,
        ethContract: ethPoolContract
      }).map(async ([key, contracts]) => {
        switch(key) {
          case 'btcContract': {
            return ['btc', contracts.length ? await this.getStatsPairStatistics({
              network: 'bsc',
              contracts,
              since,
              till
            }) : undefined];
          }
          case 'ethContract': {
            return ['eth', contracts.length ? await this.getStatsPairStatistics({
              network: 'ethereum',
              contracts,
              since,
              till
            }) : undefined];
          }
        }
      }))).reduce<BitQueryStatsPairStatisticsQuery['data']['stats']['pairStatistics']>((prev, [, data]) => {
        return Array.isArray(data) && data.length ? [...prev, ...data] : prev;
      }, []);
      const result = (({
                         buyers,
                         sellers,
                         buyersVolume,
                         sellersVolume,
                         ...rest
                       }) => {
        const buyersUnique = [...new Set(buyers)];
        const sellersUnique = [...new Set(sellers)];
        return {
          ...rest,
          buyersVolume,
          sellersVolume,
          totalVolume: buyersVolume + sellersVolume,
          buyersCount: buyersUnique.length,
          sellersCount: sellersUnique.length,
          buyersAndSellersCount: [...new Set([...buyersUnique, ...sellersUnique])].length
        };
      })(trades.reduce((prev, trade) => {
        if(tokenAddresses.includes(trade.buyCurrency.address)) {
          prev.tradesBuyCount++;
          prev.buyers.push(trade.taker.address);
          prev.buyersVolume += trade.buyAmount;
        } else {
          prev.tradesSellCount++;
          prev.sellers.push(trade.taker.address);
          prev.sellersVolume += trade.sellAmount;
        }
        return prev;
      }, {
        buyers: [],
        buyersVolume: 0,
        sellers: [],
        sellersVolume: 0,
        tradesBuyCount: 0,
        tradesSellCount: 0
      }));
      await this.redisClient.set(cacheKey, JSON.stringify(result), 'PX', 24 * 60 * 60 * 1000);
      if(cacheKey in this.awaiterPairStatisticsList) {
        delete this.awaiterPairStatisticsList[cacheKey];
      }
      return result;
    } catch(e) {
      // console.log('statsPairStatistics.error', e);
      if(cacheKey in this.awaiterPairStatisticsList) {
        delete this.awaiterPairStatisticsList[cacheKey];
      }
      return null;
    }
  }

  async getBalancesOfPair(variables: {
    network: string,
    date: string,
    poolAddress: string,
    baseToken: string,
    quoteToken: string,
  }) {
    try {
      const response = await got.post<BitQueryBalanceOfPairQuery>('https://explorer.bitquery.io/proxy_graphql', {
        json: {
          query: `
          query liquidity($date: ISO8601DateTime!, $network: EthereumNetwork!, $poolAddress: String!, $baseToken: String!, $quoteToken: String!) {
          pair: ethereum(network: $network) {
            liquidity: address(address: {is: $poolAddress}) {
              address
              balances(date: {till: $date}, currency: {in: [$baseToken, $quoteToken]}) {
                value
                currency {
                  address
                  symbol
                }
              }
            }
          }
        }
        `,
          variables
        },
        headers: {
          'user-agent': CMC_USER_AGENT,
          'accept-encoding': 'gzip, deflate, br',
          'Cookie': this.cookie,
          'X-CSRF-Token': this.token
        },
        responseType: 'json',
        resolveBodyOnly: true
      });
      return Object.fromEntries((get(response, 'data.pair.liquidity.0.balances', []) || []).map((_) => [
        get(_, 'currency.address', '').toLowerCase(),
        get(_, 'value')
      ]));
    } catch(e) {
      console.error(e);
    }
    return null;
  }
}
