import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Countdown from 'react-countdown-now'
import moment from 'moment'
import Button from '@material-ui/core/Button/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

class SuperTimer extends Component {
  static propTypes = {
    superTimer: PropTypes.shape({
      duration: PropTypes.string.isRequired,
      durationInSeconds: PropTypes.number.isRequired,
      active: PropTypes.bool.isRequired,
      complete: PropTypes.bool.isRequired,
      currentCount: PropTypes.number,
    }).isRequired,
    startSuperTimer: PropTypes.func.isRequired,
    tickSuperTimer: PropTypes.func.isRequired,
    completeSuperTimer: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.handleSubmitClick = this.handleSubmitClick.bind(this)
    this.handleTick = this.handleTick.bind(this)
    this.handleComplete = this.handleComplete.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    const { superTimer: { duration, active } } = this.props
    return nextProps.superTimer.duration !== duration || nextProps.superTimer.active !== active
  }

  handleSubmitClick() {
    const { startSuperTimer, superTimer: { duration } } = this.props
    if (duration === '00:00:00') return
    startSuperTimer()
  }

  handleTick({ total }) {
    const { tickSuperTimer } = this.props
    tickSuperTimer(total / 1000)
  }

  handleComplete() {
    const { completeSuperTimer } = this.props
    completeSuperTimer()
  }

  render() {
    const { superTimer } = this.props
    const {
      duration, active, complete,
    } = superTimer
    return (
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Total: {duration}
          </Typography>
          {active && (
          <Countdown
            date={moment().add(moment.duration(duration)).toDate()}
            dayInHours
            onTick={this.handleTick}
            onComplete={this.handleComplete}
          />)}
          {complete && <p>All done!</p>}
        </CardContent>
        <CardActions>
          <Button
            disabled={duration === '00:00:00'}
            type="submit"
            variant="contained"
            color="primary"
            onClick={this.handleSubmitClick}
          >Start
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default SuperTimer
