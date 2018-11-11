import React from 'react'
import PropTypes from 'prop-types'

import Timer from '../Timer'

const TimerList = ({ timers, superTimer }) => (
  <div>
    {timers.map(timer => <Timer key={timer.id} timer={timer} />)}
    <p>Total:
      {superTimer.duration}
    </p>
  </div>
)

TimerList.propTypes = {
  timers: PropTypes.arrayOf(
    PropTypes.shape({
      duration: PropTypes.string.isRequired,
      durationInSeconds: PropTypes.number.isRequired,
      active: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  superTimer: PropTypes.shape({
    duration: PropTypes.string.isRequired,
    durationInSeconds: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
  }).isRequired,
}

export default TimerList
