import { handleActions } from 'redux-actions'
import { Record } from 'immutable'
import { CREATED_TIMER, SUPER_TIMER_STARTED, TIMER_DELETED } from './action-types'

const InitialState = new Record({
  timers: [],
  superTimer: {
    duration: '00:00:00',
    durationInSeconds: 0,
    active: false,
    currentTime: null,
  },
})

const initialState = new InitialState()

const convertDurationToSeconds = (duration) => {
  const parts = duration.split(':')
  return parseInt(parts[0] * 3600, 10) + parseInt(parts[1] * 60, 10) + parseInt(parts[2], 10)
}

const convertSecondsToDuration = durationInSeconds => new Date(durationInSeconds * 1000).toISOString().substr(11, 8)

const timers = handleActions({
  [CREATED_TIMER]: (state, action) => {
    const timer = {
      ...action.payload,
      durationInSeconds: convertDurationToSeconds(action.payload.duration),
    }
    const newTimers = [...state.get('timers'), timer]

    const totalDurationInSeconds = Math.max(...newTimers.map(x => x.durationInSeconds))

    const newTimerToAdd = {
      ...timer,
      timeToStartInSeconds: totalDurationInSeconds - convertDurationToSeconds(action.payload.duration),
      timeToStart: convertSecondsToDuration(totalDurationInSeconds - convertDurationToSeconds(action.payload.duration)),
    }

    const transformTimer = x => ({
      ...x,
      timeToStartInSeconds: totalDurationInSeconds - x.durationInSeconds,
      timeToStart: convertSecondsToDuration(totalDurationInSeconds - x.durationInSeconds),
    })

    const oldTimers = state.get('timers')
    const transformedOldTimers = oldTimers.map(x => transformTimer(x))
    const newTimersToAdd = [...transformedOldTimers, newTimerToAdd]

    return (action.payload.duration === 0) ? state : state
      .set('timers', newTimersToAdd)
      .setIn(['superTimer', 'duration'], convertSecondsToDuration(totalDurationInSeconds))
      .setIn(['superTimer', 'durationInSeconds'], totalDurationInSeconds)
  },
  [TIMER_DELETED]: (state, payload) => {
    console.log(payload)
    return state
  },
  [SUPER_TIMER_STARTED]: (state) => {
    const start = (s) => {
      console.log('start')
      return s.setIn(['superTimer', 'active'], true)
    }
    return (state.timers.length === 0) ? state : start(state)
  },
}, initialState)

export default timers
