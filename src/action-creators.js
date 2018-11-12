import { createAction } from 'redux-actions'

import { CREATED_TIMER, SUPER_TIMER_STARTED } from './action-types'

const createdTimer = payload => createAction(CREATED_TIMER)(payload)
const superTimerStarted = payload => createAction(SUPER_TIMER_STARTED)(payload)

export {
  createdTimer,
  superTimerStarted,
}
