import { func } from 'prop-types'
import { number } from 'prop-types'
import { shape } from 'prop-types'
import { string, oneOfType, arrayOf, node } from 'prop-types'
import styles from './Dropdown.module.css'

function Dropdown({ onChange, options }) {
  return (
    <div className={`${styles.container}`}>
      <select
        testid="dropdown_toggle"
        className={styles.select}
        onChange={onChange}>
        {options?.map(({ title, value }) => (
          <>
            <div>{title}sdasda</div>
            <option hidden value={value}>
              {title}
            </option>
          </>
        ))}
      </select>
    </div>
  )
}

Dropdown.propTypes = {
  text: string,
  children: oneOfType([arrayOf(node), node]),
  onChange: func,
  options: arrayOf(
    shape({
      title: string,
      value: oneOfType([number, string]),
    })
  ),
}

Dropdown.defaultProps = {
  text: '',
}

export default Dropdown
