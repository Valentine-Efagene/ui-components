import { ChevronDown, ChevronUp } from '@/Components/Common/Icons';
import { Link } from '@inertiajs/inertia-react';
import { bool, func, node, object, string } from 'prop-types';
import React from 'react';
import NavDropdownClickOnly from '../NavDropdownClickOnly';
import styles from './NavDropdown.module.css';

NavDropdown.propTypes = {
  user: object,
  searchFunc: func,
  className: string,
};

NavDropdown.propTypes = {
  className: string,
  title: string,
  onClick: func,
  href: string,
  active: bool,
  children: node,
};

export default function NavDropdown({ className, title, onClick, children }) {
  return (
    <>
      <div className={`${className} ${styles.container} ${styles.desktop}`}>
        <button className={styles.summary} onClick={onClick}>
          {title}
          <ChevronDown className={`${styles.icon}`} />
        </button>
        <div className={styles.content}>{children}</div>
      </div>
      <NavDropdownClickOnly className={styles.mobile} title={title}>
        {children}
      </NavDropdownClickOnly>
    </>
  );
}
