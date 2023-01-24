import { node } from 'prop-types'
import React from 'react'
import styles from './NavBar.module.css'

NavBar.propTypes = {
  children: node,
}

/**
 * Facebook nav dropdown
 * @returns
 */
export default function NavBar({ children }) {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>{children}</ul>
    </nav>
  )
}
