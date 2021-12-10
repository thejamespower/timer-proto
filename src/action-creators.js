import { createAction } from 'redux-actions';

import {
  TIMER_CREATE,
  SUB_TIMER_CREATE,
  SUPER_TIMER_START,
  TIMER_DELETE,
  SUPER_TIMER_TICK,
  TIMER_COMPLETE,
  SUPER_TIMER_COMPLETE,
} from './action-types';

const createTimer = payload => createAction(TIMER_CREATE)(payload);
const createSubTimer = payload => createAction(SUB_TIMER_CREATE)(payload);
const deleteTimer = payload => createAction(TIMER_DELETE)(payload);
const completeTimer = payload => createAction(TIMER_COMPLETE)(payload);
const startSuperTimer = payload => createAction(SUPER_TIMER_START)(payload);
const tickSuperTimer = payload => createAction(SUPER_TIMER_TICK)(payload);
const completeSuperTimer = payload =>
  createAction(SUPER_TIMER_COMPLETE)(payload);

export {
  createTimer,
  createSubTimer,
  deleteTimer,
  completeTimer,
  startSuperTimer,
  tickSuperTimer,
  completeSuperTimer,
};
