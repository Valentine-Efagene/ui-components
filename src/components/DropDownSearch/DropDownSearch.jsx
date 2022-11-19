/* eslint-disable indent */
import { arrayOf, func, number, object, shape, string } from 'prop-types'
import React, { useRef, useState } from 'react'
import styles from './DropDownSearch.module.css'

/**
 *
 * @param {Array<{key: string | number, value: string}>} items value will be displayed on the list item
 * @param {string} searchInputClassName
 * @param {string} className
 * @param {string} placeholder
 * @param {func} setSelected
 * @param {object} style
 * @param {string} name Name for the input tag
 * @param {string} id ID for the input tag
 *
 * @example
 * import { useState } from 'react'
 *
 * function App() {
 *   const list = [
 *      { key: 0, value: 'John' },
 *      { key: 1, value: 'Samuel' },
 *      { key: 2, value: 'Susanne' },
 *      { key: 3, value: 'Sindy' },
 *      { key: 4, value: 'Jane' },
 *      { key: 5, value: 'Rose' },
 *      { key: 6, value: 'Winifred' },
 *      { key: 7, value: 'Blessing' },
 *      { key: 8, value: 'Great' },
 *      { key: 9, value: 'Demi' },
 *      { key: 10, value: 'Chinoso' },
 *      { key: 11, value: 'Odes' },
 *  ]
 *
 *  const [selected, setSelected] = useState()
 *
 * return (
 *   <div className="App">
 *    <header className="App-header">
 *      <span>{selected?.value}</span>
 *      <DropDownSearch placeholder='search' items={list} setSelected={setSelected} />
 *    </header>
 *  </div>
 * )
 *}
 *
 * @returns
 */
function DropDownSearch({
  items,
  className,
  searchInputClassName,
  style,
  placeholder,
  name,
  id,
  setSelected,
}) {
  const inputRef = useRef()
  const listRef = useRef()
  const [disappear, setDisappear] = useState(false)
  const [filtered, setFiltered] = useState(items)
  const handleChange = (e) => {
    const searchText = e.target.value?.trim()?.toUpperCase()
    focusStealerRef.current?.focus()

    setFiltered((prevState) =>
      searchText === '' || !searchText
        ? items
        : prevState.filter((item) =>
            item.value?.trim()?.toUpperCase().includes(searchText)
          )
    )
  }

  const focusStealerRef = useRef()

  return (
    <div style={style} className={` ${className} ${styles.container}`}>
      <input
        type="text"
        className={styles.focusStealer}
        ref={focusStealerRef}
        name=""
        id=""
      />
      <input
        placeholder={placeholder}
        className={`${styles.searchInput} ${searchInputClassName}`}
        onChange={handleChange}
        ref={inputRef}
        type="search"
        name={name}
        id={id}
      />
      <img src="/asset/img/chevron-bottom.svg" alt="" />
      <div className={`${disappear ? styles.disappear : styles.list}`}>
        {filtered.map((item) => {
          const { key, value } = item

          return (
            <div
              key={key}
              onClick={(e) => {
                console.log(e.target.style.display)
                setSelected(item)
                inputRef.current.value = value
                setDisappear(true)

                const timeout = setTimeout(() => {
                  setDisappear(false)
                  clearTimeout(timeout)
                }, 1000)
              }}
              className={styles.item}>
              {value}
            </div>
          )
        })}
      </div>
    </div>
  )
}

DropDownSearch.propTypes = {
  items: arrayOf(
    shape({
      key: [string, number], // Properties guaranteed to be unique
      value: string, // The displayed value
    })
  ),
  id: string,
  name: string,
  setSelected: func,
  className: string,
  searchInputClassName: string,
  style: object,
  placeholder: string,
}

export default DropDownSearch
