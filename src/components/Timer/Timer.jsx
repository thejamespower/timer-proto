import React from 'react'
import PropTypes from 'prop-types'
import Countdown from 'react-sexy-countdown'
import moment from 'moment'

const Timer = ({ timer }) => {
  const {
    name, duration, active, timeToStart,
  } = timer
  return (
    <div>
      <p>{name}</p>
      {active ? (
        <Countdown date={moment().add(moment.duration(duration))} />
      ) : <p>{duration}, Time to start: {timeToStart}</p>}
    </div>
  )
}

Timer.propTypes = {
  timer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  }).isRequired,
}

export default Timer
