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
    }).isRequired,
    timerDeleted: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    const { timer: { duration } } = this.props

    this.state = {
      duration,
    }
  }

  shouldComponentUpdate(nextProps) {
    const { timer: { timeToStart: oldTimeToStart, active: oldActive } } = this.props
    const { timer: { timeToStart: newTimeToStart, active: newActive } } = nextProps
    return newActive !== oldActive || newTimeToStart !== oldTimeToStart;
  }

  render() {
    const {
      timer: {
        name, active, timeToStart, id,
      },
      timerDeleted,
    } = this.props

    const { duration } = this.state

    return (
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>Timer</Typography>
          <Typography>{name}</Typography>
          {active ? (<Countdown date={moment().add(moment.duration(duration))} />) : null}
          {!active ? (<p>{duration}, Time to start: {timeToStart}</p>) : null}
        </CardContent>
        {!active ? (
          <CardActions>
            <Button onClick={() => timerDeleted(id)}>Delete <DeleteIcon /></Button>
          </CardActions>
        ) : null}
      </Card>
    )
  }
}

export default Timer
