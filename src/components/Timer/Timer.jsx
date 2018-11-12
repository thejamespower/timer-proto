import React from 'react'
import PropTypes from 'prop-types'
import Countdown from 'react-sexy-countdown'
import moment from 'moment'
import Button from '@material-ui/core/Button'

const Timer = ({ timer, timerDeleted }) => {
  const handleClick = () => {
    timerDeleted(timer.id)
  }
  const {
    name, duration, active, timeToStart,
  } = timer
  return (
    <div>
      <p>{name}</p>
      {active ? (<Countdown date={moment().add(moment.duration(duration))} />)
        : <div><p>{duration}, Time to start: {timeToStart}</p><Button onClick={handleClick}>Delete</Button></div>}
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
  timerDeleted: PropTypes.func.isRequired,
}

export default Timer
