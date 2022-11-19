import { func } from 'prop-types'
import { bool } from 'prop-types'
import { oneOf } from 'prop-types'
import { number } from 'prop-types'
import { object, string } from 'prop-types'
import styles from './BorderLabelTextField.module.css'

/**
 *
 * @param {string} backgroundColor Sets the background color (defaults to '#fff')
 * @returns
 */
function BorderLabelTextField({
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
  testId,
  backgroundColor,
}) {
  return (
    <div testid={testId} className={`${styles.container} ${className}`}>
      <input
        style={{ ...style, backgroundColor }}
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
      {placeholder && (
        <span
          style={{
            backgroundColor,
          }}
          htmlFor={id}
          className={styles.placeholder}>
          {placeholder}
        </span>
      )}
    </div>
  )
}

BorderLabelTextField.propTypes = {
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
  autoComplete: bool,
  maxLength: number,
  minLength: number,
  onInvalid: func,
  inputClassName: string,
  inputStyle: object,
  labelClassName: string,
  testId: string,
  backgroundColor: string,
}

BorderLabelTextField.defaultProps = {
  type: 'text',
  readOnly: false,
  required: false,
  name: null,
  id: null,
  maxLength: 50,
  minLength: 3,
  autoComplete: true,
  inputStyle: {},
  disabled: false,
  style: {},
  testId: 'border-label-textfield',
  backgroundColor: '#fff',
}

export default BorderLabelTextField
