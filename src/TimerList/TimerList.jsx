import React from 'react'
import PropTypes from 'prop-types'
import Countdown from 'react-sexy-countdown'

const TimerList = ({ timers }) => timers.map(timer => <Countdown key={timer.id} date={timer.date} />)

TimerList.propTypes = {
  timers: PropTypes.arrayOf(
    PropTypes.object,
  ),
}

export default TimerList
