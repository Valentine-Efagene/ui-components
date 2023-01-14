import ParentSize from '@visx/responsive/lib/components/ParentSize';

import {
  AnimatedAreaSeries,
  AnimatedAxis,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from '@visx/xychart';

import { curveLinear } from '@visx/curve';

import React from 'react';
import {
  any,
  array,
  arrayOf,
  func,
  number,
  oneOf,
  oneOfType,
  shape,
  string,
} from 'prop-types';

DefaultXYChart.propTypes = {
  accessors: shape({
    xAccessor: func,
    yAccessor: func,
  }),
  chartInfo: arrayOf(
    shape({
      data: array,
      stroke: string,
      fill: string,
      type: oneOf(['line', 'area']),
      key: string,
      opacity: number,
      strokeOpacity: number,
      curve: any,
    }),
  ),
  height: oneOfType([string, number]),
  glyphColorMap: shape({
    [string]: string,
  }),
  generalCurve: any,
};

/**
 *
 * @param {{[key]: value}} glyphColorMap The key is the key of each chart, while the value is the color
 * @returns
 */
export default function DefaultXYChart({
  chartInfo,
  height,
  accessors,
  glyphColorMap,
  generalCurve = curveLinear,
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

          {chartInfo.map(chart => {
            const {
              type,
              opacity,
              strokeOpacity,
              fill,
              data,
              stroke,
              key,
              curve,
            } = chart;

            return (
              <>
                {type == 'line' ? (
                  <AnimatedLineSeries
                    curve={curve ?? generalCurve}
                    dataKey={key}
                    stroke={stroke}
                    data={data}
                    opacity={opacity}
                    strokeOpacity={strokeOpacity}
                    {...accessors}
                  />
                ) : (
                  <AnimatedAreaSeries
                    curve={curve ?? generalCurve}
                    fill={fill}
                    data={data}
                    dataKey={key}
                    stroke={stroke}
                    strokeOpacity={strokeOpacity}
                    {...accessors}
                  />
                )}
              </>
            );
          })}

          {glyphColorMap ? (
            <Tooltip
              snapTooltipToDatumX
              renderGlyph={renderTooltipGlyphProp => {
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
                const { size, key } = renderTooltipGlyphProp;
                //console.log(renderTooltipGlyphProp);
                return (
                  <circle
                    fill={glyphColorMap?.[key]}
                    r={size}
                    {...renderTooltipGlyphProp}
                  />
                );
              }}
              snapTooltipToDatumY
              showVerticalCrosshair
              showSeriesGlyphs
              renderTooltip={({ tooltipData, colorScale }) => {
                return (
                  <div>
                    {Object.keys(tooltipData?.datumByKey).map(dataKey => {
                      const { datum } = tooltipData.datumByKey[dataKey];
                      return (
                        <>
                          <div
                            style={{
                              color: colorScale(dataKey),
                            }}>
                            {dataKey}
                          </div>
                          {accessors.xAccessor(datum)}
                          {', '}
                          {accessors.yAccessor(datum)}
                        </>
                      );
                    })}
                  </div>
                );
              }}
            />
          ) : (
            <Tooltip
              snapTooltipToDatumX
              snapTooltipToDatumY
              showVerticalCrosshair
              showSeriesGlyphs
              renderTooltip={({ tooltipData, colorScale }) => {
                return (
                  <div>
                    {Object.keys(tooltipData?.datumByKey).map(dataKey => {
                      const { datum } = tooltipData.datumByKey[dataKey];
                      return (
                        <>
                          <div
                            style={{
                              color: colorScale(dataKey),
                            }}>
                            {dataKey}
                          </div>
                          {accessors.xAccessor(datum)}
                          {', '}
                          {accessors.yAccessor(datum)}
                        </>
                      );
                    })}
                  </div>
                );
              }}
            />
          )}
        </XYChart>
      )}
    </ParentSize>
  );
}
