import { arrayOf, bool, func, number } from 'prop-types'
import { object } from 'prop-types'
import { oneOfType } from 'prop-types'
import { array } from 'prop-types'
import { string } from 'prop-types'
import React, { useEffect, useState } from 'react'
import styles from './SmartTagInput.module.css'

SmartTagInput.propTypes = {
  clearButtonClass: string,
  clearButtonStyle: object,
  className: string,
  style: object,
  setTags: func,
  tags: array,
  enableClearAll: bool,
  name: string,
  id: string,
  selection: arrayOf({
    id: oneOfType([string, number]),
    title: string,
  }),
  setSelection: func,
}

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
export default function SmartTagInput({
  className,
  enableClearAll,
  style,
  clearButtonClass,
  clearButtonStyle,
  tags = [],
  selection = [],
  setSelection,
  id,
  name,
}) {
  const [searchText, setSearchText] = useState('')
  const [showOptions, setShowOptions] = useState(false)

  const toggleShowOptions = () => setShowOptions((prevState) => !prevState)
  const openOptions = () => setShowOptions(true)
  const hideOptions = () => setShowOptions(false)

  const handleSingleDelete = (id) => {
    setSelection((prevState) => prevState.filter((tag) => tag.id != id))
  }

  const deleteAll = () => {
    setSelection([])
  }

  const filtered = (tags) => {
    return searchText.trim() == null
      ? tags
      : tags?.filter((tag) => tag?.title?.includes(searchText))
  }

  const handleSelect = (id) => {
    if (selection.find((tag) => tag?.id == id)) {
      hideOptions()
      return
    }

    const tag = tags.find((tag) => tag?.id == id)

    if (tag == null) return

    setSelection((prevState) => [...prevState, tag])
    hideOptions()
  }

  return (
    <div className={`${className} ${styles.container}`} style={style}>
      <div className={styles.tags}>
        {selection?.map(({ id, title }) => (
          <span key={id} className={styles.pill}>
            <span>{title}</span>{' '}
            <button
              className={styles.singleDelete}
              onClick={() => {
                handleSingleDelete(id)
              }}>
              <img src="/asset/img/cancel.svg" alt="X" />
            </button>
          </span>
        ))}
        {enableClearAll && (
          <button
            style={clearButtonStyle}
            className={`${clearButtonClass} ${styles.clearAllButton}`}
            onClick={deleteAll}>
            Clear All
          </button>
        )}
      </div>

      <input
        className={styles.textInput}
        type="text"
        onClick={toggleShowOptions}
        onFocus={showOptions}
        onChange={(e) => setSearchText(e.target.value ?? '')}
        placeholder="Enter tag"
      />
      {showOptions && (
        <div className={styles.select} onBlur={hideOptions}>
          {filtered(tags)?.map(({ id, title }) => (
            <button
              className={styles.option}
              onClick={() => {
                handleSelect(id)
              }}
              key={id}
              value={id}>
              {title}
            </button>
          ))}
        </div>
      )}

      {enableClearAll && (
        <button
          style={clearButtonStyle}
          className={`${clearButtonClass} ${styles.clearAllButton}`}
          onClick={deleteAll}>
          Clear All
        </button>
      )}
    </div>
  )
}
