import styles from './MobilePageNav.module.css'
import { any, arrayOf, func, shape, string } from 'prop-types'
import { useState, useEffect } from 'react'
import { getActiveSection } from '@/Helpers/domPhysics'

MobilePageNav.propTypes = {
  className: string,
  activePageLink: string,
  handlePageNav: func,
  sections: arrayOf(
    shape({
      key: string,
      displayName: string,
      ref: shape({
        current: any,
      }),
    })
  ),
}

export default function MobilePageNav({ className, sections }) {
  const [activePageLink, setActivePageLink] = useState()
  const PADDING = 100

  const onScroll = (e) => {
    setActivePageLink(getActiveSection(e.currentTarget, sections, PADDING))
  }

  useEffect(() => {
    if (document == null) return

    setActivePageLink(getActiveSection(document, sections, PADDING))

    document.addEventListener('scroll', onScroll)

    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [])

  const handlePageNav = (section, sectionRef) => {
    setActivePageLink(section)
    sectionRef.current?.scrollIntoView(true)
  }

  const [showNav, setShowNav] = useState(false)

  return (
    <div className={`${styles.container} ${className}`}>
      <nav className={`${styles.nav} ${showNav ? null : styles.hidden}`}>
        <div className={styles.heading}>Go To</div>
        {sections?.map(({ key, displayName, ref }) => (
          <a
            key={key}
            className={`${styles.pageLink} ${
              activePageLink === key ? styles.activePageLink : ''
            }`}
            onClick={() => handlePageNav(key, ref)}>
            {displayName}
          </a>
        ))}
      </nav>
      <button
        className={styles.toggle}
        onClick={() => setShowNav((prevState) => !prevState)}>
        <img src="/assets/arrow-up.svg" alt="" />
      </button>
    </div>
  )
}
