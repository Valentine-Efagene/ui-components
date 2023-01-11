import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import styles from './App.module.css'

function App() {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    setInterval(() => {
      setCounter((prevState) => prevState + 1)
    }, 1000)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div
          className={styles.buttonLike}
          onClick={() => {
            setCounter((prevState) => prevState + 1)
          }}>
          {counter}
        </div>
      </header>
    </div>
  )
}

export default App
