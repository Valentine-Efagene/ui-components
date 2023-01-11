import ParentSize from '@visx/responsive/lib/components/ParentSize'
import {
  AnimatedAxis,
  AnimatedAreaSeries,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
} from '@visx/xychart'
import { array } from 'prop-types'
//import styles from './XYGraph.module.css'

import appleStock from '@visx/mock-data/lib/mocks/appleStock'
import { timeParse, timeFormat } from 'd3-time-format'
import { shape } from 'prop-types'
import { func } from 'prop-types'
import { oneOf } from 'prop-types'

const mockData = appleStock.slice(0, 100)
const mockAccessors = {
  xAccessor: (d) => d.date,
  yAccessor: (d) => d.close,
}

const parseDate = timeParse('%Y-%m-%d')
const format = timeFormat('%b')
const formatDate = (date) => format(parseDate(date))

const axisFormat = timeFormat('%m')
const formatAxisDate = (date) => axisFormat(parseDate(date))

const mockConfig = [
  {
    key: 'Likes',
    data: mockData,
    fill: '#EEF5DF',
    stroke: '#000000',
    strokeOpacity: 0.3,
    opacity: 0.8,
    glyphColor: '#5161EE',
  },
  {
    key: 'Comments',
    data: mockData.map((datum) => {
      const { date, close } = datum
      return { date, close: close + 40 }
    }),
    fill: '#E5E4F7',
    stroke: 'red',
    strokeOpacity: 0.3,
    opacity: 0.8,
    glyphColor: '#33B469',
  },
]

const mockAxisFormats = {
  xFormat: formatAxisDate,
}

const mockTooltipFormats = {
  xFormat: formatDate,
}

export default function XYGraph({
  config = mockConfig,
  accessors = mockAccessors,
  axisFormats = mockAxisFormats,
  tooltipFormats = mockTooltipFormats,
  type = 'area',
}) {
  return (
    <ParentSize>
      {({ width, height }) => (
        <XYChart
          width={width}
          height={height}
          xScale={{ type: 'band' }}
          yScale={{ type: 'linear' }}>
          <AnimatedAxis
            numTicks={5}
            orientation="bottom"
            tickFormat={axisFormats.xFormat}
          />
          {config.map((conf) => {
            const { key, fill, data, stroke, strokeOpacity, opacity } = conf
            return type === 'area' ? (
              <AnimatedAreaSeries
                key={key}
                dataKey={key}
                fill={fill}
                stroke={stroke}
                strokeOpacity={strokeOpacity}
                data={data}
                {...accessors}
                opacity={opacity}
              />
            ) : (
              <AnimatedLineSeries
                key={key}
                dataKey={key}
                stroke={stroke}
                strokeOpacity={strokeOpacity}
                data={data}
                {...accessors}
                opacity={opacity}
              />
            )
          })}
          <Tooltip
            snapTooltipToDatumX
            renderGlyph={(renderTooltipGlyphProp) => {
              /*const renderTooltipGlyphProp = {
                  color: '#0b7285',
                  datum: { month: 3, count: 1 },
                  glyphStyle: undefined,
                  index: 2,
                  isNearestDatum: false,
                  key: 'Likes',
                  size: 4,
                  x: 0,
                  y: 0,
                };*/
              const { size, key } = renderTooltipGlyphProp
              const fill = config.find((conf) => conf.key === key).glyphColor
              return <circle fill={fill} r={size} {...renderTooltipGlyphProp} />
            }}
            snapTooltipToDatumY
            showVerticalCrosshair
            showSeriesGlyphs
            renderTooltip={({ tooltipData, colorScale }) => {
              return (
                <div>
                  {Object.keys(tooltipData?.datumByKey).map((dataKey) => {
                    const { datum } = tooltipData.datumByKey[dataKey]
                    console.log(tooltipData)
                    return (
                      <>
                        <div
                          style={{
                            color: colorScale(dataKey),
                          }}>
                          {dataKey}
                        </div>
                        {tooltipFormats.xFormat(accessors.xAccessor(datum))}
                        {', '}
                        {accessors.yAccessor(datum)}
                      </>
                    )
                  })}
                </div>
              )
            }}
          />
        </XYChart>
      )}
    </ParentSize>
  )
}

XYGraph.propTypes = {
  config: array,
  accessors: shape({
    xAccessor: func,
    yAccessor: func,
  }),
  tooltipFormats: shape({
    xFormat: func,
  }),
  axisFormats: shape({
    xFormat: func,
  }),
  type: oneOf(['line', 'area']),
}
