import React from 'react'
import useMeasure from 'react-use-measure'
import ProgressChart from '../../components/ProgressChart'
import styles from './Analytics.module.css'
import appleStock from '@visx/mock-data/lib/mocks/appleStock'
import {
  AnimatedAxis, // any of these can be non-animated equivalents
  AnimatedAreaSeries,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
} from '@visx/xychart'
import { scaleBand, scaleLinear } from '@visx/scale'
import { Group } from '@visx/group'
import { AxisBottom } from '@visx/axis'
import BarChart from '../../components/BarChart/BarChart'
import BarChartRoundTop from '../../components/BarChartRoundTop'

function Analytics() {
  const barChartData = appleStock.slice(0, 22) // End exclusive

  const data1 = appleStock.slice(0, 100)

  const data2 = appleStock.slice(0, 100).map(({ date, close }) => {
    return { date, close: close + 20 + 5 * Math.sin(close) }
  })

  const accessors = {
    xAccessor: (d) => new Date(d.date).toLocaleDateString(),
    yAccessor: (d) => d.close,
  }

  const barChartAccessor = {
    xAccessor: (d) => new Date(d.date).toLocaleDateString(),
    yAccessor: (d) => d.close,
  }

  const MARGIN = 20
  const DEFAULT_WIDTH = 100
  const DEFAULT_HEIGHT = 100
  const [barRef, bounds] = useMeasure()

  const responsiveWidth = bounds.width || DEFAULT_WIDTH
  const responsiveHeight = bounds.height || DEFAULT_HEIGHT

  const innerWidth = responsiveWidth - MARGIN
  const innerHeight = responsiveHeight - MARGIN

  // Scales
  const xScale = scaleBand({
    range: [MARGIN, innerWidth],
    domain: barChartData.map(barChartAccessor.xAccessor),
    padding: 0.85, // Adjust to center bars, if you're not using the bandwidth
    // Testing
  })

  const yScale = scaleLinear({
    range: [innerHeight, MARGIN],
    domain: [
      Math.min(...barChartData.map(barChartAccessor.yAccessor)) - 1,
      Math.max(...barChartData.map(barChartAccessor.yAccessor)) + 1,
    ],
    padding: 0.2,
  })

  return (
    <div className={styles.container}>
      <XYChart
        height={300}
        xScale={{ type: 'band' }}
        yScale={{ type: 'linear' }}>
        <AnimatedAxis numTicks={5} orientation="bottom" />
        <AnimatedAxis orientation="left" />
        <AnimatedLineSeries dataKey="Line 1" data={data1} {...accessors} />
        <AnimatedLineSeries
          dataKey="Line 2"
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
      <XYChart
        height={300}
        xScale={{ type: 'band' }}
        yScale={{ type: 'linear' }}>
        <AnimatedAxis numTicks={5} orientation="bottom" />
        <AnimatedAxis orientation="left" />
        <AnimatedAreaSeries dataKey="Line 1" data={data1} {...accessors} />
        <AnimatedAreaSeries
          dataKey="Line 2"
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
      <div className={styles.progress}>
        <ProgressChart
          progress={351}
          total={500}
          innerRadius={87}
          outerRadius={90}
          width={200}
        />
      </div>
      <div className={styles.verticalBarChart}>
        <svg
          ref={barRef}
          width={'100%'}
          height={`calc(100% - ${MARGIN}px)`}
          viewBox={`0 0 ${responsiveWidth} ${responsiveHeight}`}>
          <Group>
            {barChartData.map((d) => {
              const xValue = barChartAccessor.xAccessor(d)
              //const barWidth = xScale.bandwidth()
              const barWidth = 10
              const barHeight =
                innerHeight - (yScale(barChartAccessor.yAccessor(d)) ?? 0)

              const barX = xScale(xValue)
              const barY = innerHeight - barHeight
              const r = 4

              return (
                <path
                  key={`bar-${xValue}`}
                  d={`M${barX} ${barY + r} q0 -${r} ${r} ${-r} h${
                    barWidth - 2 * r
                  } q${r} 0 ${r} ${r} v${barHeight} h${-barWidth} z`}
                  fill="#151646"
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
              numTicks={Math.floor(barChartData.length / 2)}
            />
          </Group>
          {/* <Group>
              <AxisRight left={MARGIN} scale={yScale} label={'GHJG'} />
            </Group> */}
        </svg>
      </div>
      <div style={{ position: 'relative', height: '500px' }}>
        <BarChart width={500} accessor={barChartAccessor} data={barChartData} />
      </div>
      <div style={{ position: 'relative', height: '500px' }}>
        <BarChartRoundTop
          r={4}
          width={500}
          accessor={barChartAccessor}
          data={barChartData}
        />
      </div>
    </div>
  )
}

export default Analytics
