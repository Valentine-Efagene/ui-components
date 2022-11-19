import { node } from 'prop-types'
import { func } from 'prop-types'
import { shape } from 'prop-types'
import { any } from 'prop-types'
import { arrayOf } from 'prop-types'
import { oneOf } from 'prop-types'
import React from 'react'
import styles from './DefaultButton.module.css'

function DefaultButton({ children, onClick, ref }) {
  return (
    <button id={styles.button} ref={ref} onClick={onClick}>
      {children}
    </button>
  )
}

DefaultButton.propTypes = {
  children: oneOf([node, arrayOf(node)]),
  onClick: func,
  ref: shape({ current: any }),
}

export default DefaultButton
