import { arrayOf, bool, func, number } from 'prop-types'
import { object } from 'prop-types'
import { oneOfType } from 'prop-types'
import { array } from 'prop-types'
import { string } from 'prop-types'
import React, { useState } from 'react'
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
 * 
 * @example
 * 
 * function App() {
  const [tags, setTags] = useState([])
  const [selection, setSelection] = useState([])
  const formatter = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction',
  })

  useEffect(() => {
    fetch('http://localhost:8000/test/api/tags')
      .then((res) => res?.json())
      .then((data) => setTags(data))
  }, [])

  return (
    <div className={`${styles.container} App`}>
      <header className="App-header">
        <p>{formatter.format(selection.map((tag) => tag.title))}</p>
        <SmartTagInput
          style={{ width: '70%' }}
          name="tags"
          id="tags"
          tags={tags ?? []}
          selection={selection}
          setSelection={setSelection}
        />
      </header>
    </div>
  )
}
 * 
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
}) {
  const [searchText, setSearchText] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [active, setActive] = useState(null)
  const toggleOptions = () => setShowOptions((prevState) => !prevState)

  const handleSingleDelete = (id) => {
    setSelection((prevState) => prevState.filter((tag) => tag.id != id))
  }

  const deleteAll = () => {
    setSelection([])
  }

  const filtered = (tags) => {
    const lessSelected =
      selection?.length > 0
        ? tags.filter((tag) => !selection.includes(tag))
        : tags

    return searchText.trim() == null
      ? lessSelected
      : lessSelected?.filter((tag) => tag?.title?.includes(searchText))
  }

  const handleSelect = (id) => {
    if (id == null) return

    const tag = tags.find((tag) => tag?.id == id)

    if (tag == null) return

    setSelection((prevState) => [...prevState, tag])
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
        onKeyUp={(e) => {
          if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
            setShowOptions(true)
          }

          if (e.key == 'Escape') {
            setShowOptions(false)
            // ArrowDown, ArrowUp, Escape
          } else if (e.key == 'ArrowDown') {
            setActive((prevState) => {
              if (tags.length === 0) {
                return null
              }

              if (prevState == null) {
                return filtered(tags)?.[0]
              }

              if (prevState.id == filtered(tags)?.[-1]?.id) {
                return prevState
              }

              const filteredTags = filtered(tags)
              const index = filteredTags.findIndex(
                (tag) => tag.id === active.id
              )
              return filteredTags[index + 1]
            })
          } else if (e.key == 'ArrowUp') {
            setActive((prevState) => {
              if (tags.length === 0) {
                return null
              }

              if (prevState == null) {
                return filtered(tags)?.[0]
              }

              if (prevState.id == filtered(tags)?.[0]?.id) {
                return prevState
              }

              const filteredTags = filtered(tags)
              const index = filteredTags.findIndex(
                (tag) => tag.id === active.id
              )
              return filteredTags[index - 1]
            })
          } else if (e.key == 'Enter') {
            handleSelect(active?.id)
            setShowOptions(false)
          }
        }}
        onClick={toggleOptions}
        className={styles.textInput}
        type="text"
        onChange={(e) => setSearchText(e.target.value ?? '')}
        placeholder="Enter tag"
      />
      {showOptions && (
        <div className={styles.options}>
          {filtered(tags)?.map(({ id, title }) => (
            <button
              className={`${active?.id == id ? styles.active : null} ${
                styles.option
              }`}
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
