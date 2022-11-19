import React from 'react'
import { string, bool, number, object } from 'prop-types'
import styles from './SearchBar.module.css'
import { func } from 'prop-types'

function SearchBar({
  onBlur,
  onChange,
  onSearch,
  onInvalid,
  style,
  maxLength,
  minLength,
  autoComplete,
  name,
  id,
  readOnly,
  disabled,
  required,
  placeholder,
}) {
  return (
    <div test-id="search_bar" className={styles.searchBar}>
      <input
        type="search"
        className={styles.searchInput}
        onBlur={onBlur}
        onChange={onChange}
        onInvalid={onInvalid}
        testid="text_field"
        name={name}
        autoComplete={`${autoComplete}`}
        id={id}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        required={required}
        minLength={`${minLength}`}
        maxLength={`${maxLength}`}
        style={style}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  )
}

SearchBar.propTypes = {
  name: string,
  id: string,
  readOnly: bool,
  required: bool,
  disabled: bool,
  onSearch: func,
  placeholder: string,
  autoComplete: bool,
  style: object,
  maxLength: number,
  minLength: number,
  onChange: func,
  onInvalid: func,
  onBlur: func,
}

SearchBar.defaultProps = {
  readOnly: false,
  required: false,
  name: null,
  id: null,
  maxLength: 50,
  minLength: 3,
  autoComplete: true,
  disabled: false,
  style: {},
}

export default SearchBar
