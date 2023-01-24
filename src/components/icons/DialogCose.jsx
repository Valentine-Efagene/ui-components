import { string } from 'prop-types'
import React from 'react'

DialogCose.propTypes = {
  width: string,
  height: string,
  fill: string,
  className: string,
}

export default function DialogCose({
  width = '14',
  height = '14',
  fill = '#0B8C56',
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.70803 8.76766C7.3175 8.37713 6.68434 8.37713 6.29381 8.76766L2.06158 12.9999C1.76869 13.2928 1.29381 13.2928 1.00092 12.9999V12.9999C0.708026 12.707 0.708027 12.2321 1.00092 11.9392L5.23315 7.707C5.62368 7.31647 5.62368 6.68331 5.23315 6.29278L1.00092 2.06055C0.708028 1.76766 0.708028 1.29279 1.00092 0.999894V0.999894C1.29381 0.707001 1.76869 0.707001 2.06158 0.999894L6.29381 5.23212C6.68434 5.62265 7.3175 5.62265 7.70803 5.23213L11.9403 0.99989C12.2332 0.706997 12.708 0.706997 13.0009 0.99989V0.99989C13.2938 1.29278 13.2938 1.76766 13.0009 2.06055L8.76869 6.29278C8.37816 6.68331 8.37816 7.31647 8.76869 7.707L13.0009 11.9392C13.2938 12.2321 13.2938 12.707 13.0009 12.9999V12.9999C12.708 13.2928 12.2332 13.2928 11.9403 12.9999L7.70803 8.76766Z"
        fill={fill}
      />
    </svg>
  )
}
