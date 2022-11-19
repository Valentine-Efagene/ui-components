import { arrayOf, object } from 'prop-types'
import React from 'react'
import Details from '../Details/Details'

function Accordion({ information, style }) {
  return (
    <div testid="accordion" style={style}>
      {information?.map((information) => {
        const { heading, content } = information
        return <Details key={heading} heading={heading} content={content} />
      })}
    </div>
  )
}

Accordion.propTypes = {
  information: arrayOf(object),
  style: object,
}

Accordion.defaultProps = {
  information: [],
  style: {},
}

export default Accordion
