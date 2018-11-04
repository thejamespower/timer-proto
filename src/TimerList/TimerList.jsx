import React from 'react'
import PropTypes from 'prop-types'

import Timer from '../Timer'

const TimerList = ({ timers }) => timers.map(timer => <Timer key={timer.id} timer={timer} />)

TimerList.propTypes = {
  timers: PropTypes.arrayOf(
    PropTypes.object,
  ),
}

export default TimerList
