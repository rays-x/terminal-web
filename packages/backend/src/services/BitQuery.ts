import {get, set} from 'lodash';
import Redis from 'ioredis';
import {InjectRedisClient} from 'nestjs-ioredis-tags';
import got from 'got';
import md5 from 'md5';
import {BitQueryStatsTransfersQuery} from '../types/BitQuery';

export class BitQueryService {

  awaiterStatsTransfersList: {
    [k: string]: boolean
  } = {};

  constructor(
    @InjectRedisClient('ray.sx') private readonly redisClient: Redis
  ) {
  }

  private async getStatsTransfers(variables: {
    network: 'ethereum' | 'bsc',
    token: string
  }) {
    const {
      body: {
        data: {
          stats: {
            transfers
          }
        }
      }
    } = await got.post<BitQueryStatsTransfersQuery>('https://graphql.bitquery.io/', {
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
          since: '2022-07-25'
        }
      },
      headers: {
        'x-api-key': 'BQYQid8NgyWUDBn5nMFd0DIfp5DT8IRc'
      },
      responseType: 'json'
    });
    return transfers;
  }

  async statsTransfers(btcAddress?: string, ethAddress?: string): Promise<any> {
    const cacheKey = `cmc:statsTransfers:${md5(`${btcAddress}_${ethAddress}`)}`;
    try {
      if (cacheKey in this.awaiterStatsTransfersList) {
        return [];
      }
      const cache = JSON.parse(await this.redisClient.get(cacheKey) || 'null');
      if (cache) {
        return cache;
      }
      if (!(cacheKey in this.awaiterStatsTransfersList)) {
        this.awaiterStatsTransfersList[cacheKey] = true;
      }
      const data: Promise<{
        eth?: BitQueryStatsTransfersQuery['data']['stats']['transfers']
        bsc?: BitQueryStatsTransfersQuery['data']['stats']['transfers']
      }> = cache || Object.fromEntries((await Promise.all(Object.entries({
        btcAddress,
        ethAddress
      }).map(async ([key, token]) => {
        switch (key) {
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
          if (item['total_amount'] > get(map, `${item.date.date}.totalAmount`, 0)) {
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
      if (cacheKey in this.awaiterStatsTransfersList) {
        delete this.awaiterStatsTransfersList[cacheKey];
      }
      return result;
    } catch (e) {
      if (cacheKey in this.awaiterStatsTransfersList) {
        delete this.awaiterStatsTransfersList[cacheKey];
      }
    }
    return [];
  }
}
