import { createAction } from 'redux-actions'

import {
  CREATED_TIMER, SUPER_TIMER_STARTED, TIMER_DELETED, SUPER_TIMER_TICKED,
} from './action-types'

const createdTimer = payload => createAction(CREATED_TIMER)(payload)
const timerDeleted = payload => createAction(TIMER_DELETED)(payload)
const superTimerStarted = payload => createAction(SUPER_TIMER_STARTED)(payload)
const superTimerTicked = payload => createAction(SUPER_TIMER_TICKED)(payload)

export {
  createdTimer,
  timerDeleted,
  superTimerStarted,
  superTimerTicked,
}
