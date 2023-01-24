import { string } from 'prop-types'
import { node } from 'prop-types'
import { oneOfType } from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import DropDownItem from '../DropDownItem/DropDownItem'
import styles from './DropDownMenu.module.css'
import { ReactComponent as CogIcon } from '../../../icons/cog.svg'
import { ReactComponent as ChevronIcon } from '../../../icons/chevron.svg'
import usePrevState from '../../../hooks/usePrevState'
import { object } from 'prop-types'

import { ReactComponent as ArrowIcon } from '../../../icons/arrow.svg'

DropDownMenu.propTypes = {
  icon: oneOfType([string, node]),
  children: node,
  className: string,
  style: object,
}

export default function DropDownMenu({ icon, children, className, style }) {
  const [activeMenu, setActiveMenu] = useState('master')
  const [menuHeight, setMenuHeight] = useState(null)
  const dropdownRef = useRef()

  function calcHeight(element) {
    const height = element.offsetHeight
    setMenuHeight(height)
  }

  useEffect(() => {
    if (dropdownRef == null) return

    const activeElement = document?.querySelector(`.${styles.active}`)

    if (activeElement == null) return

    calcHeight(activeElement)
  }, [activeMenu])

  const heightStyle = menuHeight ? { height: menuHeight } : {}

  return (
    <div
      ref={dropdownRef}
      className={`${className} ${styles.dropdown}`}
      style={{ ...style, ...heightStyle }}>
      <div
        className={`${
          activeMenu === 'master' ? styles.active : styles.master
        }`}>
        <DropDownItem
          onClick={() => setActiveMenu('detail')}
          leftIcon={<CogIcon />}
          rightIcon={<ChevronIcon />}>
          My Profile
        </DropDownItem>
      </div>
      <div
        className={`${
          activeMenu === 'detail' ? styles.active : styles.detail
        }`}>
        <DropDownItem
          onClick={() => setActiveMenu('master')}
          leftIcon={<ArrowIcon />}></DropDownItem>
        <DropDownItem leftIcon={<CogIcon />}>Settings</DropDownItem>
      </div>
    </div>
  )
}
