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
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Total: {duration}
          </Typography>
          {active ? (
            <Countdown date={moment().add(moment.duration(duration))} dayInHours />
          ) : null}
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" color="primary" onClick={this.handleSubmitClick}>Start</Button>
        </CardActions>
      </Card>
    )
  }
}

export default SuperTimer
