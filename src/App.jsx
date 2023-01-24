import { useEffect, useState } from 'react'
import './App.css'
import styles from './App.module.css'
import NavBar from './components/multi-level-nav/NavBar'
import NavItem from './components/multi-level-nav/NavItem/NavItem'
import { ReactComponent as BellIcon } from './icons/bell.svg'
import { ReactComponent as MessengerIcon } from './icons/messenger.svg'
import { ReactComponent as PlusIcon } from './icons/plus.svg'
import { ReactComponent as CaretIcon } from './icons/caret.svg'
import { ReactComponent as CogIcon } from './icons/cog.svg'
import { ReactComponent as ChevronIcon } from './icons/chevron.svg'
import { ReactComponent as ArrowIcon } from './icons/arrow.svg'
import { ReactComponent as BoltIcon } from './icons/bolt.svg'
import DropDownMenu from './components/multi-level-nav/DropDownMenu'
import usePrevState from './hooks/usePrevState'

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
    <div>
      <NavBar>
        <NavItem icon={<PlusIcon />} />
        <NavItem icon={<BellIcon />} />
        <NavItem icon={<MessengerIcon />} />
        <NavItem icon={<CaretIcon />}>
          <DropDownMenu />
        </NavItem>
      </NavBar>
    </div>
  )
  /* 
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
      */
}

export default App
