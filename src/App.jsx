import './App.css'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import LineChart from './components/LineChart/LineChart'
import { data } from './data/stats_for_Denmark'
// import styles from './App.module.css'

function App() {
  return (
    <div style={{ height: '320px' }}>
      <ParentSize>
        {({ width, height }) => (
          <LineChart data={data} width={width} height={height} />
        )}
      </ParentSize>
    </div>
  )
}

export default App
