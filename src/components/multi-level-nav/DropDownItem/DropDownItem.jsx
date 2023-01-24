import { node, string, oneOfType, func } from 'prop-types'
import styles from './DropDownItem.module.css'

DropDownItem.propTypes = {
  leftIcon: oneOfType([string, node]),
  rightIcon: oneOfType([string, node]),
  children: node,
  url: string,
  onClick: func,
  className: string,
}

export default function DropDownItem({
  children,
  url,
  leftIcon,
  rightIcon,
  onClick,
  className,
}) {
  return (
    <a
      href={url ?? '#'}
      className={`${className} ${styles.item}`}
      onClick={onClick}>
      {leftIcon && (
        <span className={`${styles.iconButton} ${styles.iconLeft}`}>
          {leftIcon}
        </span>
      )}
      {children}
      {rightIcon && (
        <span className={`${styles.iconButton} ${styles.iconRight}`}>
          {rightIcon}
        </span>
      )}
    </a>
  )
}
