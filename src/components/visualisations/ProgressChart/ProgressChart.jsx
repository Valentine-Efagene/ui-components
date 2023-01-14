import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
import { Text } from '@visx/text';

import styles from './ProgressChart.module.css';
import { number } from 'prop-types';

/**
 * 
 * @param {number} width Both the width and height in pixels
 * @param {number| string} progress 
 * @param {number | string} total The absolute total the progress is being compared to 
 * @param {numner} innerRadius
 * @param {numner} outerRadius
 *  
 * @returns 
 * 
 * @example
 * 
    <ProgressChart
          progress={351}
          total={500}
          innerRadius={87}
          outerRadius={90}
          width={200}
        />
 */
function ProgressChart({ progress, total, innerRadius, outerRadius, width }) {
  const data = [
    {
      value: progress,
      color: '#151646',
    },
    {
      value: total - progress,
      color: '#656874',
    },
  ];

  return (
    <div className={styles.container}>
      <svg width={width} height={width}>
        <Group top={width / 2} left={width / 2}>
          <Pie
            data={data}
            pieValue={data => data.value}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            padAngle={0.01}>
            {pie => {
              return pie?.arcs?.map(arc => {
                return (
                  <g key={arc?.data?.color}>
                    <path
                      d={pie?.path(arc) ?? undefined}
                      fill={arc?.data?.color}></path>
                  </g>
                );
              });
            }}
          </Pie>
          <Text
            scaleToFit={true}
            textAnchor="middle"
            dx={-20}
            fontSize={25}
            fontWeight={600}
            fill="#323338">
            {`${progress} / `}
          </Text>
          <Text
            scaleToFit={true}
            textAnchor="middle"
            fontSize={20}
            dx={30}
            fontWeight={600}
            fill="#33B469">
            {`${total}`}
          </Text>
          <Text
            textAnchor="middle"
            scaleToFit={true}
            verticalAnchor="start"
            dy={10}
            fontSize={20}
            fill="#323338">
            Progress
          </Text>
        </Group>
      </svg>
    </div>
  );
}

ProgressChart.propTypes = {
  width: number,
  innerRadius: number,
  outerRadius: number,
  increment: number,
  total: number,
  progress: number,
};

export default ProgressChart;
