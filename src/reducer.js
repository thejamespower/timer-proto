import { handleActions } from 'redux-actions'
import { Record } from 'immutable'
import CREATED_TIMER from './action-types'

const InitialState = new Record({
  timers: [],
})

const initialState = new InitialState()

const timers = handleActions({
  [CREATED_TIMER]: (state, action) => state.set('timers', [...state.timers, action.payload]),
}, initialState)

export default timers
