/* eslint-disable indent */
import React from 'react'
//import styles from './HorizontalBarChart.module.css';
import useMeasure from 'react-use-measure'
import { scaleBand, scaleLinear } from '@visx/scale'
import { Group } from '@visx/group'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { withTooltip, defaultStyles, Tooltip } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import { max } from 'd3-array'
import { oneOf } from 'prop-types'
import { string } from 'prop-types'
import { number } from 'prop-types'

const MARGIN = 100

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

export default withTooltip(
  ({
    defaultWidth,
    defaultHeight,
    hideTooltip,
    showTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft,
    tooltipTop,
  }) => {
    const [ref, bounds] = useMeasure()
    let tooltipTimeout
    const tooltipStyles = {
      ...defaultStyles,
      minWidth: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      color: '#ffffff',
    }

    const responsiveWidth = bounds.width || defaultWidth
    const responsiveHeight = bounds.height || defaultHeight

    const innerWidth = responsiveWidth - MARGIN
    const innerHeight = responsiveHeight - MARGIN

    const xScale = scaleLinear({
      range: [MARGIN, innerWidth],
      domain: [0, max(data, accessors.xAccessor) || 0],
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
              const barWidth = (xScale(accessors.xAccessor(d)) ?? 0) - MARGIN
              const barHeight = 10
              const barY = yScale(yValue)
              const barX = 0
              const r = 10

              return (
                /*<Bar
                key={`bar-${yValue}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={colorMap[accessors.yAccessor(d)]}
                onClick={() => {}}
                onMouseLeave={() => {
                  tooltipTimeout = window.setTimeout(() => {
                    hideTooltip();
                  }, 300);
                }}
                onMouseMove={event => {
                  if (tooltipTimeout) clearTimeout(tooltipTimeout);

                  const eventSvgCoords = localPoint(event);
                  const left = barX / 2 + barWidth;
                  showTooltip({
                    tooltipData: d,
                    tooltipLeft: left,
                    tooltipTop: eventSvgCoords?.y,
                  });
                }}
              />*/
                <path
                  key={`bar-${yValue}`}
                  d={`M${barX} ${barY} h${barWidth - r} q${r} 0 ${r} ${r} v${
                    barHeight - r
                  } q0 ${r} ${-r} ${r} h${-barWidth + r} z`}
                  fill={colorMap[accessors.yAccessor(d)]}
                  onClick={() => {}}
                  onMouseLeave={() => {
                    tooltipTimeout = window.setTimeout(() => {
                      hideTooltip()
                    }, 300)
                  }}
                  onMouseMove={(event) => {
                    const eventSvgCoords = localPoint(event)
                    showTooltip({
                      tooltipData: d,
                      tooltipLeft: eventSvgCoords?.x,
                      tooltipTop: eventSvgCoords?.y - 6 * barHeight,
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
            />
          </Group>
          <Group>
            <AxisLeft
              hideAxisLine={true}
              hideTicks={true}
              left={MARGIN / 2}
              scale={yScale}
              tickLabelProps={() => ({
                dy: '-30',
                fontWeight: 600,
                fontSize: '0.8rem',
                textAnchor: 'middle',
                color: 'red',
              })}
              // I'm just using this to get used to custom tick components
              tickComponent={(tickRendererProps) => {
                const { formattedValue } = tickRendererProps
                return <text {...tickRendererProps}>{formattedValue}</text>
              }}
            />
          </Group>
        </svg>
        {tooltipOpen &&
          tooltipData &&
          tooltipLeft != null &&
          tooltipTop != null && (
            <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
              <div style={{ color: '#ffffff' }}>
                <strong>{accessors.yAccessor(tooltipData)}</strong>
              </div>
              <div>
                <small>{accessors.xAccessor(tooltipData)}</small>
              </div>
            </Tooltip>
          )}
      </>
    )
  }
)

withTooltip.propTypes = {
  defaultWidth: oneOf([number, string]),
  defaultHeight: oneOf([number, string]),
}
