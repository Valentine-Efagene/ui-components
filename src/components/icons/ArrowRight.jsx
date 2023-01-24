import { string } from 'prop-types'
import React from 'react'

ArrowRight.propTypes = {
  width: string,
  height: string,
  fill: string,
  className: string,
  crossFill: string,
  strokeWidth: string,
  stroke: string,
  strokeLinecap: string,
  strokeMiterlimit: string,
  strokeLinejoin: string,
}

export default function ArrowRight({
  width = '24',
  height = '24',
  fill = 'none',
  strokeWidth = '1.5',
  strokeLinecap = 'round',
  stroke = '#292D32',
  strokeMiterlimit = '10',
  strokeLinejoin = 'round',
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
      <path d="M14.43 18.07L20.5 12L14.43 5.93001" fill="#292D32" />
      <path
        d="M14.43 18.07L20.5 12L14.43 5.93001"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeMiterlimit={strokeMiterlimit}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
      <path
        d="M3.50008 12L20.3301 12"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeMiterlimit={strokeMiterlimit}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </svg>
  )
}
