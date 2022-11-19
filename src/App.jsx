import { useState } from 'react'
import './App.css'
import Analytics from './pages/Analytics/Analytics'
//import styles from './App.module.css'

function App() {
  const [selected, setSelected] = useState()

  return (
    // <div className="App">
    //   <header className="App-header">
    //   </header>
    // </div>
    <Analytics />
  )
}

export default App
