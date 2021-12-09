import { handleActions } from 'redux-actions';
import { Record } from 'immutable';
import {
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
import timersNewStart from './lib/timersNewStart';
import timersStart from './lib/timersStart';
import timersComplete from './lib/timersComplete';

const InitialState = new Record({
  timers: [],
  superTimer: {
    duration: '00:00:00',
    durationInSeconds: 0,
    active: false,
    currentCount: null,
    timeElapsed: 0,
    complete: false,
  },
});

const initialState = new InitialState();

const timersReducers = handleActions(
  {
    [TIMER_CREATE]: (state, action) => {
      const timer = {
        ...action.payload,
        durationInSeconds: convertDurationToSeconds(action.payload.duration),
        active: false,
        complete: false,
      };
      const newTimers = [...state.get('timers'), timer];

      const totalDurationInSeconds = getTotalDurationInSeconds(newTimers);

      const newTimerToAdd = {
        ...timer,
        timeToStartInSeconds:
          totalDurationInSeconds -
          convertDurationToSeconds(action.payload.duration),
        timeToStart: convertSecondsToDuration(
          totalDurationInSeconds -
            convertDurationToSeconds(action.payload.duration),
        ),
      };

      const oldTimers = state.get('timers');
      const transformedOldTimers = oldTimers.map(
        timersStart(totalDurationInSeconds),
      );
      const newTimersToAdd = [...transformedOldTimers, newTimerToAdd];

      return action.payload.duration === 0
        ? state
        : state
            .set('timers', newTimersToAdd)
            .setIn(
              ['superTimer', 'duration'],
              convertSecondsToDuration(totalDurationInSeconds),
            )
            .setIn(['superTimer', 'durationInSeconds'], totalDurationInSeconds);
    },

    [TIMER_DELETE]: (state, action) => {
      if (!action.payload.length || state.getIn(['superTimer', 'active'])) {
        return state;
      }
      const timers = [
        ...state.get('timers').filter(x => x.id !== action.payload),
      ];
      const totalDurationInSeconds = getTotalDurationInSeconds(timers);
      const transformedTimers = timers.map(timersStart(totalDurationInSeconds));
      return state
        .set('timers', transformedTimers)
        .setIn(['superTimer', 'durationInSeconds'], totalDurationInSeconds)
        .setIn(
          ['superTimer', 'duration'],
          convertSecondsToDuration(totalDurationInSeconds),
        );
    },

    [TIMER_COMPLETE]: (state, action) => {
      const timers = [
        ...state.get('timers').map(timersComplete(action.payload)),
      ];
      return state.set('timers', timers);
    },

    [SUPER_TIMER_START]: state => {
      const start = s => {
        const timeElapsed = s.getIn(['superTimer', 'timeElapsed']);
        const timers = s.get('timers');
        const totalTime = s.getIn(['superTimer', 'durationInSeconds']);
        const newTimers = timers.map(timersNewStart(timeElapsed, totalTime));
        return s.setIn(['superTimer', 'active'], true).set('timers', newTimers);
      };
      return state.timers.length === 0 ? state : start(state);
    },

    [SUPER_TIMER_TICK]: (state, action) => {
      const currentCount = action.payload;
      const timeElapsed =
        state.getIn(['superTimer', 'durationInSeconds']) - currentCount;
      const timers = state.get('timers');
      const totalTime = state.getIn(['superTimer', 'durationInSeconds']);
      const newTimers = timers.map(timersNewStart(timeElapsed, totalTime));
      return state
        .setIn(['superTimer', 'currentCount'], currentCount)
        .setIn(['superTimer', 'timeElapsed'], timeElapsed)
        .set('timers', newTimers);
    },
    [SUPER_TIMER_COMPLETE]: state =>
      state
        .setIn(['superTimer', 'complete'], true)
        .setIn(['superTimer', 'active'], false),
  },
  initialState,
);

export default timersReducers;
