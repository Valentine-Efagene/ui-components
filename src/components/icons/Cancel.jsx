import React from 'react'
import { number, string } from 'prop-types'

Cancel.propTypes = {
  width: string,
  height: string,
  fill: string,
  className: string,
  crossFill: string,
  strokeLinecap: string,
  strokeLinejoin: string,
  stroke: string,
  strokeWidth: number,
}

export default function Cancel({
  width = '1em',
  height = '1em',
  fill = 'none',
  className,
  stroke = 'currentColor',
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  strokeWidth = 1.5,
}) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24">
      <path
        fill={fill}
        stroke={stroke}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        strokeWidth={`${strokeWidth}`}
        d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
      />
    </svg>
  )
}
