import { string } from 'prop-types'
import React, { useEffect } from 'react'
import { useState } from 'react'
//import styles from './LineGraph.module.css'
import { defaultStyles, TooltipWithBounds, useTooltip } from '@visx/tooltip'
import useMeasure from 'react-use-measure'
import { scaleTime, scaleLinear } from '@visx/scale'
import { extent, bisector } from 'd3-array'
import { Group } from '@visx/group'
import { LinePath, Bar, Line } from '@visx/shape'
import { curveMonotoneX } from '@visx/curve'
//import { AxisLeft, AxisBottom } from '@visx/axis'
import { timeFormat } from 'd3-time-format'
import localpoint from '@visx/event/lib/localPoint'

/**
 * Must be placed in a container with relative positioning.
 * It will take the dimensions of the container
 *
 * @example
 * // Container must be relative positioned
 * <div className={styles.container}>
 *  <LineGraph />
 * </div>
 *
 * @returns
 */
function LineGraph() {
  const [data, setData] = useState()

  useEffect(() => {
    fetch(
      'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7'
    )
      .then((res) => res.json())
      .then(({ prices }) => setData(prices))
      .catch((error) => console.log(error))
  }, [])

  const getXValue = (d) => new Date(d?.[0])
  const getYValue = (d) => d?.[1]

  const tooltipStyles = {
    ...defaultStyles,
    borderRadius: 4,
    background: '#161434',
    color: '#adadd3',
    fontFamily: 'sans-serif',
  }

  const bisectDate = bisector(getXValue).left

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  const [ref, bounds] = useMeasure()
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip()

  const width = bounds.width || 100
  const height = bounds.height || 100

  if (!(data?.length > 0)) return <div>Loading</div>

  // Scales
  const xScale = scaleTime({
    range: [0, width],
    domain: extent(data, getXValue),
  })

  const yScale = scaleLinear({
    domain: extent(data, getYValue),
    range: [height, 0],
  })

  return (
    <>
      <svg
        ref={ref}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}>
        <Group>
          <LinePath
            data={data}
            x={(d) => xScale(getXValue(d)) ?? 0}
            y={(d) => yScale(getYValue(d)) ?? 0}
            stroke="#23dbbd"
            strokeWidth={2}
            curve={curveMonotoneX}
            pointerEvents="none"
            strokeDasharray="5, 5"
          />
        </Group>
        {/* <Group>
          <AxisBottom top={height} scale={xScale} />
        </Group>
        <Group>
          <AxisLeft left={0} scale={yScale} />
        </Group> */}
        <Group>
          <Bar
            width={width}
            height={height}
            fill="transparent"
            onMouseMove={(e) => {
              const { x } = localpoint(e) || { x: 0 }
              const x0 = xScale.invert(x)
              const index = bisectDate(data, x0, 1)
              const d0 = data[index - 1]
              const d1 = data[index]
              let d = d0

              if (d1 && getXValue(d1)) {
                d =
                  x0.valueOf() - getXValue(d0).valueOf() >
                  getXValue(d1).valueOf() - x0.valueOf()
                    ? d1
                    : d0
              }

              showTooltip({
                tooltipData: d,
                tooltipLeft: x,
                tooltipTop: yScale(getYValue(d)),
              })
            }}
            onMouseLeave={() => hideTooltip()}
          />
        </Group>

        {tooltipData && (
          <Group>
            <Line
              from={{ x: tooltipLeft, y: 0 }}
              to={{ x: tooltipLeft, y: height }}
              stroke="#595bbd"
              strokeWidth={1}
              pointerEvents="none"
              strokeDasharray="5, 5"></Line>
            <circle
              cx={tooltipLeft}
              cy={tooltipTop}
              r={8}
              fill="#FF4DCA"
              fillOpacity={0.5}
              pointerEvents="none"
            />
            <circle
              cx={tooltipLeft}
              cy={tooltipTop}
              r={4}
              fill="#FF4DCA"
              pointerEvents="none"
            />
          </Group>
        )}
      </svg>
      {tooltipData && (
        <TooltipWithBounds
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}>
          {`${timeFormat('%b %d %H:%M ')(new Date(getXValue(tooltipData)))}`}{' '}
          <b>{formatter.format(getYValue(tooltipData))}</b>
        </TooltipWithBounds>
      )}
    </>
  )
}

LineGraph.propTypes = {
  className: string,
}

export default LineGraph
