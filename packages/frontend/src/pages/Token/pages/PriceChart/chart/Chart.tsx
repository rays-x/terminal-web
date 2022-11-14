import React from 'react';
import {ChartStyled} from './Chart-styled';
import {LoaderPositions} from '../../../../../components/_old/ui/Loader/Loader-styled';
import {Loader} from '../../../../../components/_old/ui/Loader/Loader';
import Helmet from '../../../../../components/Helmet';
import {JsonValue} from 'react-use-websocket/src/lib/types';
import {useCmcTokenSocket} from '../../../../../store/cmcTokenSocket';
import TradingView, {ResolutionString} from '../../../../../../public/charting_library/charting_library';
import {ChartComponentProps} from '../types';

export const ChartComponent: React.FC<ChartComponentProps> = React.memo(({
                                                                           pair,
                                                                           height = 500
                                                                         }) => {
  const {sendMessage, lastMessage} = useCmcTokenSocket();
  const self = React.useMemo(() => new Map, [pair]);
  const DataFeeds = React.useCallback(() => {
    const params = {
      1: '1m',
      5: '5m',
      15: '15m',
      30: '15m',
      60: '1h',
      240: '1h',
      480: '1h',
      720: '1h',
      '1D': '1d',
      '1W': '1d',
      '1M': '1d'
    };
    return {
      sendRequest(datafeedUrl, urlPath, params) {
        if (params !== undefined) {
          const paramKeys = Object.keys(params);
          if (paramKeys.length !== 0) {
            urlPath += '?';
          }
          urlPath += paramKeys.map((key) => {
            return `${encodeURIComponent(key)}=${encodeURIComponent(params[key].toString())}`;
          }).join('&');
        }
        return fetch(`${datafeedUrl}/${urlPath}`)
          .then((response) => response.text())
          .then((responseTest) => JSON.parse(responseTest));
      },
      onReady: callback => {
        setTimeout(() => callback({
          supported_resolutions: ['1', '5', '15', '30', '60', '240', '480', '720', '1D', '1W', '1M'],
          supports_time: false
        }));
      },
      resolveSymbol: (symbolName, onResolve) => {
        setTimeout(() => onResolve({
          ticker: pair.poolId,
          name: `${pair.baseToken.symbol} / ${pair.quoteToken.symbol}`,
          description: `${pair.baseToken.symbol} / ${pair.quoteToken.symbol} - ${pair.dexerInfo.name}`,
          session: '24x7',
          data_status: 'streaming',
          minmov: 1,
          pricescale: 1e3,
          has_intraday: true,
          minmove2: 0,
          volume_precision: 2,
          fractional: false,
          has_empty_bars: true,
          type: 'crypto',
          timezone: 'Etc/UTC'
        }));
      },
      getBars(symbolInfo, resolution, periodParams, onResult, onError) {
        const requestParams = {
          'reverse-order': pair.reverseOrder,
          usd: true
        };
        if ((new Date().getTime() - (periodParams.to * 1000)) > 0) {
          requestParams['to'] = (periodParams.to * 1000);
        }
        requestParams['from'] = periodParams.from * 1000;
        switch (resolution) {
          case '1': {
            requestParams['type'] = '1m';
            break;
          }
          case '5': {
            requestParams['type'] = '5m';
            break;
          }
          case '30':
          case '15': {
            requestParams['type'] = '15m';
            break;
          }
          default: {
            if (isNaN(Number(resolution))) {
              requestParams['type'] = '1d';
            } else {
              requestParams['type'] = '1h';
            }
            break;
          }
        }
        new Promise((resolve, reject) => {
          this.sendRequest(`${import.meta.env.VITE_BACKEND_PROXY_URL}/kline/v3/k-line/candles/1`, symbolInfo.ticker, requestParams)
            .then((_response) => {
              const response = {
                s: _response.data.length ? 'ok' : 'no_data',
                ..._response.data.reduce((prev, {
                  time,
                  open,
                  high,
                  low,
                  close,
                  volume
                }) => {
                  prev['c'].push(close);
                  prev['h'].push(high);
                  prev['l'].push(low);
                  prev['o'].push(open);
                  prev['t'].push(time / 1000);
                  prev['v'].push(volume);
                  return prev;
                }, {
                  c: [],
                  h: [],
                  l: [],
                  o: [],
                  t: [],
                  v: []
                })
              };
              if (response.s !== 'ok' && response.s !== 'no_data') {
                reject(response.errmsg);
                return;
              }
              const bars = [];
              const meta = {
                noData: false
              };
              if (response.s === 'no_data') {
                meta.noData = true;
                meta['nextTime'] = response.nextTime;
              } else {
                const volumePresent = response.v !== undefined;
                const ohlPresent = response.o !== undefined;
                for (let i = 0; i < response.t.length; ++i) {
                  const barValue = {
                    time: response.t[i] * 1000,
                    close: parseFloat(response.c[i]),
                    open: parseFloat(response.c[i]),
                    high: parseFloat(response.c[i]),
                    low: parseFloat(response.c[i])
                  };
                  if (ohlPresent) {
                    barValue.open = parseFloat(response.o[i]);
                    barValue.high = parseFloat(response.h[i]);
                    barValue.low = parseFloat(response.l[i]);
                  }
                  if (volumePresent) {
                    barValue['volume'] = parseFloat(response.v[i]);
                  }
                  bars.push(barValue);
                }
              }
              resolve({
                bars: bars,
                meta: meta
              });
            })
            .catch((reason) => {
              const reasonString = `${reason}`;
              console.warn(`HistoryProvider: getBars() failed, error=${reasonString}`);
              reject(reasonString);
            });
        }).then((result: any) => {
          onResult(result.bars, result.meta);
        }).catch(onError);
      },
      subscribeBars: (symbolInfo, resolutionIndex, newDataCallback, listenerGuid) => {
        const name = `dexscan@kline@${pair.platform.id}@${pair.poolId}@${params[resolutionIndex]}`;
        const handler = {
          id: listenerGuid,
          callback: newDataCallback
        };
        let widget = self.get(name);
        if (widget) {
          widget.handlers.push(handler);
        } else {
          widget = {
            subscribeUID: listenerGuid,
            handlers: [handler],
            isUsd: true,
            reverseOder: pair.reverseOrder
          };
          self.set(name, widget);
          sendMessage({
            method: 'SUBSCRIPTION',
            params: [name as unknown as JsonValue]
          });
        }
      },
      unsubscribeBars: id => {
        let _n = true;
        let n = false;
        let i = void 0;
        const __$0 = self.keys()[Symbol.iterator]();
        try {
          let $__6;
          for (; !(_n = ($__6 = __$0.next()).done); _n = true) {
            const item = $__6.value;
            const me = self.get(item);
            const foundIndex = me.handlers.findIndex(elem => elem.id === id);
            if (
              foundIndex > -1
              && (me.handlers.splice(foundIndex, 1) && me.handlers.length === 0)) {
              sendMessage({
                method: 'UNSUBSCRIPTION',
                params: [item]
              });
              self.delete(item);
              break;
            }
          }
        } catch (contactCapacity) {
          n = true;
          i = contactCapacity;
        } finally {
          try {
            if (!(_n || __$0.return == null)) {
              __$0.return();
            }
          } finally {
            if (n) {
              throw i;
            }
          }
        }
      },
      searchSymbols: () => {
        //
      }
    };
  }, [pair]);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!lastMessage) {
      return;
    }
    const vars = lastMessage;
    if (!vars.d
      || !String(vars.c).includes('kline')) {
      return;
    }
    const {common, reverse, usdCommon, usdReverse} = JSON.parse(vars.d);
    const args = self.get(vars.c);
    if (!args) {
      return;
    }
    const {isUsd, reverseOder} = args;
    let item = null;
    if (isUsd && !reverseOder) {
      item = usdCommon;
    } else {
      if (isUsd && reverseOder) {
        item = usdReverse;
      } else {
        if (!isUsd && reverseOder) {
          item = reverse;
        } else {
          if (!(isUsd || reverseOder)) {
            item = common;
          }
        }
      }
    }
    args.handlers.forEach(ret => ret.callback(item));
  }, [lastMessage]);

  React.useEffect(() => {
    if (window['TradingView']) {
      return setLoading(false);
    }
    const checkTWLoadedIntervalId = setInterval(() => {
      if (!window['TradingView']) {
        return;
      }
      setLoading(false);
      clearInterval(checkTWLoadedIntervalId);
    }, 1000);
    return () => {
      clearInterval(checkTWLoadedIntervalId);
    };
  }, []);
  React.useEffect(() => {
      if (loading) {
        return;
      }
      new (window['TradingView'] as typeof TradingView).widget({
        symbol: pair.poolId,
        interval: ('5' as unknown as ResolutionString),
        container: 'tv_chart_container',
        datafeed: DataFeeds(),
        library_path: '/charting_library/charting_library/',
        // custom_css_url: 'themed.css',
        disabled_features: [
          'use_localstorage_for_settings',
          'header_symbol_search',
          'show_object_tree',
          'go_to_date',
          'timeframes_toolbar',
          'header_compare'
        ],
        /*overrides: {
          'mainSeriesProperties.candleStyle.upColor': '#26a69a',
          'mainSeriesProperties.candleStyle.downColor': '#ef5350',
          'mainSeriesProperties.candleStyle.drawWick': true,
          'mainSeriesProperties.candleStyle.drawBorder': true,
          'mainSeriesProperties.candleStyle.borderColor': '#378658',
          'mainSeriesProperties.candleStyle.borderUpColor': '#26a69a',
          'mainSeriesProperties.candleStyle.borderDownColor': '#ef5350',
          'mainSeriesProperties.candleStyle.wickUpColor': '#26a69a',
          'mainSeriesProperties.candleStyle.wickDownColor': '#ef5350',
          'mainSeriesProperties.candleStyle.barColorsOnPrevClose': false,
          'paneProperties.background': '#232a32',
          'paneProperties.backgroundGradientStartColor': '#232a32',
          'paneProperties.backgroundGradientEndColor': '#232a32',
          'paneProperties.vertGridProperties.color': '#2E3740',
          'paneProperties.horzGridProperties.color': '#2E3740',
          'scalesProperties.textColor': '#7B7F84',
          'scalesProperties.backgroundColor': '#232A32',
          'paneProperties.axisProperties.autoScale': true,
          'mainSeriesProperties.priceAxisProperties.autoScale': true,
          'mainSeriesProperties.priceAxisProperties.log': false
        },*/
        theme: 'Dark',
        fullscreen: false,
        autosize: true,
        charts_storage_url: 'https://saveload.tradingview.com',
        charts_storage_api_version: '1.1',
        load_last_chart: false,
        auto_save_delay: 5,
        locale: 'en'
      });
    },
    [loading, pair]);
  return (
    <>
      <Helmet>
        <script
          type="text/javascript"
          src="/charting_library/charting_library/charting_library.standalone.js"
        />
      </Helmet>
      <ChartStyled.Component $height={height}>
        <ChartStyled.ChartContainer/>
        {loading
          ? (
            <ChartStyled.ChartLoader>
              <Loader position={LoaderPositions.absolute}/>
            </ChartStyled.ChartLoader>
          ) : (
            <div id="tv_chart_container"
                 style={{
                   height: '100%'
                 }}
            />
          )}
      </ChartStyled.Component>
    </>
  );
});
