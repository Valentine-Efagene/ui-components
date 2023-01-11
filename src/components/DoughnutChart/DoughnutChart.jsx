import { useState } from 'react'
import { Pie } from '@visx/shape'
import { Group } from '@visx/group'
import { Text } from '@visx/text'
import { LegendOrdinal } from '@visx/legend'
import { scaleOrdinal } from '@visx/scale'
import { shape, string } from 'prop-types'

import styles from './DoughnutChart.module.css'
import { number, arrayOf } from 'prop-types'

/**
 * 
 * @param {*} param0 
 * @returns 
 * 
 * @example
 * const data = [
      {
        symbol: 'Community Liquidity Providers = 1,200,000,000 (40%)',
        percent: 40,
        color: '#F4DAA9',
      },
      {
        symbol: 'Pre-Sale Liquidity Providers = 750,000,000 (25%)',
        percent: 25,
        color: '#A4B5F8',
      },
      {
        symbol: 'Reserve Holdings / Treasury = 150,000,000 (5%)',
        percent: 5,
        color: '#E89AAD',
      },
      {
        symbol: 'Long-Term Compensation = 150,000,000 (5%)',
        percent: 5,
        color: '#29EBF3',
      },
    ]
    
    <DoughnutChart
        data={data}
        innerRadius={50}
        outerRadius={90}
        increment={10}
        width={200}
      />
 */
function DoughnutChart({ data, innerRadius, outerRadius, width, increment }) {
  const scale = scaleOrdinal({
    domain: data.map((a) => `${a.symbol}`),
    range: data.map((a) => a.color),
  })
  const [active, setActive] = useState()

  return (
    <div testid="doughnut" className={styles.container}>
      <svg width={width} height={width}>
        <Group top={width / 2} left={width / 2}>
          <Pie
            data={data}
            pieValue={(data) => data.percent}
            innerRadius={innerRadius}
            outerRadius={({ data }) => {
              return (active && active?.symbol) == data.symbol
                ? outerRadius + increment
                : outerRadius
            }}
            padAngle={0.01}>
            {(pie) => {
              return pie.arcs.map((arc) => {
                return (
                  <g
                    key={arc.data.symbol}
                    onMouseEnter={() => {
                      setActive(arc.data)
                    }}
                    onMouseLeave={() => {
                      setActive(null)
                    }}>
                    <path
                      d={pie?.path(arc) ?? undefined}
                      fill={arc?.data?.color}></path>
                  </g>
                )
              })
            }}
          </Pie>
          <Text textAnchor="middle" fill="white">
            {active ? `${active?.percent}%` : ''}
          </Text>
        </Group>
      </svg>
      <LegendOrdinal
        className={styles.legend}
        scale={scale}
        direction="column-reverse"
        itemDirection="row-reverse"
        labelMargin="0 20px 0 0"
        shapeMargin="1px 0 0"
      />
    </div>
  )
}

DoughnutChart.propTypes = {
  data: arrayOf(
    shape({
      symbol: string,
      percent: number,
      color: string,
    })
  ),
  width: number,
  innerRadius: number,
  outerRadius: number,
  increment: number,
}

export default DoughnutChart
