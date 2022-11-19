import React from 'react'
import { AreaStack } from '@visx/shape'
import { SeriesPoint } from '@visx/shape/lib/types'
import { GradientOrangeRed } from '@visx/gradient'
import browserUsage from '@visx/mock-data/lib/mocks/browserUsage'
import { scaleTime, scaleLinear } from '@visx/scale'
import { timeParse } from 'd3-time-format'
import useMeasure from 'react-use-measure'

const data = browserUsage
const keys = Object.keys(data[0]).filter((k) => k !== 'date')
const parseDate = timeParse('%Y %b %d')
export const background = '#f38181'

const getDate = (d) => parseDate(d.date).valueOf()
const getY0 = (d) => d[0] / 100
const getY1 = (d) => d[1] / 100

export default function Example() {
  const margin = { top: 0, right: 0, bottom: 0, left: 0 }

  // bounds
  const [ref, bounds] = useMeasure()
  const width = bounds.width || 100
  const height = bounds.height || 100
  const yMax = height - margin.top - margin.bottom
  const xMax = width - margin.left - margin.right

  // scales
  const xScale = scaleTime({
    range: [0, xMax],
    domain: [Math.min(...data.map(getDate)), Math.max(...data.map(getDate))],
  })
  const yScale = scaleLinear({
    range: [yMax, 0],
  })

  return width < 10 ? null : (
    <svg
      ref={ref}
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}>
      <GradientOrangeRed id="stacked-area-orangered" />
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={background}
        rx={14}
      />
      <AreaStack
        top={margin.top}
        left={margin.left}
        keys={keys}
        data={data}
        x={(d) => xScale(getDate(d.data)) ?? 0}
        y0={(d) => yScale(getY0(d)) ?? 0}
        y1={(d) => yScale(getY1(d)) ?? 0}>
        {({ stacks, path }) =>
          stacks.map((stack) => (
            <path
              key={`stack-${stack.key}`}
              d={path(stack) || ''}
              stroke="transparent"
              fill="url(#stacked-area-orangered)"
              onClick={(e) => {
                alert('Clicked')
              }}
            />
          ))
        }
      </AreaStack>
    </svg>
  )
}
