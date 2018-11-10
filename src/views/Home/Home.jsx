import React from 'react'

import TimerList from '../../components/TimerList'
import TimerCreator from '../../components/TimerCreator'

export default function Home() {
  return (
    <div>
      <TimerCreator />
      <TimerList />
    </div>
  )
}
