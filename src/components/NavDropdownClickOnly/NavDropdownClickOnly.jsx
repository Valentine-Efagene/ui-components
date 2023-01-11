import { ChevronDown, ChevronUp } from '@/Components/Common/Icons';
import { Link } from '@inertiajs/inertia-react';
import { bool, func, node, object, string } from 'prop-types';
import React from 'react';
import styles from './NavDropdownClickOnly.module.css';

NavDropdownClickOnly.propTypes = {
  user: object,
  searchFunc: func,
  className: string,
};

NavDropdownClickOnly.propTypes = {
  className: string,
  title: string,
  onClick: func,
  href: string,
  active: bool,
  children: node,
};

export default function NavDropdownClickOnly({
  className,
  title,
  onClick,
  children,
}) {
  return (
    <details className={`${className} ${styles.container}`}>
      <summary className={styles.summary} onClick={onClick}>
        {title}
        <ChevronDown className={`${styles.icon}`} />
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
}
