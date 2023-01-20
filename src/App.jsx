import { useEffect, useState } from 'react'
import './App.css'
import styles from './App.module.css'
import SmartTagInput from './components/SmartTagInput/SmartTagInput'

function App() {
  const [tags, setTags] = useState([])
  const [selection, setSelection] = useState([])
  const formatter = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction',
  })

  useEffect(() => {
    fetch('http://localhost:8000/test/api/tags')
      .then((res) => res?.json())
      .then((data) => setTags(data))
  }, [])

  return (
    <div className={`${styles.container} App`}>
      <header className="App-header">
        <p>{formatter.format(selection.map((tag) => tag.title))}</p>
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
