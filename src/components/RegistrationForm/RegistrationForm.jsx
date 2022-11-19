import { string } from 'prop-types'
import BorderLabelTextField from '../BorderLabelTextField'
import styles from './RegistrationForm.module.css'

function RegistrationForm({ testId, className }) {
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
      <BorderLabelTextField
        className={styles.input}
        type="password"
        name="password_confirm"
        id="password_confirm"
        labelText="confirm password"
        placeholder="Confirm Password"
      />
      <input className={styles.submit} type="submit" value="Sign Up" />
    </form>
  )
}

RegistrationForm.propTypes = {
  testId: string,
  className: string,
}

RegistrationForm.defaultProps = {
  testId: 'LogIn',
}

export default RegistrationForm
