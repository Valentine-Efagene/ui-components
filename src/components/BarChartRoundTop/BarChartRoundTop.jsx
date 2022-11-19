import React from 'react'
//import appleStock from '@visx/mock-data/lib/mocks/appleStock'
import useMeasure from 'react-use-measure'
import { scaleBand, scaleLinear } from '@visx/scale'
import { Group } from '@visx/group'
import { AxisLeft, AxisBottom } from '@visx/axis'
import { Bar } from '@visx/shape'
import { arrayOf, number, shape, string, func } from 'prop-types'
//import styles from './BarChartRoundTop.module.css'
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import { timeParse, timeFormat } from 'd3-time-format'

const MARGIN = 32
const DEFAULT_WIDTH = 100
const DEFAULT_HEIGHT = 100
//const data = appleStock.slice(0, 5)

/**
 * @example
 * 
 * import appleStock from '@visx/mock-data/lib/mocks/appleStock'
 * 
 * const data = appleStock.slice(0, 22) // End exclusive
 *   const accessors = {
    xAccessor: (d) => new Date(d.date).toLocaleDateString(),
    yAccessor: (d) => d.close,
  }

   <div style={{ position: 'relative', height: '500px' }}>
        <BarChartRoundTop r={4} width={500} accessor={accessors} data={data} />
      </div>
 * 
 *@param {number} r Value to determine the curve of the bar top
 * 
 * @returns
 */
function BarChartRoundTop({ data, width, height, accessor, r }) {
  const [ref, bounds] = useMeasure()
  let tooltipTimeout
  const tooltipStyles = {
    ...defaultStyles,
    minWidth: 60,
    backgroundColor: 'rgba(0,0,0,0.9)',
    color: 'white',
  }

  const { TooltipInPortal } = useTooltipInPortal({
    // TooltipInPortal is rendered in a separate child of <body /> and positioned
    // with page coordinates which should be updated on scroll. consider using
    // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
    scroll: true,
  })

  const responsiveWidth = bounds.width || DEFAULT_WIDTH
  const responsiveHeight = bounds.height || DEFAULT_HEIGHT

  const innerWidth = responsiveWidth - MARGIN
  const innerHeight = responsiveHeight - MARGIN

  // Selectors
  const getXValue = accessor.xAccessor
  const getYValue = accessor.yAccessor

  // Scales
  const xScale = scaleBand({
    range: [MARGIN, innerWidth],
    domain: data.map(getXValue),
    padding: 0.2,
  })

  const yScale = scaleLinear({
    range: [innerHeight, MARGIN],
    domain: [
      Math.min(...data.map(getYValue)) - 1,
      Math.max(...data.map(getYValue)) + 1,
    ],
    padding: 0.2,
  })
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip()

  const parseDate = timeParse('%Y-%m-%d')
  const format = timeFormat('%b %d')
  const formatDate = (date) => format(parseDate(date))

  return (
    <>
      <svg
        ref={ref}
        width={width ?? '100%'}
        height={height ?? `calc(100% - ${MARGIN}px)`}
        viewBox={`0 0 ${responsiveWidth} ${responsiveHeight}`}>
        <Group>
          {data.map((d) => {
            const xValue = accessor.xAccessor(d)
            //const barWidth = xScale.bandwidth()
            const barWidth = 10
            const barHeight = innerHeight - (yScale(accessor.yAccessor(d)) ?? 0)

            const barX = xScale(xValue)
            const barY = innerHeight - barHeight

            return (
              <path
                key={`bar-${xValue}`}
                d={`M${barX} ${barY + r} q0 -${r} ${r} ${-r} h${
                  barWidth - 2 * r
                } q${r} 0 ${r} ${r} v${barHeight} h${-barWidth} z`}
                fill="#151646"
                onClick={() => {
                  alert(`clicked: ${JSON.stringify(d)}`)
                }}
                onMouseLeave={() => {
                  tooltipTimeout = window.setTimeout(() => {
                    hideTooltip()
                  }, 300)
                }}
                onMouseMove={(event) => {
                  if (tooltipTimeout) clearTimeout(tooltipTimeout)
                  // TooltipInPortal expects coordinates to be relative to containerRef
                  // localPoint returns coordinates relative to the nearest SVG, which
                  // is what containerRef is set to in this example.
                  const eventSvgCoords = localPoint(event)
                  const left = barX + barWidth / 2
                  showTooltip({
                    tooltipData: d,
                    tooltipTop: eventSvgCoords?.y,
                    tooltipLeft: left,
                  })
                }}
              />
            )
          })}
        </Group>
        <Group>
          <AxisBottom
            hideAxisLine={true}
            hideTicks={true}
            top={innerHeight}
            scale={xScale}
            numTicks={Math.floor(data.length / 2)}
          />
        </Group>
        <Group>
          <AxisLeft
            hideAxisLine={true}
            hideTicks={true}
            left={MARGIN}
            scale={yScale}
            label={'GHJG'}
          />
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}>
          <div style={{ color: '#ffffff' }}>
            <strong>{accessor.yAccessor(tooltipData)}</strong>
          </div>
          <div>
            <small>{formatDate(accessor.xAccessor(tooltipData))}</small>
          </div>
        </TooltipInPortal>
      )}
    </>
  )
}

BarChartRoundTop.propTypes = {
  data: arrayOf(
    shape({
      Symbol: string,
      value: number,
      color: string,
    })
  ),
  width: string,
  height: string,
  accessor: shape({
    x: func,
    y: func,
  }),
  r: number,
}

export default BarChartRoundTop
