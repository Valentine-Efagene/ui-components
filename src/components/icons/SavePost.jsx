import { string } from 'prop-types'
import React from 'react'

SavePost.propTypes = {
  width: string,
  height: string,
  fill: string,
  className: string,
}

export default function SavePost({
  width = '21',
  height = '22',
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
        d="M9.9742 6.48853C9.9742 6.31742 9.90623 6.15332 9.78524 6.03233C9.66425 5.91134 9.50015 5.84337 9.32905 5.84337C9.15794 5.84337 8.99384 5.91134 8.87285 6.03233C8.75186 6.15332 8.68389 6.31742 8.68389 6.48853V9.06915H6.10327C5.93217 9.06915 5.76807 9.13712 5.64708 9.25811C5.52609 9.3791 5.45812 9.5432 5.45812 9.7143C5.45812 9.88541 5.52609 10.0495 5.64708 10.1705C5.76807 10.2915 5.93217 10.3595 6.10327 10.3595H8.68389V12.9401C8.68389 13.1112 8.75186 13.2753 8.87285 13.3963C8.99384 13.5173 9.15794 13.5852 9.32905 13.5852C9.50015 13.5852 9.66425 13.5173 9.78524 13.3963C9.90623 13.2753 9.9742 13.1112 9.9742 12.9401V10.3595H12.5548C12.7259 10.3595 12.89 10.2915 13.011 10.1705C13.132 10.0495 13.2 9.88541 13.2 9.7143C13.2 9.5432 13.132 9.3791 13.011 9.25811C12.89 9.13712 12.7259 9.06915 12.5548 9.06915H9.9742V6.48853ZM3.52265 0.682129C2.66712 0.682129 1.84663 1.02199 1.24168 1.62694C0.636733 2.23189 0.296875 3.05238 0.296875 3.9079V15.5207C0.296875 16.3762 0.636733 17.1967 1.24168 17.8017C1.84663 18.4066 2.66712 18.7465 3.52265 18.7465H15.1354C15.991 18.7465 16.8115 18.4066 17.4164 17.8017C18.0214 17.1967 18.3612 16.3762 18.3612 15.5207V3.9079C18.3612 3.05238 18.0214 2.23189 17.4164 1.62694C16.8115 1.02199 15.991 0.682129 15.1354 0.682129H3.52265ZM1.58719 3.9079C1.58719 3.39459 1.7911 2.90229 2.15407 2.53932C2.51704 2.17635 3.00933 1.97244 3.52265 1.97244H15.1354C15.6488 1.97244 16.1411 2.17635 16.504 2.53932C16.867 2.90229 17.0709 3.39459 17.0709 3.9079V15.5207C17.0709 16.034 16.867 16.5263 16.504 16.8893C16.1411 17.2523 15.6488 17.4562 15.1354 17.4562H3.52265C3.00933 17.4562 2.51704 17.2523 2.15407 16.8893C1.7911 16.5263 1.58719 16.034 1.58719 15.5207V3.9079ZM7.39358 21.3271C6.21128 21.3288 5.07576 20.8653 4.23232 20.0368H16.4258C17.2813 20.0368 18.1018 19.6969 18.7067 19.092C19.3117 18.487 19.6515 17.6665 19.6515 16.811V4.61758C20.4502 5.43305 20.9418 6.54788 20.9418 7.77884V16.811C20.9418 18.0087 20.466 19.1574 19.6191 20.0044C18.7722 20.8513 17.6235 21.3271 16.4258 21.3271H7.39358Z"
        fill={fill}
      />
    </svg>
  )
}
