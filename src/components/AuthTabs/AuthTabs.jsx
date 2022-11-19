import { string } from 'prop-types'
import { useState } from 'react'
import LogInForm from '../LogInForm'
import RegistrationForm from '../RegistrationForm'
import styles from './AuthTabs.module.css'

function AuthTabs({ testId, className }) {
  const [isLogIn, setIsLogIn] = useState(true)
  return (
    <div testid={testId} className={`${className} ${styles.container}`}>
      <img
        className={styles.firstEllipse}
        src="/asset/img/Ellipse 1024.svg"
        alt=""
      />
      <img
        className={styles.secondEllipse}
        src="/asset/img/Ellipse 1025.svg"
        alt=""
      />
      <img
        className={styles.thirdEllipse}
        src="/asset/img/Ellipse 1026.svg"
        alt=""
      />
      <img className={styles.rings} src="/asset/img/Group 124.svg" alt="" />
      <div className={styles.tab}>
        <div
          style={{
            borderBottom: !isLogIn ? '2px solid #000' : 'none',
          }}
          onClick={() => setIsLogIn(false)}>
          Sign Up
        </div>
        <div
          style={{
            borderBottom: isLogIn ? '2px solid #000' : 'none',
          }}
          onClick={() => setIsLogIn(true)}>
          Login
        </div>
      </div>
      <div className={styles.formContainer}>
        {isLogIn ? <LogInForm /> : <RegistrationForm />}
      </div>
    </div>
  )
}

AuthTabs.propTypes = {
  testId: string,
  className: string,
}

AuthTabs.defaultProps = {
  testId: 'LogIn',
}

export default AuthTabs
