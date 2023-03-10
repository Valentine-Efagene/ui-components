import React, { ChangeEvent, useRef, MutableRefObject, RefObject } from 'react'
import styles from './OTP.module.css'

interface IOTPProps {
  style?: { [key: string]: string }
  className?: string
  values: Array<string | undefined | number>
  setValues: any
  name?: string
  id?: string
}

/**
 *
 * @param name: HTML attribute (defaults to 'otp')
 * @param id: HTML attribute (defaults to 'otp')
 * @param style: CSS styles
 * @param className: CSS class
 * @param values: state Array of numbers that add up to form the OTP
 * @param setValues: state transition function for values
 *
 * @example
 * export default function VerificationCode() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const initialValues: Array<string | undefined | number> = Array(4).fill(undefined);
  const [values, setValues] = useState(initialValues);

  return (
    <Form className={styles.container} onSubmit={handleSubmit}>
      <OTP className="m-auto" values={values} setValues={setValues} />
    </Form>
  );
 * 
 * @returns
 */
export default function OTP({
  style,
  className,
  values,
  setValues,
  name = 'otp',
  id = 'otp',
}: IOTPProps) {
  const boxRef0 = useRef<HTMLInputElement>()
  const boxRef1 = useRef<HTMLInputElement>()
  const boxRef2 = useRef<HTMLInputElement>()
  const boxRef3 = useRef<HTMLInputElement>()

  const boxRefs: Array<MutableRefObject<HTMLInputElement | undefined>> = [
    boxRef0,
    boxRef1,
    boxRef2,
    boxRef3,
  ]

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement

    if (value == null) return

    const index: number = Number(name?.[name.length - 1])

    setValues((prevState: any) => {
      const temp = [...prevState]
      temp[index] = Number(value)

      return temp
    })

    const next =
      index < values?.length - 1
        ? boxRefs?.[index + 1]?.current
        : boxRefs?.[index]?.current

    if (next) {
      next?.focus()
    }
  }

  return (
    <div className={`${className} ${styles.container}`} style={style}>
      {/* Get a range of values from 0 to N - 1, where N is the length of values
      This ensures uniqueness of keys */}
      {Array.from(Array(values.length).keys())?.map((key) => (
        <input
          key={key}
          name={`${name}${key}`}
          id={`${id}${key}`}
          ref={boxRefs[key] as RefObject<HTMLInputElement>}
          onChange={handleChange}
          className={styles.box}
          value={values?.[key]}
          maxLength={1}
        />
      ))}
    </div>
  )
}
