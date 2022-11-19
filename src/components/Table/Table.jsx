import { shape } from 'prop-types'
import { array } from 'prop-types'
import { arrayOf } from 'prop-types'
import { string } from 'prop-types'
import React, { useState } from 'react'
import { useEffect } from 'react'
import SearchBar from '../SearchBar'
import styles from './Table.module.css'

function Table({ testId, data }) {
  const { headings, body, indexColumn } = data
  const N = headings.length
  const fieldToHeading = Array(N)
  const [displayedBody, setDisplayedBody] = useState([...body])

  const keys = Object.keys(body?.[0])

  for (let index = 0; index < N; index++) {
    fieldToHeading[index] = { field: keys[index], heading: headings[index] }
  }

  const _allChecksSet = {}
  const _allChecksCleared = {}

  body.forEach((row) => {
    _allChecksSet[row[indexColumn]] = true
    _allChecksCleared[row[indexColumn]] = false
  })

  const [contextRowKey, setContextRowKey] = useState()
  const [checked, setChecked] = useState(_allChecksCleared)
  const [allChecked, setAllChecked] = useState(false)

  let checkCount = Object.values(checked).reduce(
    (count, value) => (value ? count + 1 : count),
    0
  )

  const [sortField, setSortField] = useState(fieldToHeading[0].field)
  const [filterField, setFilterField] = useState(fieldToHeading[0].field)
  const [searchText, setSearchText] = useState()

  const filter = () => {
    const _body = [...body].filter((row) => {
      if (typeof row[filterField] === 'number') {
        return row[filterField] == searchText
      }

      return row[filterField].toUpperCase().includes(searchText.toUpperCase())
    })
    setDisplayedBody(_body)
  }

  useEffect(() => {
    const _body = [...body].sort((_a, _b) => {
      if (!isNaN(_a[sortField])) {
        return _a[sortField] - _b[sortField]
      }

      const a = _a[sortField].toUpperCase()
      const b = _b[sortField].toUpperCase()

      if (a < b) {
        return -1
      }

      if (a > b) {
        return 1
      }

      return 0
    })
    setDisplayedBody(_body)
  }, [sortField])

  const toggleCheckByKey = (key) => {
    setAllChecked(false)
    setChecked((prevState) => ({ ...prevState, [key]: !prevState[key] }))
  }

  return (
    <div id={styles.table} test-id={testId}>
      <div className={styles.toolbarContainer}>
        <div id={styles.toolbar}>
          <div className={styles.verticalContainer}>
            <label htmlFor="sort">Sort By</label>
            <select
              id="sort"
              text="Sort by"
              onChange={(event) => {
                setSortField(event.target.value)
              }}>
              {fieldToHeading.map((fh, index) => {
                const { field, heading } = fh
                return (
                  <option
                    key={field}
                    defaultValue={index === 0}
                    value={field}
                    className={styles.dropdownMenuItem}>
                    {heading}
                  </option>
                )
              })}
            </select>
          </div>
          <div className={styles.verticalContainer}>
            <label htmlFor="filter">Search By</label>
            <select
              id="filter"
              text="Filter by"
              onChange={(event) => {
                setDisplayedBody([...body])
                setFilterField(event.target.value)
              }}>
              {fieldToHeading.map((fh, index) => {
                const { field, heading } = fh
                return (
                  <option
                    key={field}
                    defaultValue={index === 0}
                    value={field}
                    className={styles.dropdownMenuItem}>
                    {heading}
                  </option>
                )
              })}
            </select>
          </div>
          <SearchBar
            onChange={(event) => {
              setSearchText(event.target.value)
            }}
            onSearch={filter}
          />
        </div>
        {checkCount !== 0 && (
          <div className={styles.multipleSelectOptions}>
            <span>{checkCount} selected</span>
            <button className={styles.multipleSelectButton}>🗑️</button>
            <button
              onClick={() => {
                setChecked(_allChecksCleared)
                setAllChecked(false)
              }}
              className={styles.multipleSelectButton}>
              X
            </button>
          </div>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                name=""
                id=""
                checked={allChecked}
                onChange={(event) => {
                  setAllChecked(event.target.checked)
                  setChecked(
                    event.target.checked ? _allChecksSet : _allChecksCleared
                  )
                }}
              />
            </th>
            {headings.map((heading) => (
              <th key={heading}>{heading}</th>
            ))}
            <th className={styles.contextButton} />
          </tr>
        </thead>
        <tbody>
          {displayedBody.map((row) => (
            <tr key={row[indexColumn]}>
              <td>
                <input
                  checked={checked[row[indexColumn]]}
                  onChange={() => {
                    toggleCheckByKey(row[indexColumn])
                  }}
                  key={row[indexColumn]}
                  type="checkbox"
                  name=""
                  id=""
                />
              </td>
              {Object.entries(row).map(([key, value]) => (
                <td key={key}>{value}</td>
              ))}
              <td>
                <button
                  onClick={() => {
                    setContextRowKey(row[indexColumn])
                  }}>
                  &#8942;
                </button>
                {contextRowKey && <div className={styles.contextMenu}></div>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

Table.propTypes = {
  testId: string,
  data: shape({
    headings: arrayOf(string),
    body: array,
    indexColumn: string,
  }).isRequired,
}

export default Table
