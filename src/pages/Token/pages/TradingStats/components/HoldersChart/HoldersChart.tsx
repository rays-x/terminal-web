import React, { useMemo } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { Gradients } from '../Gradients/Gradients'
import { CustomTooltip } from '../CustomTooltip/CustomTooltip'
import { Axes } from '../Axes/Axes'
import { getLineDefaults } from '../../TradingStats'
import { dateMapF } from '../../../../../../presets/helpers/charts'
import {
  chooseNumeralFormat,
  formatNumeral,
} from '../../../../../../utils/numbers'
import { SubChartHeader } from '../../../../components/SubChart/SubChartHeader/SubChartHeader'
import { SubChartValue } from '../../../../components/SubChart/SubChartValue/SubChartValue'
import { HoldersChartStyled } from './HoldersChart-styled'
// import {dropDown} from '../../../../../../components/_old/ui/Dropdown/DropDown';
import { CurrentCoinData } from '../../../../CoinPage'
import { get } from 'lodash'
import { useFetch } from '../../../../../../hooks'
import { TokenHoldersResponse } from '../../../../../../types/api/TokenHoldersResponse'
import {
  BQ_API_KEY,
  BqPlatformMapper,
} from '../../../../../../constants'
import { gqlQuery } from './constants'
import { UniqueReceiversResponse } from './types'

/*const [dropDownState, DropDown] = dropDown<number>({
  width: 100,
  wrapperWidth: 64
});*/

export const HoldersChart: React.FC = React.memo(() => {
  /*const {
  options,
  selected: [selectedRow, setSelectedRow],
  active: [activeRow, setActiveRow]
} = dropDownState({
  options: [],
  selectedOption: 10
});*/
  const currentCoinData = React.useContext(CurrentCoinData)

  const fromDate = useMemo(
    () => Date.now() - 14 * 24 * 60 * 60 * 1000,
    [],
  )
  const toDate = useMemo(() => Date.now(), [])

  const { data } = useFetch<UniqueReceiversResponse>({
    url: 'https://graphql.bitquery.io/',
    withCredentials: false,
    method: 'POST',
    headers: {
      'X-Api-Key': BQ_API_KEY,
    },
    data: {
      query: gqlQuery,
      variables: {
        from: new Date(fromDate).toISOString(),
        till: new Date(toDate).toISOString(),
        dateFormat: '%Y-%m-%d',
        network:
          BqPlatformMapper[
            currentCoinData?.platforms[0]?.coingecko_slug ||
              ''
          ],
        token: currentCoinData?.platforms[0].address,
      },
    },
  })

  const chartData = React.useMemo(() => {
    return (
      data?.data?.ethereum.transfers
        .map((transfer) => ({
          date: transfer.date.date,
          count: Number.parseInt(transfer.count, 10),
        })) ?? []
    )
  }, [data])

  const totalValue = data?.data?.ethereum.transfers[0].count;
  const value = formatNumeral(
    totalValue,
    chooseNumeralFormat({
      value: totalValue,
    }),
  )

  return (
    <HoldersChartStyled.Component>
      <SubChartHeader
        title={'Holders'}
        /*titleContent={
          <DropDown
            title={'Total'}
            options={options}
            selectedOption={selectedRow}
            setSelectedOption={setSelectedRow}
            activeOption={activeRow}
            setActiveOption={setActiveRow}
          />
        }*/
        chartValue={<SubChartValue value={value} />}
      />

      <HoldersChartStyled.Body>
        <ResponsiveContainer
          width="98%"
          height="100%"
          debounce={1}
        >
          <AreaChart data={chartData}>
            <CartesianGrid
              stroke="rgba(255, 255, 255, 0.06)"
              vertical={false}
            />
            {Gradients()}
            {Axes({
              data: chartData,
              yAxisProps: {
                tickFormat: {
                  formatValue: (_) => _,
                },
              },
            })}
            <Tooltip
              content={CustomTooltip({
                valueFormatter: (_) => _,
              })}
            />
            <Area
              name="Holders"
              type="monotone"
              dataKey="count"
              {...getLineDefaults(
                'url(#orangeFill)',
                'url(#orangeStroke)',
              )}
            />
          </AreaChart>
        </ResponsiveContainer>
      </HoldersChartStyled.Body>
    </HoldersChartStyled.Component>
  )
})
