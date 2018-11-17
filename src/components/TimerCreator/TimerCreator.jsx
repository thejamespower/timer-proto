import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Button from '@material-ui/core/Button'

import CustomTimeField from '../TimeField'

const zeroDuration = '00:00:00'

class TimerCreator extends Component {
  static propTypes = {
    createTimer: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      duration: zeroDuration,
    }

    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleTimeChange(duration) {
    this.setState({ duration })
  }

  handleClick() {
    const { createTimer, name } = this.props
    const { duration } = this.state

    if (duration === zeroDuration) return

    createTimer({
      duration,
      id: `${moment().format()}-${Math.random()}`,
      name,
    })
  }

  render() {
    const { duration } = this.state

    return (
      <div>
        <CustomTimeField value={duration} onChange={this.handleTimeChange} />
        <Button
          type="submit"
          onClick={() => { this.handleClick() }}
        >
Create timer
        </Button>
      </div>
    )
  }
}

export default TimerCreator
