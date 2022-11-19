import { oneOfType } from 'prop-types'
import { shape } from 'prop-types'
import { number } from 'prop-types'
import { arrayOf, object, string } from 'prop-types'
import React from 'react'
import StatCard from '../StatCard/StatCard'
import styles from './StatPanel.module.css'

function StatPanel({ className, style, stats, testId }) {
  return (
    <div
      testid={testId}
      className={`${styles.container} ${className}`}
      style={style}>
      {stats.map((stat) => {
        const { title, value } = stat
        return <StatCard key={title} title={title} value={value} />
      })}
    </div>
  )
}

StatPanel.propTypes = {
  className: string,
  style: object,
  stats: arrayOf(
    shape({
      title: string,
      value: oneOfType([string, number]),
    })
  ),
  testId: string,
}

export default StatPanel
