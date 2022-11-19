import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

/**
 * Tells if we are online or offline.
 * Can be tested on firefox by checking and unchecking
 * the 'work offline' option in (click alt to get the menu) file => workoffline.
 * @returns
 */
function NetworkMonitor() {
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    window?.addEventListener('offline', () => {
      setOffline(true)
      console.log('Offline')
    })

    window?.addEventListener('online', () => {
      setOffline(false)
      console.log('Online')
    })

    return () => {
      window?.removeEventListener('offline', () => {})
      window?.removeEventListener('online', () => {})
    }
  }, [])

  return <div testid="network_monitor">{offline ? 'offline' : 'online'}</div>
}

export default NetworkMonitor
