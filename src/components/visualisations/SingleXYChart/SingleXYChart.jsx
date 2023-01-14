import ParentSize from '@visx/responsive/lib/components/ParentSize';

import {
  AnimatedAreaSeries,
  AnimatedAxis,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from '@visx/xychart';

import React from 'react';
import {
  any,
  array,
  func,
  number,
  oneOf,
  oneOfType,
  shape,
  string,
} from 'prop-types';

import { curveLinear } from '@visx/curve';

SingleXYChart.propTypes = {
  data: array,
  accessors: shape({
    xAccessor: func,
    yAccessor: func,
  }),
  stroke: string,
  fill: string,
  type: oneOf(['line', 'area']),
  height: oneOfType([string, number]),
  opacity: number,
  strokeOpacity: number,
  curve: any,
};

export default function SingleXYChart({
  data,
  accessors,
  type = 'line',
  fill,
  stroke,
  height,
  opacity,
  strokeOpacity,
  curve = curveLinear,
}) {
  return (
    <ParentSize>
      {({ width }) => (
        <XYChart
          height={height}
          width={width}
          xScale={{ type: 'band' }}
          yScale={{ type: 'linear' }}>
          <AnimatedAxis numTicks={5} orientation="bottom" />
          <AnimatedAxis numTicks={5} orientation="left" />
          {type == 'line' ? (
            <AnimatedLineSeries
              dataKey="Line 1"
              curve={curve}
              stroke={stroke}
              data={data}
              opacity={opacity}
              strokeOpacity={strokeOpacity}
              {...accessors}
            />
          ) : (
            <AnimatedAreaSeries
              curve={curve}
              fill={fill}
              dataKey="Line 1"
              stroke={stroke}
              data={data}
              opacity={opacity}
              strokeOpacity={strokeOpacity}
              {...accessors}
            />
          )}
          <Tooltip
            snapTooltipToDatumX
            snapTooltipToDatumY
            showVerticalCrosshair
            showSeriesGlyphs
            renderTooltip={({ tooltipData, colorScale }) => (
              <div>
                <div
                  style={{
                    color: colorScale(tooltipData.nearestDatum.key),
                  }}>
                  {tooltipData.nearestDatum.key}
                </div>
                {accessors?.xAccessor(tooltipData.nearestDatum.datum)}
                {', '}
                {accessors?.yAccessor(tooltipData.nearestDatum.datum)}
              </div>
            )}
          />
        </XYChart>
      )}
    </ParentSize>
  );
}
