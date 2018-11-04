import { createAction } from 'redux-actions'

import CREATED_TIMER from './action-types'

const createdTimer = payload => createAction(CREATED_TIMER)(payload)

export {
  createdTimer as default,
}
