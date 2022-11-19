import { bool, func } from 'prop-types'
import { object } from 'prop-types'
import { array } from 'prop-types'
import { string } from 'prop-types'
import React from 'react'
import styles from './TagInput.module.css'

/**
 *
 * @param {string} className CSS class
 * @param {object} style CSS style
 * @param {string} clearButtonClass CSS class for the 'clear all' button
 * @param {object} clearButtonStyle CSS style for the 'clear all' button
 * @param {Array<string>} tags Array of tags
 * @param {bool} enableClearAll Whether to show a 'clear all' button
 * @param {(Array<string>) => void} setTags Any function that takes an array of strings, and returns void
 * @returns
 */
function TagInputBox({
  className,
  enableClearAll,
  style,
  clearButtonClass,
  clearButtonStyle,
  tags,
  setTags,
}) {
  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      const timeout = setTimeout(() => {
        const tag = event.target.value.trim()
        event.target.value = ''
        const _tags = [...tags]
        setTags(
          tag?.length === 0 || tags.includes(tag) ? _tags : [..._tags, tag]
        )

        clearTimeout(timeout)
      }, 10)
    }
  }

  const handleSingleDelete = (index) => {
    const _tags = [...tags]
    _tags.splice(index, 1)
    setTags(_tags)
  }

  const deleteAll = () => {
    setTags([])
  }

  return (
    <ul className={`${className} ${styles.container}`} style={style}>
      {tags?.map((tag, index) => (
        <li key={tag}>
          <span>{tag}</span>{' '}
          <button
            className={styles.singleDelete}
            onClick={() => {
              handleSingleDelete(index)
            }}>
            <img src="/assets/cancel.svg" alt="X" />
          </button>
        </li>
      ))}
      <input
        className={styles.input}
        type="text"
        onKeyDown={handleKeyUp}
        placeholder="Enter tag"
      />
      {enableClearAll && (
        <button
          style={clearButtonStyle}
          className={`${clearButtonClass} ${styles.clearAllButton}`}
          onClick={deleteAll}>
          Clear All
        </button>
      )}
    </ul>
  )
}

TagInputBox.propTypes = {
  clearButtonClass: string,
  clearButtonStyle: object,
  className: string,
  style: object,
  setTags: func,
  tags: array,
  enableClearAll: bool,
}

export default TagInputBox
