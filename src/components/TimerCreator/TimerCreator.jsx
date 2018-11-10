import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import TimeField from 'react-simple-timefield'
import Button from '@material-ui/core/Button'


class TimerCreator extends Component {
  static propTypes = {
    createdTimer: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      duration: '00:00',
      active: false,
    }

    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleTimeChange(duration) {
    this.setState({ duration })
  }

  handleClick() {
    const { createdTimer, name } = this.props
    const { duration, active } = this.state
    createdTimer({
      duration,
      id: moment().format(),
      name,
      active,
    })
  }

  render() {
    const { duration } = this.state

    return (
      <div>
        <TimeField value={duration} onChange={this.handleTimeChange} showSeconds />
        <Button
          type="submit"
          onClick={() => {
            this.handleClick()
          }}
        >
Create timer
        </Button>
      </div>
    )
  }
}

export default TimerCreator
