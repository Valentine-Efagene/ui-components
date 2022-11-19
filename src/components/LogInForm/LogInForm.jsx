import { string } from 'prop-types'
import BorderLabelTextField from '../BorderLabelTextField'
import styles from './LogInForm.module.css'

function LogInForm({ testId, className }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({
      email: e.target.email?.value,
      password: e.target.password?.value,
      remember_me: e.target.remember_me?.value,
    })
  }

  return (
    <form
      testid={testId}
      className={`${className} ${styles.form}`}
      onSubmit={handleSubmit}>
      <BorderLabelTextField
        className={styles.input}
        type="email"
        name="email"
        id="email"
        required={true}
        labelText="email"
        placeholder="Email"
      />
      <BorderLabelTextField
        className={styles.input}
        type="password"
        name="password"
        id="password"
        labelText="password"
        placeholder="Password"
      />
      <div className={styles.options}>
        <div className={styles.rememberMeContainer}>
          <input type="checkbox" name="remember_me" id="remember_me" />
          <label htmlFor="remember_me">Remember Password</label>
        </div>
        <a href="#">Forgot Password</a>
      </div>
      <input className={styles.submit} type="submit" value="Log in" />
    </form>
  )
}

LogInForm.propTypes = {
  testId: string,
  className: string,
}

LogInForm.defaultProps = {
  testId: 'LogIn',
}

export default LogInForm
