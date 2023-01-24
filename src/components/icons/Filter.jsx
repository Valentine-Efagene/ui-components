import { string } from 'prop-types'
import React from 'react'

Filter.propTypes = {
  width: string,
  height: string,
  stroke: string,
  fill: string,
  className: string,
}

export default function Filter({
  width = '18',
  height = '18',
  stroke = '#151646',
  fill = 'none',
  className,
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.2899 13.8942C10.2899 14.3227 10.0089 14.8846 9.65067 15.1023L8.66033 15.7415C7.74021 16.3104 6.46188 15.6713 6.46188 14.5334V10.7757C6.46188 10.277 6.18093 9.63781 5.89295 9.28662L3.19579 6.449C2.83757 6.09078 2.55664 5.45865 2.55664 5.03019V3.40067C2.55664 2.55078 3.19582 1.91162 3.97546 1.91162H13.3452C14.1248 1.91162 14.764 2.55078 14.764 3.33042V4.88971C14.764 5.45864 14.4058 6.16805 14.0546 6.51924"
        stroke={stroke}
        strokeWidth="1.58036"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5211 12.1033C12.7624 12.1033 13.7687 11.0971 13.7687 9.85573C13.7687 8.6144 12.7624 7.6081 11.5211 7.6081C10.2797 7.6081 9.27344 8.6144 9.27344 9.85573C9.27344 11.0971 10.2797 12.1033 11.5211 12.1033Z"
        stroke={stroke}
        strokeWidth="1.58036"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1907 12.5248L13.4883 11.8224"
        stroke="#151646"
        strokeWidth="1.58036"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
