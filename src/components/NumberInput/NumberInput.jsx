/* eslint-disable indent */
import { bool, func, number, object, string } from 'prop-types'
import React from 'react'
import { useEffect } from 'react'
import styles from './NumberInput.module.css'

function NumberInput({
  id,
  className,
  style,
  name,
  placeholder,
  onBlur,
  onChange,
  onFocus,
  onInvalid,
  readOnly,
  disabled,
  required,
  inputClassName,
  value,
  setValue,
  min,
  max,
}) {
  useEffect(() => {
    setValue((prevState) => (prevState ? prevState : 0))
  }, [])

  return (
    <div className={`${styles.container} ${className}`} style={style}>
      {setValue && (
        <button
          className={styles.decrement}
          onClick={() => {
            setValue((prevState) => prevState - 1)
          }}>
          &ndash;
        </button>
      )}
      <input
        value={value === 0 ? '' : value}
        type="number"
        min={`${min}`}
        max={`${max}`}
        placeholder={placeholder}
        className={`${styles.input} ${inputClassName}`}
        name={name}
        id={id}
        onChange={onChange}
        onBlur={onBlur}
        onInvalid={onInvalid}
        readOnly={readOnly}
        disabled={disabled}
        required={required}
        onFocus={onFocus}
      />
      {setValue && (
        <button
          className={styles.increment}
          onClick={() => {
            setValue((prevState) => prevState + 1)
          }}>
          +
        </button>
      )}
    </div>
  )
}

NumberInput.propTypes = {
  id: string,
  name: string,
  className: string,
  style: object,
  placeholder: string,
  onBlur: func,
  onChange: func,
  onFocus: func,
  readOnly: bool,
  required: bool,
  disabled: bool,
  autoComplete: string,
  maxLength: number,
  minLength: number,
  onInvalid: func,
  inputClassName: string,
  inputStyle: object,
  labelClassName: string,
  backgroundColor: string,
  errorMessage: string,
  successMessage: string,
  value: number,
  setValue: func,
  min: number,
  max: number,
}

NumberInput.defaultProps = {
  type: 'text',
  readOnly: false,
  required: false,
  name: null,
  id: null,
  maxLength: 50,
  minLength: 3,
  autoComplete: 'on',
  inputStyle: {},
  disabled: false,
  style: {},
  testId: 'border-label-textfield',
}

export default NumberInput
