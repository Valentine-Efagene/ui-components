import { string } from 'prop-types'
import React from 'react'

Add.propTypes = {
  width: string,
  height: string,
  fill: string,
  className: string,
  crossFill: string,
}

export default function Add({
  width = '30',
  height = '30',
  fill = 'none',
  crossFill = '#0B8C56',
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5 7C14.9477 7 14.5 7.44772 14.5 8V14H8.5C7.94772 14 7.5 14.4477 7.5 15C7.5 15.5523 7.94772 16 8.5 16H14.5V22C14.5 22.5523 14.9477 23 15.5 23C16.0523 23 16.5 22.5523 16.5 22V16H22.5C23.0523 16 23.5 15.5523 23.5 15C23.5 14.4477 23.0523 14 22.5 14H16.5V8C16.5 7.44772 16.0523 7 15.5 7Z"
        fill="#585858"
      />
      <mask
        id="mask0_806_4328"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="7"
        y="7"
        width="17"
        height="16">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.5 7C14.9477 7 14.5 7.44772 14.5 8V14H8.5C7.94772 14 7.5 14.4477 7.5 15C7.5 15.5523 7.94772 16 8.5 16H14.5V22C14.5 22.5523 14.9477 23 15.5 23C16.0523 23 16.5 22.5523 16.5 22V16H22.5C23.0523 16 23.5 15.5523 23.5 15C23.5 14.4477 23.0523 14 22.5 14H16.5V8C16.5 7.44772 16.0523 7 15.5 7Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_806_4328)">
        <rect x="0.5" width="30" height="30" fill={crossFill} />
      </g>
    </svg>
  )
}
