import { number, oneOfType, string } from 'prop-types'
import { func } from 'prop-types'
import { arrayOf, object, shape } from 'prop-types'
import React from 'react'
import styles from './CustomSelect.module.css'

CustomSelect.propTypes = {
  options: arrayOf(
    shape({
      id: oneOfType([string, number]),
      title: string,
    })
  ),
  style: object,
  className: string,
  id: string,
  name: string,
  onChange: func,
}

function CustomSelect({ options, style, className, onChange, id, name }) {
  return (
    <select
      id={id}
      name={name}
      onChange={onChange}
      className={`${styles.select} ${className}`}
      style={style}>
      {options?.map((option) => {
        const { id, title } = option
        return (
          <option className={styles.option} key={id}>
            {title}
          </option>
        )
      })}
    </select>
  )
}

export default CustomSelect
