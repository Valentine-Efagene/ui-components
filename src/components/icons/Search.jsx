import { string } from 'prop-types'
import React from 'react'

Search.propTypes = {
  width: string,
  height: string,
  stroke: string,
  fill: string,
  className: string,
}

export default function Search({
  width = '18',
  height = '18',
  stroke = '#2B3B30',
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
        d="M9.06129 15.5358C12.7465 15.5358 15.7339 12.5484 15.7339 8.86317C15.7339 5.17799 12.7465 2.19055 9.06129 2.19055C5.37611 2.19055 2.38867 5.17799 2.38867 8.86317C2.38867 12.5484 5.37611 15.5358 9.06129 15.5358Z"
        stroke={stroke}
        strokeWidth="1.58036"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.436 16.2382L15.0312 14.8334"
        stroke="#2B3B30"
        strokeWidth="1.58036"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
