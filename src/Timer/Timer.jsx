import React from 'react'
import PropTypes from 'prop-types'
import Countdown from 'react-sexy-countdown'
import momentPropTypes from 'react-moment-proptypes'

const Timer = ({ timer }) => <Countdown date={timer.date.format()} />

Timer.propTypes = {
  timer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: momentPropTypes.momentObj.isRequired,
  }).isRequired,
}

export default Timer
