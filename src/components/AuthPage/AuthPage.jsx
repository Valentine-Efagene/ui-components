import React from 'react'
import AuthTabs from '../AuthTabs/AuthTabs'
import styles from './AuthPage.module.css'

function AuthPage() {
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <img
          className={styles.logo}
          src="/asset/img/jatado_logo.svg"
          alt="Jatado"
        />
        <span className={styles.textLogo}>Jatado</span>
      </div>
      <AuthTabs className={styles.authTab} />
    </div>
  )
}

export default AuthPage
