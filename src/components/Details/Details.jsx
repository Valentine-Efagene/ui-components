import { object } from 'prop-types'
import { string } from 'prop-types'
import React from 'react'
import _ from './Details.module.css'

function Details({
  heading,
  content,
  detailStyle,
  summaryStyle,
  contentStyle,
}) {
  console.log(_)
  return (
    <details style={detailStyle} testid="details">
      <summary style={summaryStyle} testid="summary">
        {heading}
      </summary>
      <p style={contentStyle} testid="content">
        {content}
      </p>
    </details>
  )
}

Details.propTypes = {
  heading: string,
  content: string,
  detailStyle: object,
  summaryStyle: object,
  contentStyle: object,
}

Details.defaultProps = {
  heading: null,
  content: null,
  detailStyle: {},
  summaryStyle: {},
  contentStyle: {},
}

export default Details
