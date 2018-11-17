import CardActions from '@material-ui/core/CardActions/CardActions'
import Button from '@material-ui/core/Button/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import React from 'react'
import PropTypes from 'prop-types'

const TimerDeleteButton = ({
  active, complete, superTimerActive, deleteTimer, id,
}) => ((active || complete || superTimerActive) ? null : (
  <div>
    <CardActions>
      <Button onClick={() => deleteTimer(id)}>Delete <DeleteIcon /></Button>
    </CardActions>
  </div>
))

TimerDeleteButton.propTypes = {
  active: PropTypes.bool.isRequired,
  complete: PropTypes.bool.isRequired,
  superTimerActive: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  deleteTimer: PropTypes.func.isRequired,
}

export default TimerDeleteButton
