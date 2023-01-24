import { number } from 'prop-types'
import { string } from 'prop-types'
import React from 'react'

Play.propTypes = {
  width: string,
  height: string,
  fill: string,
  className: string,
  fillOpacity: number,
}

export default function Play({
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
      viewBox={`0 0 ${width} ${20}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.8"
        d="M1.11094 0.100288L16.6345 9.12129C16.7458 9.18617 16.838 9.27891 16.9021 9.39031C16.9663 9.50171 17 9.62789 17 9.7563C17 9.88471 16.9663 10.0109 16.9021 10.1223C16.838 10.2337 16.7458 10.3264 16.6345 10.3913L1.11094 19.4123C0.998472 19.4777 0.870649 19.5123 0.740429 19.5126C0.610208 19.5129 0.48222 19.4789 0.369434 19.4141C0.256649 19.3492 0.163076 19.2558 0.0981989 19.1434C0.0333218 19.0309 -0.00055334 18.9033 6.83635e-06 18.7736V0.736026C-3.1683e-05 0.606557 0.0342236 0.479371 0.0993133 0.367309C0.164403 0.255247 0.258023 0.162276 0.37072 0.0977849C0.483417 0.0332936 0.611201 -0.000435263 0.74117 4.24088e-06C0.871138 0.000443745 0.998689 0.0350359 1.11094 0.100288Z"
        fill={fill}
        fillOpacity={`${fillOpacity}`}
      />
    </svg>
  )
}
