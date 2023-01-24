import { string } from 'prop-types'
import { node } from 'prop-types'
import { oneOfType } from 'prop-types'
import React, { useState } from 'react'
import styles from './NavItem.module.css'

NavItem.propTypes = {
  icon: oneOfType([string, node]),
  children: node,
}

export default function NavItem({ icon, children }) {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen((prevState) => !prevState)

  return (
    <li className={styles.navItem}>
      <a href="#" className={styles.iconButton} onClick={toggleOpen}>
        {icon}
      </a>
      {open && children}
    </li>
  )
}
