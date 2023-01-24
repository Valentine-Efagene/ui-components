import { useEffect, useRef } from 'react'

/**
 * https://blog.logrocket.com/accessing-previous-props-state-react-hooks/#custom-hook-useprevious-hook
 * @param {*} value
 * @returns
 */
export default function usePrevState(value) {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  })

  return ref.current
}
