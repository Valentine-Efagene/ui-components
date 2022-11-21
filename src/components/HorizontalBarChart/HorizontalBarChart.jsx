import React from 'react'
import styles from './HorizontalBarChart.module.css'
import useMeasure from 'react-use-measure'
import { scaleBand, scaleLinear } from '@visx/scale'
import { Group } from '@visx/group'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { useTooltip, defaultStyles, useTooltipInPortal } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import { extent, max, bisector } from 'd3-array'
import applestock from '@visx/mock-data/lib/mocks/appleStock'
import { oneOf } from 'prop-types'
import { string } from 'prop-types'
import { number } from 'prop-types'
import { Bar } from '@visx/shape'

const MARGIN = 32

const accessors = {
  xAccessor: (d) => d.closing,
  yAccessor: (d) => new Date(d.date).toLocaleDateString(),
}

const data = applestock.slice(5)

function HorizontalBarChart({ defaultWidth, defaultHeight }) {
  const [ref, bounds] = useMeasure()
  let tooltipTimeout
  const tooltipStyles = {
    ...defaultStyles,
    minWidth: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    color: '#ffffff',
  }

  const { TooltipInPortal } = useTooltipInPortal({
    // TooltipInPortal is rendered in a separate child of <body /> and positioned
    // with page coordinates which should be updated on scroll. consider using
    // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
    scroll: true,
  })

  const responsiveWidth = bounds.width || defaultWidth
  const responsiveHeight = bounds.height || defaultHeight

  const innerWidth = responsiveWidth - MARGIN
  const innerHeight = responsiveHeight - MARGIN

  const xScale = scaleLinear({
    range: [MARGIN, innerWidth],
    domain: extent(data, accessors.xAccessor),
  })

  const yScale = scaleBand({
    range: [innerHeight, MARGIN],
    domain: accessors.yAccessor,
  })

  const colorScale = scaleBand({
    range: [innerHeight, MARGIN],
    domain: ['#33B469', '#F04438', '#E2BF07', '#151646'],
  })

  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip()

  return (
    <>
      <svg
        ref={ref}
        width={defaultWidth ?? '100%'}
        height={defaultHeight ?? '100%'}
        viewBox={`0 0 ${responsiveWidth} ${responsiveHeight}`}>
        <Group left={MARGIN}>
          {data.map((d) => {
            const xValue = accessors.xAccessor
            const barWidth = 10
            const barHeight = innerWidth - xScale(accessors.xAccessor(d)) ?? 0
            const barX = xScale(xValue)
            const barY = innerHeight - barWidth

            return (
              <Bar
                key={`bar-${xValue}`}
                x={barX}
                y={barY}
                width={barHeight}
                height={barWidth}
                fill={colorScale(accessors.yAccessor(d))}
                onClick={() => {}}
                onMouseLeave={() => {
                  tooltipTimeout = window.setTimeout(() => {
                    hideTooltip()
                  }, 300)
                }}
                onMouseMove={(event) => {
                  if (tooltipTimeout) clearTimeout(tooltipTimeout)

                  const eventSvgCoords = localPoint(event)
                  const left = barX / 2 + barWidth
                  showTooltip({
                    tooltipData: d,
                    tooltipLeft: left,
                    tooltipTop: eventSvgCoords?.y,
                  })
                }}
              />
              /*<path
                key={`bar-${xValue}`}
                d={``}
                fill={colorScale(accessors.yAccessor(d))}
                onClick={() => {}}
                onMouseLeave={() => {
                  tooltipTimeout = window.setTimeout(() => {
                    hideTooltip()
                  }, 300)
                }}
                onMouseMove={(event) => {
                  const eventSvgCoords = localPoint(event)
                  const left = barX / 2 + barWidth
                  showTooltip({
                    tooltipData: d,
                    tooltipLeft: left,
                    tooltipTop: eventSvgCoords?.y,
                  })
                }}
            />*/
            )
          })}
        </Group>
        <Group>
          <AxisBottom
            hideAxisLine={true}
            hideTicks={true}
            top={innerHeight}
            scale={xScale}
          />
        </Group>
        <Group>
          <AxisLeft
            hideAxisLine={true}
            hideTicks={true}
            left={MARGIN}
            scale={xScale}
          />
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}>
          <div style={{ color: '#ffffff' }}>
            <strong>{accessors.yAccessor(tooltipData)}</strong>
          </div>
          <div>
            <small>{accessors.xAccessor(tooltipData)}</small>
          </div>
        </TooltipInPortal>
      )}
    </>
  )
}

HorizontalBarChart.propTypes = {
  defaultWidth: oneOf([number, string]),
  defaultHeight: oneOf([number, string]),
}

export default HorizontalBarChart
