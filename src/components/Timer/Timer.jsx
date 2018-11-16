import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Countdown from 'react-countdown-now'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'

class Timer extends Component {
  static propTypes = {
    timer: PropTypes.shape({
      id: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
      timeToStart: PropTypes.string.isRequired,
      timeToStartInSeconds: PropTypes.number.isRequired,
      complete: PropTypes.bool.isRequired,
    }).isRequired,
    deleteTimer: PropTypes.func.isRequired,
    completeTimer: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    const { timer: { duration } } = this.props

    this.state = {
      duration,
    }

    this.handleComplete = this.handleComplete.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    const { timer: { timeToStart: oldTimeToStart, active: oldActive } } = this.props
    const { timer: { timeToStart: newTimeToStart, active: newActive } } = nextProps
    return newActive !== oldActive || newTimeToStart !== oldTimeToStart
  }

  handleComplete() {
    const { completeTimer, timer: { id } } = this.props
    completeTimer(id)
  }

  render() {
    const {
      timer: {
        name, active, timeToStart, id, complete,
      },
      deleteTimer,
    } = this.props

    const { duration } = this.state

    return (
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>Timer</Typography>
          <Typography>{name}</Typography>
          {active && <Countdown date={moment().add(moment.duration(duration))} onComplete={this.handleComplete} />}
          {!active && !complete && <p>{duration}, Time to start: {timeToStart}</p>}
          {complete && <p>Done!</p>}
        </CardContent>
        {!active && !complete && (
          <CardActions>
            <Button onClick={() => deleteTimer(id)}>Delete <DeleteIcon /></Button>
          </CardActions>
        )}
      </Card>
    )
  }
}

export default Timer
