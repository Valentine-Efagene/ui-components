import { func } from 'prop-types'
import { any } from 'prop-types'
import { shape } from 'prop-types'
import { string, bool, number, object } from 'prop-types'
import React from 'react'

/**
 * You should check validity with ref.current.checkValidity(): boolean
 * ref.current.validity: object
 */
function TextField({
  ref,
  onBlur,
  onChange,
  onInvalid,
  style,
  type,
  maxLength,
  minLength,
  autoComplete,
  name,
  id,
  readOnly,
  disabled,
  required,
  placeholder,
  testId,
}) {
  const _ref = ref

  return (
    <input
      onBlur={onBlur}
      onChange={onChange}
      onInvalid={onInvalid}
      ref={_ref}
      testid={testId}
      type={type}
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
  )
}

TextField.propTypes = {
  type: string,
  name: string,
  id: string,
  readOnly: bool,
  required: bool,
  disabled: bool,
  placeholder: string,
  autoComplete: bool,
  style: object,
  maxLength: number,
  minLength: number,
  onChange: func,
  onInvalid: func,
  onBlur: func,
  ref: shape({ current: any }),
  testId: string,
}

TextField.defaultProps = {
  type: 'text',
  readOnly: false,
  required: false,
  name: null,
  id: null,
  maxLength: 50,
  minLength: 3,
  autoComplete: true,
  disabled: false,
  style: {},
  testId: 'textfield',
}

export default TextField
