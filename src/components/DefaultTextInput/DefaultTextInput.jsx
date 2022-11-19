/* eslint-disable indent */
import {
  bool,
  func,
  number,
  object,
  oneOf,
  oneOfType,
  string,
} from 'prop-types'
import React from 'react'
import styles from './DefaultTextInput.module.css'

function DefaultTextInput({
  id,
  className,
  style,
  name,
  placeholder,
  onBlur,
  onChange,
  onFocus,
  onInvalid,
  type,
  maxLength,
  minLength,
  autoComplete,
  readOnly,
  disabled,
  required,
  inputClassName,
  errorMessage,
  successMessage,
  label,
  value,
  labelClassName,
}) {
  let stateColor = '#4F4F4F'

  let state = 'normal'

  if (errorMessage) {
    state = 'error'
  } else if (successMessage) {
    state = 'success'
  }

  switch (state) {
    case 'normal':
      stateColor = '#4F4F4F'
      break
    case 'error':
      stateColor = '#FF7171'
      break
    case 'success':
      stateColor = '#0B8C56F'
      break

    default:
      stateColor = '#4F4F4F'
      break
  }

  return (
    <div htmlFor={id} className={`${styles.container} ${className}`}>
      <label className={`${styles.labelText} ${labelClassName}`}>{label}</label>
      {value ? (
        <input
          style={
            state === 'success' ? { ...style, borderColor: stateColor } : style
          }
          value={value}
          type={type}
          placeholder={placeholder}
          className={`${styles.input} ${inputClassName}`}
          name={name}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          onInvalid={onInvalid}
          autoComplete={`${autoComplete}`}
          readOnly={readOnly}
          disabled={disabled}
          required={required}
          minLength={`${minLength}`}
          maxLength={`${maxLength}`}
          onFocus={onFocus}
        />
      ) : (
        <input
          style={
            state === 'success' ? { ...style, borderColor: stateColor } : style
          }
          type={type}
          placeholder={placeholder}
          className={`${styles.input} ${inputClassName}`}
          name={name}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          onInvalid={onInvalid}
          autoComplete={`${autoComplete}`}
          readOnly={readOnly}
          disabled={disabled}
          required={required}
          minLength={`${minLength}`}
          maxLength={`${maxLength}`}
          onFocus={onFocus}
        />
      )}
      <img className={styles.icon} src="/assets/input_error.svg" alt="" />
      <span className={styles.errorMessage} style={{ color: stateColor }}>
        {errorMessage}
      </span>
    </div>
  )
}

DefaultTextInput.propTypes = {
  id: string,
  name: string,
  className: string,
  style: object,
  placeholder: string,
  onBlur: func,
  onChange: func,
  onFocus: func,
  type: oneOf(['text', 'password', 'tel', 'search', 'email']),
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
  label: string,
  value: oneOfType([string, number]),
}

DefaultTextInput.defaultProps = {
  type: 'text',
  readOnly: false,
  required: false,
  name: null,
  id: null,
  maxLength: 255,
  minLength: 0,
  autoComplete: 'on',
  inputStyle: {},
  disabled: false,
  style: {},
  testId: 'border-label-textfield',
}

export default DefaultTextInput
