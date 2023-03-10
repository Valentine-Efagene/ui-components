import { bool, object } from 'prop-types';
import { func } from 'prop-types';
import { string } from 'prop-types';
import React from 'react';
import styles from './DefaultRadio.module.css';

DefaultRadio.propTypes = {
  className: string,
  onChange: func,
  disabled: bool,
  style: object,
  defaultChecked: bool,
  id: string,
  name: string,
  value: string,
};

/**
 *
 * @param {string} className CSS class name
 * @param {bool} disabled Is the button disabled?
 * @param {object} style CSS style
 *
 * @returns
 */
export default function DefaultRadio({
  className,
  disabled,
  id,
  style,
  defaultChecked = false,
  onChange,
  name,
  value,
}) {
  return (
    <label
      htmlFor={id}
      className={`${className} ${styles.container}`}
      style={style}>
      <input
        className={styles.input}
        disabled={disabled}
        defaultChecked={defaultChecked}
        onChange={onChange}
        type="radio"
        name={name}
        hidden
        id={id}
        value={value}
      />
      <span className={styles.checkMark}></span>
    </label>
  );
}
