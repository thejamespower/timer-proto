import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Countdown from 'react-countdown-now'
import moment from 'moment'
import Button from '@material-ui/core/Button/Button'

class SuperTimer extends Component {
  static propTypes = {
    superTimer: PropTypes.shape({
      duration: PropTypes.string.isRequired,
      durationInSeconds: PropTypes.number.isRequired,
      active: PropTypes.bool.isRequired,
    }).isRequired,
    superTimerStarted: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.handleSubmitClick = this.handleSubmitClick.bind(this)
  }

  handleSubmitClick() {
    const { superTimerStarted } = this.props
    superTimerStarted()
  }

  render() {
    const { superTimer } = this.props
    const {
      duration, active,
    } = superTimer
    return (
      <div>
        <p>Total:
          {duration}
        </p>
        {active ? (
          <Countdown date={moment().add(moment.duration(duration))} dayInHours />
        ) : null}
        <Button type="submit" onClick={this.handleSubmitClick}>Start</Button>
      </div>
    )
  }
}

export default SuperTimer
