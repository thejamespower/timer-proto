import { handleActions } from 'redux-actions'
import { Record } from 'immutable'
import {
  CREATED_TIMER, SUPER_TIMER_STARTED, TIMER_DELETED, SUPER_TIMER_TICKED,
} from './action-types'

const InitialState = new Record({
  timers: [],
  superTimer: {
    duration: '00:00:00',
    durationInSeconds: 0,
    active: false,
    currentCount: null,
    timeElapsed: 0,
  },
})

const initialState = new InitialState()

const convertDurationToSeconds = (duration) => {
  const parts = duration.split(':')
  return parseInt(parts[0] * 3600, 10) + parseInt(parts[1] * 60, 10) + parseInt(parts[2], 10)
}

const convertSecondsToDuration = durationInSeconds => new Date(durationInSeconds * 1000).toISOString().substr(11, 8)

const getTotalDurationInSeconds = timers => Math.max(...timers.map(x => x.durationInSeconds))

const calculateNewStart = (elapsedTime, totalTime) => (x) => {
  const timeToStartInSeconds = Math.max(0, totalTime - x.durationInSeconds - elapsedTime)
  return {
    ...x,
    timeToStartInSeconds,
    timeToStart: convertSecondsToDuration(timeToStartInSeconds),
    active: timeToStartInSeconds === 0,
  }
}

const calculateStart = total => x => ({
  ...x,
  timeToStartInSeconds: total - x.durationInSeconds,
  timeToStart: convertSecondsToDuration(total - x.durationInSeconds),
})

const timersReducers = handleActions({
  [CREATED_TIMER]: (state, action) => {
    const timer = {
      ...action.payload,
      durationInSeconds: convertDurationToSeconds(action.payload.duration),
    }
    const newTimers = [...state.get('timers'), timer]

    const totalDurationInSeconds = getTotalDurationInSeconds(newTimers)

    const newTimerToAdd = {
      ...timer,
      timeToStartInSeconds: totalDurationInSeconds - convertDurationToSeconds(action.payload.duration),
      timeToStart: convertSecondsToDuration(totalDurationInSeconds - convertDurationToSeconds(action.payload.duration)),
    }

    const oldTimers = state.get('timers')
    const transformedOldTimers = oldTimers.map(calculateStart(totalDurationInSeconds))
    const newTimersToAdd = [...transformedOldTimers, newTimerToAdd]

    return (action.payload.duration === 0) ? state : state
      .set('timers', newTimersToAdd)
      .setIn(['superTimer', 'duration'], convertSecondsToDuration(totalDurationInSeconds))
      .setIn(['superTimer', 'durationInSeconds'], totalDurationInSeconds)
  },

  [TIMER_DELETED]: (state, action) => {
    if (!action.payload.length || state.getIn(['superTimer', 'active'])) {
      return state
    }
    const timers = [...state.get('timers').filter(x => x.id !== action.payload)]
    const totalDurationInSeconds = getTotalDurationInSeconds(timers)
    const transformedTimers = timers.map(calculateStart(totalDurationInSeconds))
    return state
      .set('timers', transformedTimers)
      .setIn(['superTimer', 'durationInSeconds'], totalDurationInSeconds)
      .setIn(['superTimer', 'duration'], convertSecondsToDuration(totalDurationInSeconds))
  },

  [SUPER_TIMER_STARTED]: (state) => {
    const start = (s) => {
      const timeElapsed = s.getIn(['superTimer', 'timeElapsed'])
      const timers = s.get('timers')
      const totalTime = s.getIn(['superTimer', 'durationInSeconds'])
      const newTimers = timers.map(calculateNewStart(timeElapsed, totalTime))
      return s
        .setIn(['superTimer', 'active'], true)
        .set('timers', newTimers)
    }
    return (state.timers.length === 0) ? state : start(state)
  },

  [SUPER_TIMER_TICKED]: (state, action) => {
    const currentCount = action.payload
    const timeElapsed = state.getIn(['superTimer', 'durationInSeconds']) - currentCount
    const timers = state.get('timers')
    const totalTime = state.getIn(['superTimer', 'durationInSeconds'])
    const newTimers = timers.map(calculateNewStart(timeElapsed, totalTime))
    return state
      .setIn(['superTimer', 'currentCount'], currentCount)
      .setIn(['superTimer', 'timeElapsed'], timeElapsed)
      .set('timers', newTimers)
  },
}, initialState)

export default timersReducers
