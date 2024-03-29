import { number } from 'prop-types'
import { string } from 'prop-types'
import React from 'react'

Stop.propTypes = {
  width: string,
  height: string,
  fill: string,
  className: string,
  fillOpacity: number,
}

export default function Stop({
  width = '14',
  height = '14',
  fill = 'black',
  fillOpacity = 0.7,
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
      <path
        opacity="0.8"
        d="M1 0H13C13.2652 0 13.5196 0.105357 13.7071 0.292893C13.8946 0.48043 14 0.734784 14 1V13C14 13.2652 13.8946 13.5196 13.7071 13.7071C13.5196 13.8946 13.2652 14 13 14H1C0.734784 14 0.48043 13.8946 0.292893 13.7071C0.105357 13.5196 0 13.2652 0 13V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0Z"
        fill={fill}
        fillOpacity={`${fillOpacity}`}
      />
    </svg>
  )
}
