import { throttle } from 'lodash-es'
import pAll from 'p-all'
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { Axes } from '../Axes/Axes'
import { CustomTooltip } from '../CustomTooltip/CustomTooltip'
import { Gradients } from '../Gradients/Gradients'
import { SubChartHeader } from '../../../../components/SubChart/SubChartHeader/SubChartHeader'
import {
  formatNumeral,
  NUMERAL_FORMAT_NUM,
} from '../../../../../../utils/numbers'
import { TradesVolumeChartStyled } from './TradesVolumeChart-styled'
import { CurrentCoinData } from '../../../../CoinPage'
import { toFixedToken } from '../../../../../../utils/diff'
import { useFetch } from '../../../../../../hooks'
import { TokenTradersResponse } from '../../../../../../types/api/TokenTradersResponse'
import { gqlQuery } from './constants'
import { BQ_API_KEY } from '../../../../../../constants'

const borders = [1]

for (let i = 3; i < 5; i++) {
  for (let j = 1; j < 10; j++) {
    borders.push(10 ** i * j)
  }
}

export const TradesVolumeChart: React.FC = React.memo(
  () => {
    const currentCoinData =
      React.useContext(CurrentCoinData)

    const [data, setData] = useState([])

    const fromDate = useMemo(() => Date.now() - 14 * 24 * 60 * 60 * 1000, []);
    const toDate = useMemo(() => Date.now(), [])
  
    useEffect(() => {
      pAll(
        borders.map((border, ind, arr) => async () => {
          if (ind >= arr.length - 1) {
            return
          }

          const res = await fetch(
            'https://graphql.bitquery.io/',
            {
              headers: {
                accept: 'application/json',
                'accept-language':
                  'en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7',
                'content-type': 'application/json',
                'sec-ch-ua':
                  '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                'x-api-key': BQ_API_KEY,
              },
              referrer: 'https://ide.bitquery.io/',
              referrerPolicy:
                'strict-origin-when-cross-origin',
              body: `{"query":"query ($network: EthereumNetwork!, $token: String!, $gte: Float, $lte: Float, $since: ISO8601DateTime, $till: ISO8601DateTime, $limit: Int = 25000, $offset: Int = 0) {\\n  ethereum(network: $network) {\\n    dexTrades(\\n      options: {limit: $limit, offset: $offset}\\n      baseCurrency: {is: $token}\\n      date: {since: $since, till: $till}\\n      tradeAmountUsd: {gteq: $gte, lteq: $lte}\\n    ) {\\n      count\\n    }\\n  }\\n}\\n","variables":"{\\n  \\"network\\": \\"${currentCoinData?.platforms[0].blockchain.bqSlug}\\",\\n\\t\\"token\\": \\"${currentCoinData?.platforms[0].address}\\",\\n  \\"since\\": \\"${new Date(fromDate).toISOString()}\\",\\n  \\"till\\": \\"${new Date(toDate).toISOString()}\\",\\n  \\"gte\\": ${border},\\n  \\"lte\\": ${
                arr[ind + 1]
              }\\n}"}`,
              method: 'POST',
              mode: 'cors',
              credentials: 'omit',
            },
          )

          const parsed = await res.json() as TokenTradersResponse

          if (!parsed?.data?.ethereum?.dexTrades) {
            return;
          }

          setData((prev) => [
            ...prev,
            {
              swapsCount: parsed.data.ethereum.dexTrades[0].count,
              tradeAmount: formatNumeral(
                toFixedToken(arr[ind + 1], 8),
                NUMERAL_FORMAT_NUM,
              ),
            },
          ])
        }),
        { concurrency: 2 },
      )
    }, [])

    const barRef = useRef<any>()
    const [tooltipPosition, setTooltipPosition] = useState<{
      x: number
      y: number
    } | null>(null)
    const [activeBarId, setActiveBarId] = useState<
      number | null
    >(null)

    const chartData = data

    const handleBarChartMouseMove = throttle(
      ({ isTooltipActive, activeTooltipIndex }) => {
        if (isTooltipActive) {
          setActiveBarId(activeTooltipIndex)
        } else {
          setActiveBarId(null)
        }
      },
      10,
    )

    const BarCell = useCallback(() => {
      return chartData.map((_, index) => (
        <Cell
          key={index}
          fill={
            activeBarId === index ?? activeBarId
              ? 'url(#barBlueActive)'
              : 'url(#barBlue)'
          }
        />
      ))
    }, [chartData, activeBarId])

    useEffect(() => {
      if (activeBarId !== null) {
        const { x, y } =
          barRef.current?.state?.curData[activeBarId] || {}
        setTooltipPosition({ x, y })
      }
    }, [activeBarId])

    return (
      <TradesVolumeChartStyled.Component>
        <SubChartHeader
          title={'Trades Volume Distribution'}
        />

        <TradesVolumeChartStyled.Body>
          <ResponsiveContainer
            width="99%"
            height="100%"
            debounce={1}
          >
            <BarChart
              data={chartData}
              onMouseMove={handleBarChartMouseMove}
            >
              {Gradients()}
              {Axes({
                data: chartData,
                dataValueKey: 'swapsCount',
                xAxisProps: {
                  dataKey: 'tradeAmount',
                },
                yAxisProps: {
                  tickFormat: {
                    type: 'number',
                  },
                },
              })}
              <Tooltip
                {...(tooltipPosition && {
                  position: {
                    x: tooltipPosition.x - 15,
                    y: tooltipPosition.y - 55,
                  },
                })}
                cursor={false}
                content={CustomTooltip({
                  type: 'number',
                  shouldBeShortened: false,
                  showValueLabel: true,
                  labelFormatter: () => 'Swaps:',
                })}
              />

              <Bar
                ref={barRef}
                name="Traders Distribution by Volume"
                dataKey="swapsCount"
                fill="url(#barBlue)"
                radius={[8, 8, 8, 8]}
                barSize={25}
              >
                {BarCell()}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </TradesVolumeChartStyled.Body>
      </TradesVolumeChartStyled.Component>
    )
  },
)
