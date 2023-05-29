import React from 'react'
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
} from '../../../../../../constants'
import { gqlQuery } from './constants'
import { HoldersResponse, UniqueReceiversResponse } from './types'
import { getFormattedDateStr } from '../../../../../../utils/date/date'

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

  const { data } = useFetch<HoldersResponse>({
    url: `${import.meta.env.VITE_BACKEND_URL}/token/${currentCoinData?.id}/holders`,
    withCredentials: false,
    method: 'GET',
  })

  const chartData = React.useMemo(() => {
    return (
      data?.map((point) => ({
          date: getFormattedDateStr(new Date(point.t)),
          count: point.v,
        })) ?? []
    )
  }, [data])

  const totalValue = data?.[data?.length - 1].v;
  const value = formatNumeral(
    totalValue,
    chooseNumeralFormat({
      value: totalValue?.toString() || '0',
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
