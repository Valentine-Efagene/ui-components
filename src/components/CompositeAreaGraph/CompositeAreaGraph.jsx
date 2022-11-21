import {
  AnimatedAxis, // any of these can be non-animated equivalents
  AnimatedGrid,
  AnimatedAreaSeries,
  XYChart,
  Tooltip,
} from '@visx/xychart'
import {
  arrayOf,
  func,
  number,
  object,
  oneOfType,
  shape,
  string,
} from 'prop-types'

/**
 * Does not need a relatively positioned parent for the tooltips
 * @returns
 * 
 * @example
 * const data1 = [
  { x: '2020-01-01', y: 50 },
  { x: '2020-01-02', y: 10 },
  { x: '2020-01-03', y: 20 },
]

const data2 = [
  { x: '2020-01-01', y: 30 },
  { x: '2020-01-02', y: 40 },
  { x: '2020-01-03', y: 80 },
]

<CompositeAreaGraph accessors={areaAccessors} />
 */
export default function CompositeAreaGraph({
  width,
  height,
  accessors,
  datasets,
  xScaleType,
  yScaleType,
  fills,
  opacities,
}) {
  return (
    <XYChart
      height={height ? height : 300}
      width={width}
      xScale={{ type: xScaleType }}
      yScale={{ type: yScaleType }}>
      <AnimatedAxis orientation="bottom" />
      <AnimatedGrid columns={false} numTicks={4} />
      {datasets.map((data, index) => {
        fills ? (
          <AnimatedAreaSeries
            key={Math.random()}
            dataKey={`Area ${index}`}
            fill={fills?.[index]}
            opacity={opacities?.[index]}
            data={data}
            {...accessors}
          />
        ) : (
          <AnimatedAreaSeries
            key={Math.random()}
            dataKey={`Area ${index}`}
            fill={fills?.[index]}
            opacity={opacities?.[index]}
            data={data}
            {...accessors}
          />
        )
      })}
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

CompositeAreaGraph.propTypes = {
  width: oneOfType([string, number]),
  height: oneOfType([string, number]),
  accessors: shape({
    xAccessor: func,
    yAccessor: func,
  }),
  datasets: arrayOf(arrayOf(object)),
  xScaleType: string,
  yScaleType: string,
  fills: arrayOf(string),
  opacities: arrayOf(number),
}
