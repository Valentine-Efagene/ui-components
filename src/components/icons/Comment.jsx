import { string } from 'prop-types';
import React from 'react';

Comment.propTypes = {
  width: string,
  height: string,
  fill: string,
  className: string,
};

export default function Comment({
  width = '21',
  height = '20',
  fill = '#151646',
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
        d="M11 0C9.68678 0 8.38642 0.258658 7.17317 0.761205C5.95991 1.26375 4.85752 2.00035 3.92893 2.92893C2.05357 4.8043 1 7.34784 1 10C0.991258 12.3091 1.79079 14.5485 3.26 16.33L1.26 18.33C1.12124 18.4706 1.02725 18.6492 0.989872 18.8432C0.952498 19.0372 0.973421 19.2379 1.05 19.42C1.13306 19.5999 1.2677 19.7511 1.43685 19.8544C1.60599 19.9577 1.802 20.0083 2 20H11C13.6522 20 16.1957 18.9464 18.0711 17.0711C19.9464 15.1957 21 12.6522 21 10C21 7.34784 19.9464 4.8043 18.0711 2.92893C16.1957 1.05357 13.6522 0 11 0ZM11 18H4.41L5.34 17.07C5.52625 16.8826 5.63079 16.6292 5.63079 16.365C5.63079 16.1008 5.52625 15.8474 5.34 15.66C4.03059 14.352 3.21517 12.6305 3.03269 10.7888C2.85021 8.94705 3.31194 7.09901 4.33923 5.55952C5.36651 4.02004 6.89579 2.88436 8.66652 2.34597C10.4372 1.80759 12.3399 1.8998 14.0502 2.60691C15.7606 3.31402 17.1729 4.59227 18.0464 6.22389C18.92 7.85551 19.2009 9.73954 18.8411 11.555C18.4814 13.3705 17.5033 15.005 16.0735 16.1802C14.6438 17.3554 12.8508 17.9985 11 18Z"
        fill={fill}
      />
    </svg>
  );
}
