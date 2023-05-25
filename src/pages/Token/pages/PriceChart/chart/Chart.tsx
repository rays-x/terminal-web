import React, { useContext } from 'react';
import { JsonValue } from 'react-use-websocket/src/lib/types';
import { ChartStyled } from './Chart-styled';
import { LoaderPositions } from '../../../../../components/_old/ui/Loader/Loader-styled';
import { Loader } from '../../../../../components/_old/ui/Loader/Loader';
import Helmet from '../../../../../components/Helmet';
import { useCmcTokenSocket } from '../../../../../store/cmcTokenSocket';
import TradingView, {
  ResolutionString,
} from '../../../../../../public/charting_library/charting_library';
import { ChartComponentProps } from '../types';

export const ChartComponent: React.FC<ChartComponentProps> = React.memo(
  ({ pair, height = 500 }) => {
    const [loading, setLoading] = React.useState(true);
    const [defaultInterval, setDefaultInterval] = React.useState<any>('60');
    const intervals = {
      '1': { timeframe: 'minute', aggregate: '1' },
      '5': { timeframe: 'minute', aggregate: '5' },
      '15': { timeframe: 'minute', aggregate: '15' },
      '30': { timeframe: 'minute', aggregate: '15' },
      '60': { timeframe: 'hour', aggregate: '1' },
      '240': { timeframe: 'hour', aggregate: '1' },
      '480': { timeframe: 'hour', aggregate: '4' },
      '720': { timeframe: 'hour', aggregate: '4' },
      '1D': { timeframe: 'day', aggregate: '1' },
      '1W': { timeframe: 'day', aggregate: '1' },
      '1M': { timeframe: 'day', aggregate: '1' },
    };
  
    const DataFeeds = React.useCallback(
      () => ({
        onReady: (callback) => {
          setTimeout(() =>
            callback({
              supported_resolutions: [
                '1D',
              ],
              supports_time: false,
            })
          );
        },
        resolveSymbol: (symbolName, onResolve) => {
          setTimeout(() =>
            onResolve({
              ticker: pair.cmc,
              name: pair.name,
              description: `${pair.name} - ${pair.dex.name}`,
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
              timezone: 'Etc/UTC',
            })
          );
        },
        getBars(symbolInfo, resolution, periodParams, onResult, onError) {
          const fetchPair = async () => {
            try {
              const [network, addr] = pair.coingeckoPoolId.split('_');

              const { aggregate, timeframe } = intervals[resolution]

              const res = await fetch(
                `https://api.geckoterminal.com/api/v2/networks/${network}/pools/${addr}/ohlcv/${timeframe}?limit=500&before_timestamp=${periodParams.to * 1000 < Date.now() ? periodParams.to * 1000: periodParams.to}&aggregate=${aggregate}`,
              ).catch(() => undefined);
              const body = await res?.json() || { body: { data: { attributes: {ohlcv_list : []}}}};

              const response = {
                s: body.data.attributes.ohlcv_list.length ? 'ok' : 'no_data',
                ...body.data.attributes.ohlcv_list.sort(([lTime], [rTime]) => lTime - rTime ).reduce(
                  (prev, [time, open, high, low, close, volume]) => {
                    prev.c.push(close);
                    prev.h.push(high);
                    prev.l.push(low);
                    prev.o.push(open);
                    prev.t.push(time * 1000);
                    prev.v.push(volume);
                    return prev;
                  },
                  {
                    c: [],
                    h: [],
                    l: [],
                    o: [],
                    t: [],
                    v: [],
                  }
                ),
              };

              if (response.s === 'no_data') {
                const intervalKeys = Object.keys(intervals);
                const findCurrentIntervalIndex =
                  intervalKeys.indexOf(defaultInterval);
                if (findCurrentIntervalIndex + 1 === intervalKeys.length) {
                  return {};
                }
                setDefaultInterval(intervalKeys[findCurrentIntervalIndex + 1]);
              }

              const bars = [];
              const meta = {
                noData: false,
              };
              if (response.s === 'no_data') {
                meta.noData = true;
                // meta.nextTime = response.nextTime;
              } else {
                const volumePresent = response.v !== undefined;
                const ohlPresent = response.o !== undefined;
                for (let i = 0; i < response.t.length; ++i) {
                  const barValue = {
                    time: response.t[i],
                    close: parseFloat(response.c[i]),
                    open: parseFloat(response.c[i]),
                    high: parseFloat(response.c[i]),
                    low: parseFloat(response.c[i]),
                  };
                  if (ohlPresent) {
                    barValue.open = parseFloat(response.o[i]);
                    barValue.high = parseFloat(response.h[i]);
                    barValue.low = parseFloat(response.l[i]);
                  }
                  if (volumePresent) {
                    barValue.volume = parseFloat(response.v[i]);
                  }
                  bars.push(barValue);
                }
              }

              return {
                bars,
                meta,
              };
            } catch (err) {
              const reasonString = `${err}`;
              console.warn(
                `HistoryProvider: getBars() failed, error=${reasonString}`
              );
              throw new Error(reasonString);
            }
          };

          fetchPair.bind(this)()
            .then((result: any) => {
              onResult(result.bars, result.meta);
            })
            .catch(onError);
        },
        subscribeBars: () => {
          //
        },
        unsubscribeBars: () => {
          //
        },
        searchSymbols: () => {
          //
        },
      }),
      [pair, defaultInterval]
    );

    React.useEffect(() => {
      if (window.TradingView) {
        return setLoading(false);
      }
      const checkTWLoadedIntervalId = setInterval(() => {
        if (!window.TradingView) {
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
      new (window.TradingView as typeof TradingView).widget({
        symbol: pair.coingeckoPoolId,
        interval: defaultInterval as unknown as ResolutionString,
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
          'header_compare',
        ],
        /* overrides: {
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
        }, */
        theme: 'Dark',
        fullscreen: false,
        autosize: true,
        charts_storage_url: 'https://saveload.tradingview.com',
        charts_storage_api_version: '1.1',
        load_last_chart: true,
        auto_save_delay: 5,
        locale: 'en',
      });
    }, [loading, pair, defaultInterval]);

    return (
      <>
        <Helmet>
          <script
            type="text/javascript"
            src="/charting_library/charting_library/charting_library.standalone.js"
          />
        </Helmet>
        <ChartStyled.Component $height={height}>
          <ChartStyled.ChartContainer />
          {loading ? (
            <ChartStyled.ChartLoader>
              <Loader position={LoaderPositions.absolute} />
            </ChartStyled.ChartLoader>
          ) : (
            <div
              id="tv_chart_container"
              style={{
                height: '100%',
              }}
            />
          )}
        </ChartStyled.Component>
      </>
    );
  }
);
