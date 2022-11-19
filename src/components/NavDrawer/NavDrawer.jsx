import { shape } from 'prop-types'
import { arrayOf } from 'prop-types'
import { string } from 'prop-types'
import React from 'react'
import styles from './NavDrawer.module.css'

function NavDrawer({ testId, links }) {
  return (
    <nav test-id={testId} id={styles.nav}>
      {links.map((link) => {
        const { name, url, children } = link
        if (link?.children && link.children?.length > 0) {
          return (
            <details key={name}>
              <summary>{name}</summary>
              <ul>
                {children.map((childLink) => {
                  const { name, url } = childLink
                  return (
                    <li key={name}>
                      <a href={url}>{name}</a>
                    </li>
                  )
                })}
              </ul>
            </details>
          )
        } else {
          return (
            <a href={url} key={name}>
              {name}
            </a>
          )
        }
      })}
    </nav>
  )
}

NavDrawer.propTypes = {
  testId: string,
  links: arrayOf(
    shape({ name: string, url: string, children: arrayOf(string) })
  ),
}

export default NavDrawer
