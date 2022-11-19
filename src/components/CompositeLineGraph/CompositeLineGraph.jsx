import {
  AnimatedAxis, // any of these can be non-animated equivalents
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
} from '@visx/xychart'
import { number, oneOfType, string } from 'prop-types'

const data1 = [
  { x: '2020-01-01', y: 50 },
  { x: '2020-01-02', y: 10 },
  { x: '2020-01-03', y: 20 },
]

const data2 = [
  { x: '2020-01-01', y: 30 },
  { x: '2020-01-02', y: 40 },
  { x: '2020-01-03', y: 80 },
]

const accessors = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
}

/**
 * Does not need a relatively positioned parent for the tooltips
 * @returns
 */
export default function CompositeLineGraph({ width, height }) {
  return (
    <XYChart
      height={height ? height : 300}
      width={width}
      xScale={{ type: 'band' }}
      yScale={{ type: 'linear' }}>
      <AnimatedAxis orientation="bottom" />
      <AnimatedGrid columns={false} numTicks={4} />
      <AnimatedLineSeries dataKey="Area 1" data={data1} {...accessors} />
      <AnimatedLineSeries
        dataKey="Area 2"
        data={data2}
        {...accessors}
        opacity={0.5}
      />
      <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        showVerticalCrosshair
        showSeriesGlyphs
        renderTooltip={({ tooltipData, colorScale }) => (
          <div>
            <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
              {tooltipData.nearestDatum.key}
            </div>
            {accessors.xAccessor(tooltipData.nearestDatum.datum)}
            {', '}
            {accessors.yAccessor(tooltipData.nearestDatum.datum)}
          </div>
        )}
      />
    </XYChart>
  )
}

CompositeLineGraph.propTypes = {
  width: oneOfType([string, number]),
  height: oneOfType([string, number]),
}
