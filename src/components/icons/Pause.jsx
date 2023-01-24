import { number, string } from 'prop-types'
import React from 'react'

Pause.propTypes = {
  width: string,
  height: string,
  fill: string,
  className: string,
  fillOpacity: number,
}

export default function Pause({
  width = '12',
  height = '14',
  fill = '#444444',
  className,
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M8 14V0H12V14H8ZM0 14V0H4V14H0Z" fill={fill} />
    </svg>
  )
}
