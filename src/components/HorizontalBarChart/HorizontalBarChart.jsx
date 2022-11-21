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
import { any } from 'prop-types'

const MARGIN = 50

const accessors = {
  xAccessor: (d) => d.value,
  yAccessor: (d) => d.title,
}

const data = [
  { title: 'Conversation', value: 40 },
  { title: 'Pending', value: 70 },
  { title: 'Decline', value: 80 },
  { title: 'Approve', value: 90 },
]

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
    domain: data.map(accessors.yAccessor),
  })

  const colors = ['#151646', '#E2BF07', '#F04438', '#33B469']
  const yValues = data.map(accessors.yAccessor)
  const colorMap = {}
  yValues.forEach((v, index) => {
    colorMap[v] = colors[index]
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
            const yValue = accessors.yAccessor(d)
            const barWidth = xScale(accessors.xAccessor(d)) ?? 0
            const barHeight = 10
            const barY = yScale(yValue)
            const barX = 0

            return (
              <Bar
                key={`bar-${yValue}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={colorMap[accessors.yAccessor(d)]}
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
            scale={yScale}
            tickLabelProps={() => ({
              dy: '-45',
              fontWeight: 600,
              fontSize: '1rem',
              textAnchor: 'middle',
              color: 'red',
            })}
            // I'm just using this to get used to custom tick components
            tickComponent={(tickRendererProps) => {
              const { formattedValue } = tickRendererProps
              return (
                <text
                  {...tickRendererProps}
                  style={{ writingMode: 'vertical-rl' }}>
                  {formattedValue}
                </text>
              )
            }}
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

function Tick({ tickRendererProps }) {
  return <span {...tickRendererProps}>Text</span>
}

Tick.propTypes = {
  tickRendererProps: any,
}

HorizontalBarChart.propTypes = {
  defaultWidth: oneOf([number, string]),
  defaultHeight: oneOf([number, string]),
}

export default HorizontalBarChart
