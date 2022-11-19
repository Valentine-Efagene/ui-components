import { object } from 'prop-types'
import { func } from 'prop-types'
import { oneOfType } from 'prop-types'
import { bool, number, string } from 'prop-types'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import styles from './MinMax.module.css'

/**
 * A range input with two thumbs for selecting maximum and minimum values respectively
 *
 * @example
 * const [valueMin, setValueMin] = useState(5)
 * const [valueMax, setValueMax] = useState(50)
 *
 * <MinMax
 *    minValue={valueMin}
 *    maxValue={valueMax}
 *    onChangeMin={(e) => setValueMin(e.target.value)}
 *    onChangeMax={(e) => setValueMax(e.target.value)}
 *  />
 *
 * @note
 * 1. Default scale is 100, and it is ideal
 * 2. Presents more confidence as a controlled component
 * 3. The ID of the lower bound input is the provided ID for the input, plus underscore min, e.g. test_min.
 * 4. The ID of the upper bound input is the provided ID for the input, plus underscore max, e.g. test_max.
 * 5. 3 and 4 apply to names as well.
 *
 * @param {number state variable} minValue Default value of the lower bound
 * @param {number state variable} maxValue Default value of the upper bound
 * @param {change event listener} onChangeMin Change listener for the lower bound range input
 * @param {change event listener} onChangeMax Change listener for the upper bound range input
 * @param {number} min Lower bound
 * @param {number} max Upper bound
 * @param {string} className CSS className
 * @param {object} style CSS style
 * @param {string} thumbClassName CSS className for the thumbs
 * @param {object} style CSS style for the thumbs
 * @param {boolean} required Required condition
 * @param {string} name HTML name
 * @param {string} id HTML ID for component container
 * @param {number} step Name for lower bound range input
 * @returns
 *
 */
function MinMax({
  min,
  max,
  minValue,
  maxValue,
  required,
  onChangeMin,
  onChangeMax,
  className,
  name,
  id,
  style,
  thumbClassName,
  thumbStyle,
  step,
  minLabel,
  maxLabel,
}) {
  const minRef = useRef()
  const maxRef = useRef()
  const rangeRef = useRef()
  const thumbMinRef = useRef()
  const thumbMaxRef = useRef()
  const minLabelRef = useRef()
  const maxLabelRef = useRef()
  const [valueMin, setValueMin] = useState(minValue)
  const [valueMax, setValueMax] = useState(maxValue)

  function setUpMin() {
    const inputMin = minRef.current
    const inputMax = maxRef.current
    const range = rangeRef.current
    const thumbMin = thumbMinRef.current
    const minLabel = minLabelRef.current

    let min = parseInt(inputMin.min)
    let max = parseInt(inputMin.max)

    inputMin.value = Math.min(
      parseInt(inputMin.value),
      parseInt(inputMax.value) - 1
    )

    const minLabelOffset = 8

    let percent = ((inputMin.value - min) * 100) / (max - min)
    thumbMin.style.left = percent + '%'
    minLabel.style.left = percent - minLabelOffset + '%'
    range.style.left = percent + '%'
    setValueMin([(percent * (max - min)) / 100] + min)
  }

  function setUpMax() {
    const inputMin = minRef.current
    const inputMax = maxRef.current

    const maxLabel = maxLabelRef.current

    const range = rangeRef.current
    const thumbMax = thumbMaxRef.current

    let min = parseInt(inputMax.min)
    let max = parseInt(inputMax.max)

    inputMax.value = Math.max(
      parseInt(inputMax.value),
      parseInt(inputMin.value) + 1
    )

    const maxLabelOffset = 8

    let percent = ((inputMax.value - min) * 100) / (max - min)
    thumbMax.style.right = 100 - percent + '%'
    maxLabel.style.right = 100 - percent - maxLabelOffset + '%'
    range.style.right = 100 - percent + '%'
    setValueMax([(percent * (max - min)) / 100] + min)
  }

  useEffect(() => {
    setUpMin()
    setUpMax()
    setValueMin(valueMin)
    setValueMax(valueMax)
  }, [])

  return (
    <div className={`${styles.container} ${className}`} style={style}>
      {maxValue ? (
        <input
          type="range"
          ref={minRef}
          style={thumbStyle}
          className={thumbClassName}
          defaultValue={valueMin}
          name={`${name}_min`}
          id={`${id}_min`}
          step={step}
          required={required}
          min={min}
          max={max}
          onChange={(e) => {
            setUpMin()
            onChangeMin(e)
          }}
        />
      ) : (
        <input
          type="range"
          ref={minRef}
          style={thumbStyle}
          className={thumbClassName}
          name={`${name}_min`}
          id={`${id}_min`}
          step={step}
          required={required}
          min={min}
          max={max}
          onChange={(e) => {
            setUpMin()
            onChangeMin(e)
          }}
        />
      )}
      {maxValue ? (
        <input
          type="range"
          className={thumbClassName}
          ref={maxRef}
          name={`${name}_max`}
          id={`${id}_max`}
          required={required}
          min={min}
          max={max}
          step={step}
          style={thumbStyle}
          defaultValue={valueMax}
          onInput={(e) => {
            setUpMax()
            onChangeMax(e)
          }}
        />
      ) : (
        <input
          type="range"
          className={thumbClassName}
          ref={maxRef}
          name={`${name}_max`}
          id={`${id}_max`}
          required={required}
          min={min}
          max={max}
          step={step}
          style={thumbStyle}
          onInput={(e) => {
            setUpMax()
            onChangeMax(e)
          }}
        />
      )}
      <div className={styles.slider}>
        <div className={styles.track}></div>
        <div ref={rangeRef} className={styles.range}></div>
        <div
          ref={thumbMinRef}
          className={`${styles.thumb} ${styles.left}`}></div>
        <div className={styles.minLabel} ref={minLabelRef}>
          {minLabel}
        </div>
        <div
          ref={thumbMaxRef}
          className={`${styles.thumb} ${styles.right}`}></div>
      </div>
      <div className={styles.maxLabel} ref={maxLabelRef}>
        {maxLabel}
      </div>
      {minRef?.current?.style.left}
    </div>
  )
}

MinMax.propTypes = {
  min: number,
  max: number,
  id: string,
  idMin: string,
  idMax: string,
  name: string,
  required: bool,
  minValue: number,
  maxValue: number,
  onChangeMin: func,
  onChangeMax: func,
  className: string,
  thumbClassName: string,
  style: object,
  thumbStyle: object,
  step: oneOfType([string, number]),
  minLabel: string,
  maxLabel: string,
}

MinMax.defaultProps = {
  min: 0,
  max: 100,
  minValue: 64,
  maxValue: 75,
  onChangeMin: () => {},
  onChangeMax: () => {},
}
export default MinMax
