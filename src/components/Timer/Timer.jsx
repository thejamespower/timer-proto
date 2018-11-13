import React from 'react'
import PropTypes from 'prop-types'
import Countdown from 'react-sexy-countdown'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'

const Timer = ({ timer, timerDeleted }) => {
  const handleClick = () => {
    timerDeleted(timer.id)
  }
  const {
    name, duration, active, timeToStart,
  } = timer
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
          <Button onClick={handleClick}>Delete <DeleteIcon /></Button>
        </CardActions>
      ) : null }
    </Card>
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
