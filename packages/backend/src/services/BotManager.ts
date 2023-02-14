import {Payload, Subscribe} from 'nest-mqtt';
import Docker from 'dockerode';
import {InjectAwsService} from 'nest-aws-sdk';
import {S3} from 'aws-sdk';
import {readFileSync} from 'fs';
import {join} from 'path';
import {dump as json2Yaml, load as yaml2Json} from 'js-yaml';
import {merge} from 'lodash';
import {InjectModel} from 'nestjs-typegoose';
import {get} from 'lodash';
import {ReturnModelType} from '@typegoose/typegoose';
import ExchangeEntity from '../entities/Bot/Exchange';
import UserEntity, {UserEntityDefaultSelect} from '../entities/Bot/User';

const exchanges = [
  {
    'name': 'AltMarkets.io',
    'id': 'altmarkets',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your AltMarkets.io API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your AltMarkets.io secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'AscendEx',
    'id': 'ascend_ex',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your AscendEx API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your AscendEx secret key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'group_id',
        'name': 'Your AscendEx group ID',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'Beaxy',
    'id': 'beaxy',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your Beaxy API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your Beaxy secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'Binance',
    'id': 'binance',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your Binance API key',
        'type': 'str',
        'default': null,
        'value': '***'
      },
      {
        'id': 'api_secret',
        'name': 'Your Binance secret key',
        'type': 'str',
        'default': null,
        'value': '***'
      }
    ],
    'connected': true,
    'status': 'verified'
  },
  {
    'name': 'Binance US',
    'id': 'binance_us',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your Binance US API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your Binance US secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'Bitfinex',
    'id': 'bitfinex',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your Bitfinex API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your Bitfinex secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'BitMart',
    'id': 'bitmart',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your BitMart API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your BitMart secret key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'memo',
        'name': 'Your BitMart API memo',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'Bittrex Global',
    'id': 'bittrex',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your Bittrex Global API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your Bittrex Global secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'Bitmex',
    'id': 'bitmex',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your Bitmex API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your Bitmex secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'Blocktane',
    'id': 'blocktane',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your Blocktane API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your Blocktane secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'BTC Markets',
    'id': 'btc_markets',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your BTC Markets API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your BTC Markets secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'Bybit',
    'id': 'bybit',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your Bybit API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your Bybit secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'Coinbase Pro',
    'id': 'coinbase_pro',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your Coinbase Pro API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your Coinbase Pro secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'CoinFLEX',
    'id': 'coinflex',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your CoinFLEX API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your CoinFLEX secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'CoinZoom',
    'id': 'coinzoom',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your CoinZoom API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your CoinZoom secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'Crypto.com',
    'id': 'crypto_com',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your Crypto.com API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your Crypto.com secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'Digifinex',
    'id': 'digifinex',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your Digifinex API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your Digifinex secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'Eve Exchange',
    'id': 'eve_exchange',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your Eve Exchange API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your Eve Exchange secret key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'user_id',
        'name': 'Your Eve Exchange user ID',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'Gate.io',
    'id': 'gate_io',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your Gate.io API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your Gate.io secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'HitBTC',
    'id': 'hitbtc',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your HitBTC API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your HitBTC secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'Huobi Global',
    'id': 'huobi',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your Huobi Global API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your Huobi Global secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'Kraken',
    'id': 'kraken',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your Kraken API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your Kraken secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'KuCoin',
    'id': 'kucoin',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your KuCoin API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your KuCoin secret key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'passphrase',
        'name': 'Your KuCoin passphrase',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'Latoken',
    'id': 'latoken',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your Latoken API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your Latoken secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'LBank',
    'id': 'lbank',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your LBank API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your LBank secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'Liquid',
    'id': 'liquid',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your Liquid API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your Liquid secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'Loopring',
    'id': 'loopring',
    'fields': [
      {
        'id': 'account_id',
        'name': 'Your Loopring account ID',
        'type': 'str',
        'default': null
      },
      {
        'id': 'exchange_address',
        'name': 'Your Loopring exchange address',
        'type': 'str',
        'default': null
      },
      {
        'id': 'private_key',
        'name': 'Your Loopring private key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_key',
        'name': 'Your Loopring API key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'MEXC Global',
    'id': 'mexc',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your MEXC Global API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your MEXC Global secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'NDAX',
    'id': 'ndax',
    'fields': [
      {
        'id': 'user_id',
        'name': 'Your NDAX user ID (uid)',
        'type': 'str',
        'default': null
      },
      {
        'id': 'account_name',
        'name': 'Name of the account you want to use',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_key',
        'name': 'Your NDAX API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your NDAX secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'OKEx',
    'id': 'okx',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your OKEx API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your OKEx secret key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'passphrase',
        'name': 'Your OKEx passphrase',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'Probit Global',
    'id': 'probit',
    'fields': [
      {
        'id': 'client_id',
        'name': 'Your Probit client ID',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your Probit secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'Probit Korea',
    'id': 'probit_kr',
    'fields': [
      {
        'id': 'client_id',
        'name': 'Your Probit Korea API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your Probit Korea secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'WazirX',
    'id': 'wazirx',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your WazirX API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your WazirX secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  },
  {
    'name': 'WhiteBIT',
    'id': 'whitebit',
    'fields': [
      {
        'id': 'api_key',
        'name': 'Your WhiteBIT API key',
        'type': 'str',
        'default': null
      },
      {
        'id': 'api_secret',
        'name': 'Your WhiteBIT secret key',
        'type': 'str',
        'default': null
      }
    ],
    'connected': false
  }
];

export class BotManagerService {
  docker = new Docker({socketPath: '/var/run/docker.sock'});

  constructor(
    @InjectAwsService(S3) private readonly s3: S3,
    @InjectModel(ExchangeEntity) private readonly repoExchange: ReturnModelType<typeof ExchangeEntity>,
    @InjectModel(UserEntity) private readonly repoUser: ReturnModelType<typeof UserEntity>
  ) {
  }

  async userExchangeUpsert(_address: string, {id, fields}) {
    const address = _address.toLowerCase();
    const {exchanges} = await this.repoUser.findOneAndUpdate({
      address
    }, {}, {
      upsert: true,
      new: true
    }).select(UserEntityDefaultSelect);
    const edited = exchanges.reduce((prev, exchange: any) => {
      if(exchange.exchange.toString() !== id) {
        return [...prev, exchange];
      }
      return [
        ...prev,
        {
          exchange: id,
          fields
        }
      ];
    }, []);
    if(!edited.find(({exchange}) => (exchange?.toString() || exchange) === id)) {
      edited.push({
        exchange: id,
        fields
      });
    }
    const {exchanges: _exchanges} = await this.repoUser.findOneAndUpdate({
      address
    }, {
      exchanges: edited
    }, {new: true}).select(UserEntityDefaultSelect);
    return _exchanges.find(({exchange}) => exchange.toString() === id);
  }

  async userExchangesList(_address: string) {
    const address = _address.toLowerCase();
    const user = await this.repoUser.findOne({
      address
    }).select(UserEntityDefaultSelect);
    return get(user,'exchanges',[]);
  }

  async exchangesList() {
    return this.repoExchange.find();
  }

  async botCreate() {
    const id = 'test';
    const strategy = 'pmm';
    const BucketConf = `hb.bot-${id}.conf`;
    const BucketLogs = `hb.bot-${id}.logs`;
    const templatesPath = join(`${__dirname}/../view/templates/bot`);
    const confClient = json2Yaml(merge(yaml2Json(readFileSync(`${templatesPath}/conf_client.yml`, 'utf-8')), {
      instance_id: id,
      mqtt_bridge: {
        mqtt_host: process.env.MQTT_HOST
      },
      db_mode: {
        db_host: process.env.POSTGRES_HOST
      }
    }));
    const confStrategy = json2Yaml(merge(yaml2Json(readFileSync(`${templatesPath}/strategies/conf_${strategy}.yml`, 'utf-8')), {
      exchange: 'binance',
      market: 'FIRO-BUSD'
    }));
    await Promise.all([
      this.s3.createBucket({Bucket: BucketConf}).promise(),
      this.s3.createBucket({Bucket: BucketLogs}).promise()
    ]);
    await Promise.all([
      this.s3.putObject({
        Bucket: BucketConf,
        Key: 'data/.password_verification',
        Body: 'HummingBot'
      }).promise(),
      this.s3.putObject({
        Bucket: BucketConf,
        Key: 'data/conf_fee_overrides.yml',
        Body: readFileSync(`${templatesPath}/conf_fee_overrides.yml`, 'utf-8')
      }).promise(),
      this.s3.putObject({
        Bucket: BucketConf,
        Key: 'data/hummingbot_logs.yml',
        Body: readFileSync(`${templatesPath}/hummingbot_logs.yml`, 'utf-8')
      }).promise(),
      this.s3.putObject({
        Bucket: BucketConf,
        Key: 'data/conf_client.yml',
        Body: confClient
      }).promise(),
      Promise.all([{
        name: 'binance',
        api_key: 'S9IaOlJxuoyYt7CcN1X5xF64kULCUl4DkSsz2xnjusBSwmBYQSEu5klHycpK0PYS',
        api_secret: 'Q0mnfeTduaT7dlMTQETavS7Xpf3eO2tagDd6VI5Aha5zzRzMmajAq3zzAqMGIckI'
      }].map(async ({
                      name,
                      api_key,
                      api_secret
                    }) => {
        return this.s3.putObject({
          Bucket: BucketConf,
          Key: `data/connectors/${name}.yml`,
          Body: json2Yaml(merge(yaml2Json(readFileSync(`${templatesPath}/connectors/${name}.yml`, 'utf-8')), {
            [`${name}_api_key`]: api_key,
            [`${name}_api_secret`]: api_secret
          }))
        }).promise();
      })),
      this.s3.putObject({
        Bucket: BucketConf,
        Key: `data/strategies/conf_${strategy}.yml`,
        Body: confStrategy
      }).promise()
    ]);
    await (await this.docker.createContainer({
      name: `hb_bot_${id}`,
      Image: 'bardakdev/hb_pg',
      Env: [
        `CONFIG_FILE_NAME=conf_${strategy}.yml`,
        'CONFIG_PASSWORD=HummingBot'
      ],
      HostConfig: {
        Mounts: [
          {
            Type: 'volume',
            VolumeOptions: {
              NoCopy: true,
              Labels: {},
              DriverConfig: {
                Name: 's3fs',
                Options: {}
              }
            },
            Source: BucketConf,
            Target: '/conf',
            ReadOnly: false
          },
          {
            Type: 'volume',
            VolumeOptions: {
              NoCopy: true,
              Labels: {},
              DriverConfig: {
                Name: 's3fs',
                Options: {}
              }
            },
            Source: BucketLogs,
            Target: '/logs',
            ReadOnly: false
          }
        ]
      },
      Tty: true,
      OpenStdin: true
    })).start();
    return true;
  }

  async botList() {

  }

  @Subscribe(`${process.env.MQTT_BOTS_NAMESPACE}/+/log`)
  mqttSubscriptionEvent_log(@Payload() payload) {
    console.log('log', payload);
  }

  @Subscribe(`${process.env.MQTT_BOTS_NAMESPACE}/+/events`)
  mqttSubscriptionEvent_events(@Payload() payload) {
    console.log('events', payload);
  }

  @Subscribe(`${process.env.MQTT_BOTS_NAMESPACE}/+/notify`)
  mqttSubscriptionEvent_notify(@Payload() payload) {
    console.log('notify', payload);
  }
}
