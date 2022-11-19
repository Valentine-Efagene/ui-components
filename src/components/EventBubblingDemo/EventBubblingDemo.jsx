import React from 'react'
import { useState } from 'react'
import styles from './EventBubblingDemo.module.css'

function EventBubblingDemo() {
  const [parentToggle, setParentToggle] = useState()
  const [childToggle, setChildToggle] = useState()
  return (
    <div
      className={styles.container}
      onClick={() => {
        setParentToggle((prevState) => !prevState)
      }}>
      <span>{parentToggle ? 'True' : 'False'}</span>

      <button
        onClick={(event) => {
          event.stopPropagation()
          setChildToggle((prevState) => !prevState)
        }}>
        {childToggle ? 'True' : 'False'}
      </button>
    </div>
  )
}

export default EventBubblingDemo
