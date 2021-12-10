import { handleActions } from 'redux-actions';
import { Record } from 'immutable';
import {
  END_TIME_SET,
  SUB_TIMER_CREATE,
  SUPER_TIMER_COMPLETE,
  SUPER_TIMER_START,
  SUPER_TIMER_TICK,
  TIMER_COMPLETE,
  TIMER_CREATE,
  TIMER_DELETE,
} from './action-types';
import convertDurationToSeconds from './lib/convertDurationToSeconds';
import convertSecondsToDuration from './lib/convertSecondsToDuration';
import getTotalDurationInSeconds from './lib/getTotalDurationInSeconds';
import updateTimerOnTick from './lib/updateTimerOnTick';
import setTimerStart from './lib/setTimerStart';
import completeTimer from './lib/completeTimer';

const uuid = require('uuid/v4');

export const InitialState = new Record({
  timers: [],
  superTimer: {
    endTime: null,
    startTime: null,
    duration: '00:00:00',
    durationInSeconds: 0,
    active: false,
    currentCount: null,
    elapsedTime: 0,
    complete: false,
  },
});

const initialState = new InitialState();

const tickTimers = (timers, elapsedTime, totalTime) =>
  timers.map(updateTimerOnTick(elapsedTime, totalTime));

const calculateStartTime = (endTime, durationInSeconds) => {
  return convertSecondsToDuration(
    convertDurationToSeconds(endTime) - durationInSeconds,
  );
};

const reducer = handleActions(
  {
    [TIMER_CREATE]: (state, { payload }) => {
      if (
        payload.duration === '00:00:00' ||
        state.superTimer.active ||
        !payload.name
      ) {
        return state;
      }

      const timer = {
        ...payload,
        id: payload.id || uuid(),
        durationInSeconds: convertDurationToSeconds(payload.duration),
        active: false,
        complete: false,
      };

      // Add new timers to list
      const newTimers = [...state.timers, timer];

      const totalDurationInSeconds = getTotalDurationInSeconds(newTimers);

      // Calculate new timer start time
      const newTimerWithStartTime = {
        ...timer,
        timeToStartInSeconds:
          totalDurationInSeconds - convertDurationToSeconds(payload.duration),
        timeToStart: convertSecondsToDuration(
          totalDurationInSeconds - convertDurationToSeconds(payload.duration),
        ),
      };

      const oldTimers = state.timers;

      // Calculate old timers new start times
      const oldTimersWithNewStartTimes = oldTimers.map(
        setTimerStart(totalDurationInSeconds),
      );

      const newTimersWithStartTimes = [
        ...oldTimersWithNewStartTimes,
        newTimerWithStartTime,
      ];

      const startTime = state.superTimer.endTime
        ? calculateStartTime(state.superTimer.endTime, totalDurationInSeconds)
        : state.superTimer.startTime;

      return state
        .set('timers', newTimersWithStartTimes)
        .setIn(['superTimer', 'currentCount'], totalDurationInSeconds)
        .setIn(
          ['superTimer', 'duration'],
          convertSecondsToDuration(totalDurationInSeconds),
        )
        .setIn(['superTimer', 'durationInSeconds'], totalDurationInSeconds)
        .setIn(['superTimer', 'startTime'], startTime);
    },

    [SUB_TIMER_CREATE]: (state, { payload }) => {
      if (!state.timers.length || state.superTimer.active || !payload.name) {
        return state;
      }

      const subTimer = {
        ...payload,
        id: payload.id || uuid(),
        active: false,
        complete: false,
        durationInSeconds: convertDurationToSeconds(payload.duration),
        offsetInSeconds: convertDurationToSeconds(payload.offset),
        timeToStart: '00:00:00',
        timeToStartInSeconds: 0,
      };

      // Add new timers to list
      const newTimers = [...state.timers, subTimer];

      return state.set('timers', newTimers);
    },

    [TIMER_DELETE]: (state, { payload }) => {
      if (!payload || state.superTimer.active) {
        return state;
      }

      // Get timers to keep
      const timers = [...state.timers.filter(x => x.id !== payload)];

      const totalDurationInSeconds = getTotalDurationInSeconds(timers);

      // Set timers new start time
      const transformedTimers = timers.map(
        setTimerStart(totalDurationInSeconds),
      );

      return state
        .set('timers', transformedTimers)
        .setIn(['superTimer', 'durationInSeconds'], totalDurationInSeconds)
        .setIn(
          ['superTimer', 'duration'],
          convertSecondsToDuration(totalDurationInSeconds),
        );
    },

    [TIMER_COMPLETE]: (state, { payload }) => {
      const timers = [...state.timers.map(completeTimer(payload))];
      return state.set('timers', timers);
    },

    [SUPER_TIMER_START]: state => {
      if (state.timers.length === 0 || state.superTimer.active) {
        return state;
      }
      const elapsedTime =
        state.superTimer.durationInSeconds -
        (state.superTimer.currentCount || 0);
      const { timers } = state;
      const totalTime = state.superTimer.durationInSeconds;
      const newTimers = tickTimers(timers, elapsedTime, totalTime);
      return state
        .setIn(['superTimer', 'active'], true)
        .set('timers', newTimers);
    },

    [SUPER_TIMER_TICK]: (state, { payload }) => {
      if (state.timers.length === 0 || !state.superTimer.active) {
        return state;
      }

      const elapsedTime = state.superTimer.durationInSeconds - payload;
      const { timers } = state;
      const totalTime = state.superTimer.durationInSeconds;
      const newTimers = tickTimers(timers, elapsedTime, totalTime);
      return state
        .setIn(['superTimer', 'currentCount'], payload)
        .setIn(['superTimer', 'elapsedTime'], elapsedTime)
        .set('timers', newTimers);
    },

    [SUPER_TIMER_COMPLETE]: state =>
      state
        .setIn(['superTimer', 'complete'], true)
        .setIn(['superTimer', 'active'], false),

    [END_TIME_SET]: (state, { payload }) => {
      const startTime = calculateStartTime(
        payload,
        state.superTimer.durationInSeconds,
      );
      return state
        .setIn(['superTimer', 'endTime'], payload)
        .setIn(['superTimer', 'startTime'], startTime);
    },
  },
  initialState,
);

export default reducer;
