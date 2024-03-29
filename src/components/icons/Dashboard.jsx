import { string } from 'prop-types'
import React from 'react'

Dashboard.propTypes = {
  width: string,
  height: string,
  fill: string,
  className: string,
}

export default function Dashboard({
  width = '1em',
  height = '1em',
  fill = '#151646',
  className,
}) {
  return (
    <svg
      className={className}
      preserveAspectRatio="xMidYMid meet"
      width={width}
      height={height}
      //viewBox={`0 0 ${width} ${height}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 16V4H3v12h18m0-14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7v2h2v2H8v-2h2v-2H3a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2h18M5 6h9v5H5V6m10 0h4v2h-4V6m4 3v5h-4V9h4M5 12h4v2H5v-2m5 0h4v2h-4v-2Z"
        fill={fill}
      />
    </svg>
  )
}
