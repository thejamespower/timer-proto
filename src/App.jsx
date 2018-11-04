import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import TimerList from './TimerList'

const App = ({ createdTimer }) => {
  const handleClick = () => {
    createdTimer({
      date: moment().seconds(300),
      id: moment(),
    })
  }
  return (
    <div>
      <button type="button" onClick={() => { handleClick() }}>Create timer</button>
      <TimerList />
    </div>)
}

App.propTypes = {
  createdTimer: PropTypes.func.isRequired,
}

export default App
