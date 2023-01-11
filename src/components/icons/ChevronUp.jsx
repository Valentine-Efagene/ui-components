import { string } from 'prop-types';
import React from 'react';

ChevronUp.propTypes = {
  width: string,
  height: string,
  fill: string,
  className: string,
};

export default function ChevronUp({
  width = '16',
  height = '16',
  fill = 'currentColor',
  className,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet">
      <path
        fill={fill}
        fillRule="evenodd"
        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
      />
    </svg>
  );
}
