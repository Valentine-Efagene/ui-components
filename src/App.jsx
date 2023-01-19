import { useEffect, useState } from 'react'
import './App.css'
import styles from './App.module.css'
import SmartTagInput from './components/SmartTagInput/SmartTagInput'

function App() {
  const [tags, setTags] = useState([])
  const [selection, setSelection] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/test/api/tags')
      .then((res) => res?.json())
      .then((data) => setTags(data))
  }, [])

  return (
    <div className={`${styles.container} App`}>
      <header className="App-header">
        <SmartTagInput
          style={{ width: '70%' }}
          name="tags"
          id="tags"
          tags={tags ?? []}
          selection={selection}
          setSelection={setSelection}
        />
      </header>
    </div>
  )
}

export default App
