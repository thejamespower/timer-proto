import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import TimeField from 'react-simple-timefield'

class TimerCreator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: '00:00',
    }

    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleTimeChange(time) {
    this.setState({ time })
  }

  handleClick() {
    const { createdTimer } = this.props
    const { time } = this.state
    const duration = moment.duration(time)

    createdTimer({
      date: moment().add(duration),
      id: moment().format(),
    })
  }

  render() {
    const { time } = this.state

    return (
      <div>
        <TimeField value={time} onChange={this.handleTimeChange} showSeconds />
        <button
          type="submit"
          onClick={() => {
            this.handleClick()
          }}
        >
Create timer
        </button>
      </div>
    )
  }
}

TimerCreator.propTypes = {
  createdTimer: PropTypes.func.isRequired,
}

export default TimerCreator
