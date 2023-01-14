import React from 'react';
//import appleStock from '@visx/mock-data/lib/mocks/appleStock'
import useMeasure from 'react-use-measure';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { arrayOf, number, shape, string, func } from 'prop-types';
import { defaultStyles, withTooltip, Tooltip } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { timeParse, timeFormat } from 'd3-time-format';

const MARGIN = 32;
const DEFAULT_WIDTH = 100;
const DEFAULT_HEIGHT = 100;
//const data = appleStock.slice(0, 5)

/**
 * @example
 * 
 * import appleStock from '@visx/mock-data/lib/mocks/appleStock'
 * 
 * const data = appleStock.slice(0, 22) // End exclusive
 *   const accessors = {
    xAccessor: (d) => new Date(d.date).toLocaleDateString(),
    yAccessor: (d) => d.close,
  }

   <div style={{ position: 'relative', height: '500px' }}>
        <AdminAuthorBarChart r={4} width={500} accessors={accessors} data={data} />
      </div>
 * 
 *@param {number} r Value to determine the curve of the bar top
 * 
 * @returns
 */
export default withTooltip(
  ({
    data,
    width,
    height,
    accessors,
    r,
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  }) => {
    const [ref, bounds] = useMeasure();
    let tooltipTimeout;
    const tooltipStyles = {
      ...defaultStyles,
      minWidth: 60,
      backgroundColor: 'rgba(0,0,0,0.9)',
      color: 'white',
    };

    const responsiveWidth = bounds.width || DEFAULT_WIDTH;
    const responsiveHeight = bounds.height || DEFAULT_HEIGHT;

    const innerWidth = responsiveWidth - MARGIN;
    const innerHeight = responsiveHeight - MARGIN;

    // Selectors
    const getXValue = accessors.xAccessor;
    const getYValue = accessors.yAccessor;

    // Scales
    const xScale = scaleBand({
      range: [MARGIN, innerWidth],
      domain: data.map(getXValue),
      padding: 0.2,
    });

    const yScale = scaleLinear({
      range: [innerHeight, MARGIN],
      domain: Math.max(...data.map(getYValue))
        ? [0, Math.max(...data.map(getYValue))]
        : [0, 100],
      padding: 0.2,
    });

    const parseDate = timeParse('%Y-%m-%d');
    const format = timeFormat('%b %d');
    const formatDate = date => format(parseDate(date));

    return (
      <>
        <svg
          ref={ref}
          width={'100%' ?? '100%'}
          height={'100%' ?? `calc(100% - ${MARGIN}px)`}
          viewBox={`0 0 ${responsiveWidth} ${responsiveHeight}`}>
          <Group>
            {data.map(d => {
              const xValue = accessors.xAccessor(d);
              //const barWidth = xScale.bandwidth()
              const barWidth = 10;
              const barHeight =
                innerHeight - (yScale(accessors.yAccessor(d)) ?? 0);

              const barX = xScale(xValue);
              const barY = innerHeight - barHeight;

              return (
                <path
                  key={`bar-${xValue}`}
                  d={
                    barHeight > 0
                      ? `M${barX} ${barY + r} q0 -${r} ${r} ${-r} h${
                          barWidth - 2 * r
                        } q${r} 0 ${r} ${r} v${barHeight} h${-barWidth} z`
                      : null
                  }
                  fill="#151646"
                  onClick={() => {
                    alert(`clicked: ${JSON.stringify(d)}`);
                  }}
                  onMouseLeave={() => {
                    tooltipTimeout = window.setTimeout(() => {
                      hideTooltip();
                    }, 300);
                  }}
                  onMouseMove={event => {
                    if (tooltipTimeout) clearTimeout(tooltipTimeout);
                    // TooltipInPortal expects coordinates to be relative to containerRef
                    // localPoint returns coordinates relative to the nearest SVG, which
                    // is what containerRef is set to in this example.
                    const eventSvgCoords = localPoint(event);
                    const left = barX + barWidth / 2;
                    showTooltip({
                      tooltipData: d,
                      tooltipTop: eventSvgCoords?.y,
                      tooltipLeft: left,
                    });
                  }}
                />
              );
            })}
          </Group>
          <Group>
            <AxisBottom
              hideAxisLine={true}
              hideTicks={true}
              top={innerHeight}
              scale={xScale}
              tickLabelProps={() => ({
                dx: '-20', // Moves the labels on the axis left or right
                fontWeight: 400,
                fontSize: '0.7rem',
              })}
              numTicks={Math.floor(data.length / 2)}
            />
          </Group>
          <Group>
            <AxisLeft
              hideAxisLine={true}
              hideTicks={true}
              left={MARGIN}
              scale={yScale}
              label={'GHJG'}
            />
          </Group>
        </svg>
        {tooltipOpen &&
          tooltipData &&
          tooltipLeft !== null &&
          tooltipTop !== null && (
            <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
              <div style={{ color: '#ffffff' }}>
                <strong>{accessors.yAccessor(tooltipData)}</strong>
              </div>
              <div>
                {/* <small>{formatDate(accessors.xAccessor(tooltipData))}</small> */}
                <small>{accessors.xAccessor(tooltipData)}</small>
              </div>
            </Tooltip>
          )}
      </>
    );
  },
);

withTooltip.propTypes = {
  data: arrayOf(
    shape({
      Symbol: string,
      value: number,
      color: string,
    }),
  ),
  width: string,
  height: string,
  accessors: shape({
    xAccessor: func,
    yAccessor: func,
  }),
  r: number,
};
