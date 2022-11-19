import { oneOfType, number, string } from 'prop-types'
import React from 'react'
import styles from './StatCard.module.css'

function StatCard({ title, value, testId }) {
  return (
    <div testid={testId} className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <strong className={styles.value}>{value}</strong>
    </div>
  )
}

StatCard.propTypes = {
  title: string,
  value: oneOfType([number, string]),
  testId: string,
}

export default StatCard
