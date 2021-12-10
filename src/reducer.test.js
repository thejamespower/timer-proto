import { Record } from 'immutable';
import reducer, { InitialState } from './reducer';
import {
  SUB_TIMER_CREATE,
  SUPER_TIMER_START,
  SUPER_TIMER_TICK,
  TIMER_COMPLETE,
  TIMER_CREATE,
  TIMER_DELETE,
} from './action-types';

const TimerState = ({ active, inProgress = true, subTimer = null }) =>
  new Record({
    superTimer: {
      active,
      complete: false,
      currentCount: inProgress ? 90 : 120,
      duration: '00:01:00',
      durationInSeconds: 120,
      elapsedTime: inProgress ? 30 : 0,
    },
    timers: [
      {
        active: false,
        complete: false,
        duration: '00:01:00',
        durationInSeconds: 60,
        id: '1',
        timeToStart: inProgress ? '00:00:30' : '00:01:00',
        timeToStartInSeconds: inProgress ? 30 : 60,
      },
      {
        active,
        complete: false,
        duration: '00:02:00',
        durationInSeconds: 120,
        id: '2',
        timeToStart: '00:00:00',
        timeToStartInSeconds: 0,
      },
      ...(subTimer
        ? [
            {
              active: false,
              complete: false,
              offset: '00:01:00',
              offsetInSeconds: 60,
              duration: '00:01:00',
              durationInSeconds: 60,
              id: 'subTimer A',
              timeToStart: '00:00:00',
              timeToStartInSeconds: 0,
            },
          ]
        : []),
    ],
  });

describe('reducer', () => {
  it('returns initialState', () => {
    expect(reducer(undefined, {}).toJS()).toEqual({
      timers: [],
      superTimer: {
        duration: '00:00:00',
        durationInSeconds: 0,
        active: false,
        currentCount: null,
        elapsedTime: 0,
        complete: false,
      },
    });
  });

  describe('TIMER_CREATE', () => {
    describe('given initial state', () => {
      const state = new InitialState();

      describe('when reducing new state from action with payload duration is zero value ("00:00:00")', () => {
        const action = {
          type: TIMER_CREATE,
          payload: {
            duration: '00:00:00',
          },
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            timers: [],
            superTimer: {
              duration: '00:00:00',
              durationInSeconds: 0,
              active: false,
              currentCount: null,
              elapsedTime: 0,
              complete: false,
            },
          });
        });
      });

      describe('when payload duration is non-zero value ("00:01:00")', () => {
        const action = {
          type: TIMER_CREATE,
          payload: {
            duration: '00:01:00',
            id: '1',
            name: 'sub timer 1',
          },
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 60,
              duration: '00:01:00',
              durationInSeconds: 60,
              elapsedTime: 0,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                name: 'sub timer 1',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });

    describe('given inactive state', () => {
      const state = TimerState({ active: false })();

      describe('when reducing new state from action with payload duration is zero value ("00:00:00")', () => {
        const action = {
          type: TIMER_CREATE,
          payload: {
            duration: '00:00:00',
          },
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 90,
              duration: '00:01:00',
              durationInSeconds: 120,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: false,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });

      describe('when payload duration is zero value ("00:00:00")', () => {
        const action = {
          type: TIMER_CREATE,
          payload: {
            duration: '00:00:00',
            id: '1',
            name: 'timer 1',
          },
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 90,
              duration: '00:01:00',
              durationInSeconds: 120,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: false,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });

      describe('when payload duration is non-zero value ("00:01:00")', () => {
        const action = {
          type: TIMER_CREATE,
          payload: {
            duration: '00:01:00',
            id: '1',
            name: 'timer 1',
          },
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 120,
              duration: '00:02:00',
              durationInSeconds: 120,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:01:00',
                timeToStartInSeconds: 60,
              },
              {
                active: false,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                name: 'timer 1',
                timeToStart: '00:01:00',
                timeToStartInSeconds: 60,
              },
            ],
          });
        });
      });
    });

    describe('given inactive state with subTimers', () => {
      const state = TimerState({ active: false, subTimer: true })();

      describe('when reducing new state from action with payload duration is zero value ("00:00:00")', () => {
        const action = {
          type: TIMER_CREATE,
          payload: {
            duration: '00:00:00',
          },
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 90,
              duration: '00:01:00',
              durationInSeconds: 120,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: false,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: 'subTimer A',
                offset: '00:01:00',
                offsetInSeconds: 60,
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });

      describe('when payload duration is zero value ("00:00:00")', () => {
        const action = {
          type: TIMER_CREATE,
          payload: {
            duration: '00:00:00',
            id: '1',
            name: 'timer 1',
          },
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 90,
              duration: '00:01:00',
              durationInSeconds: 120,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: false,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: 'subTimer A',
                offset: '00:01:00',
                offsetInSeconds: 60,
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });

      describe('when payload duration is non-zero value ("00:01:00")', () => {
        const action = {
          type: TIMER_CREATE,
          payload: {
            duration: '00:03:00',
            id: '3',
            name: 'timer 3',
          },
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 180,
              duration: '00:03:00',
              durationInSeconds: 180,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:02:00',
                timeToStartInSeconds: 120,
              },
              {
                active: false,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:01:00',
                timeToStartInSeconds: 60,
              },
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: 'subTimer A',
                offset: '00:01:00',
                offsetInSeconds: 60,
                timeToStart: '00:01:00',
                timeToStartInSeconds: 60,
              },
              {
                active: false,
                complete: false,
                duration: '00:03:00',
                durationInSeconds: 180,
                id: '3',
                name: 'timer 3',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });

    describe('given active state', () => {
      const state = TimerState({ active: true })();

      describe('when reducing new state from action with payload duration is zero value ("00:00:00")', () => {
        const action = {
          type: TIMER_CREATE,
          payload: {
            duration: '00:00:00',
          },
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: true,
              complete: false,
              currentCount: 90,
              duration: '00:01:00',
              durationInSeconds: 120,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: true,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });

      describe('when payload duration is non-zero value ("00:01:00")', () => {
        const action = {
          type: TIMER_CREATE,
          payload: {
            duration: '00:01:00',
            id: '3',
          },
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: true,
              complete: false,
              currentCount: 90,
              duration: '00:01:00',
              durationInSeconds: 120,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: true,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });
  });

  describe('SUB_TIMER_CREATE', () => {
    describe('given initial state', () => {
      const state = new InitialState();

      describe('when reducing new state from action with payload offset is zero value ("00:00:00")', () => {
        const action = {
          type: SUB_TIMER_CREATE,
          payload: {
            offset: '00:00:00',
            name: 'sub timer 1',
            id: '1',
          },
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: null,
              duration: '00:00:00',
              durationInSeconds: 0,
              elapsedTime: 0,
            },
            timers: [],
          });
        });
      });

      describe('when payload offset is non-zero value ("00:01:00")', () => {
        const action = {
          type: SUB_TIMER_CREATE,
          payload: {
            offset: '00:00:00',
            name: 'sub timer 1',
            id: '1',
          },
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: null,
              duration: '00:00:00',
              durationInSeconds: 0,
              elapsedTime: 0,
            },
            timers: [],
          });
        });
      });

      describe('when payload contains no name', () => {
        const action = {
          type: SUB_TIMER_CREATE,
          payload: {
            offset: '00:00:00',
            id: '1',
          },
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: null,
              duration: '00:00:00',
              durationInSeconds: 0,
              elapsedTime: 0,
            },
            timers: [],
          });
        });
      });
    });

    describe('given inactive state', () => {
      const state = TimerState({ active: false })();

      describe('when reducing new state from action with payload duration is zero value ("00:00:00")', () => {
        const action = {
          type: SUB_TIMER_CREATE,
          payload: {
            offset: '00:01:00',
            duration: '00:01:00',
            id: '1',
            name: 'sub timer 1',
          },
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 90,
              duration: '00:01:00',
              durationInSeconds: 120,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: false,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                name: 'sub timer 1',
                offset: '00:01:00',
                offsetInSeconds: 60,
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });

      describe('when payload duration is non-zero value ("00:01:00")', () => {
        const action = {
          type: TIMER_CREATE,
          payload: {
            duration: '00:01:00',
            id: '3',
            name: 'timer 3',
          },
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 120,
              duration: '00:02:00',
              durationInSeconds: 120,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:01:00',
                timeToStartInSeconds: 60,
              },
              {
                active: false,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '3',
                name: 'timer 3',
                timeToStart: '00:01:00',
                timeToStartInSeconds: 60,
              },
            ],
          });
        });
      });

      describe('when payload contains no name', () => {
        const action = {
          type: SUB_TIMER_CREATE,
          payload: {
            offset: '00:01:00',
            id: '3',
          },
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 90,
              duration: '00:01:00',
              durationInSeconds: 120,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: false,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });

    describe('given active state', () => {
      const state = TimerState({ active: true })();

      describe('when reducing new state from action with payload offset is zero value ("00:00:00")', () => {
        const action = {
          type: SUB_TIMER_CREATE,
          payload: {
            duration: '00:00:00',
            id: '1',
            name: 'sub timer 1',
          },
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: true,
              complete: false,
              currentCount: 90,
              duration: '00:01:00',
              durationInSeconds: 120,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: true,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });

      describe('when payload duration is non-zero value ("00:01:00")', () => {
        const action = {
          type: SUB_TIMER_CREATE,
          payload: {
            offset: '00:01:00',
            id: '1',
            name: 'sub timer 1',
          },
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: true,
              complete: false,
              currentCount: 90,
              duration: '00:01:00',
              durationInSeconds: 120,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: true,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });

      describe('when payload contains no name', () => {
        const action = {
          type: SUB_TIMER_CREATE,
          payload: {
            offset: '00:01:00',
            id: '3',
          },
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: true,
              complete: false,
              currentCount: 90,
              duration: '00:01:00',
              durationInSeconds: 120,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: true,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });
  });

  describe('TIMER_DELETE', () => {
    describe('given any state', () => {
      const state = TimerState({ active: false })();

      describe('when reducing new state from action with no id given', () => {
        const action = {
          type: TIMER_DELETE,
          payload: '',
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 90,
              duration: '00:01:00',
              durationInSeconds: 120,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: false,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });

    describe('given active timer state', () => {
      const state = TimerState({ active: true })();

      describe('when reducing new state from action with id given', () => {
        const action = {
          type: TIMER_DELETE,
          payload: '1',
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: true,
              complete: false,
              currentCount: 90,
              duration: '00:01:00',
              durationInSeconds: 120,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: true,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });

    describe('given inactive timer state', () => {
      const state = TimerState({ active: false })();

      describe('when reducing new state from action with id given', () => {
        const action = {
          type: TIMER_DELETE,
          payload: '1',
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 90,
              duration: '00:02:00',
              durationInSeconds: 120,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });
  });

  describe('TIMER_COMPLETE', () => {
    describe('given no timer state', () => {
      const state = new InitialState();

      describe('when reducing new state from action with id given', () => {
        const action = {
          type: TIMER_COMPLETE,
          payload: '1',
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            timers: [],
            superTimer: {
              duration: '00:00:00',
              durationInSeconds: 0,
              active: false,
              currentCount: null,
              elapsedTime: 0,
              complete: false,
            },
          });
        });
      });
    });

    describe('given inactive timer state', () => {
      const state = TimerState({ active: false })();

      describe('when reducing new state from action with id given', () => {
        const action = {
          type: TIMER_COMPLETE,
          payload: '1',
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 90,
              duration: '00:01:00',
              durationInSeconds: 120,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: true,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: false,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });

    describe('given active timer state', () => {
      const state = TimerState({ active: true })();

      describe('when reducing new state from action with id given', () => {
        const action = {
          type: TIMER_COMPLETE,
          payload: '1',
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: true,
              complete: false,
              currentCount: 90,
              duration: '00:01:00',
              durationInSeconds: 120,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: true,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: true,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });
  });

  describe('SUPER_TIMER_START', () => {
    describe('given no timer state', () => {
      const state = new InitialState();

      describe('when reducing new state from action', () => {
        const action = {
          type: SUPER_TIMER_START,
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            timers: [],
            superTimer: {
              duration: '00:00:00',
              durationInSeconds: 0,
              active: false,
              currentCount: null,
              elapsedTime: 0,
              complete: false,
            },
          });
        });
      });
    });

    describe('given inactive and not in progress timer state', () => {
      const state = TimerState({ active: false, inProgress: false })();

      describe('when reducing new state from action', () => {
        const action = {
          type: SUPER_TIMER_START,
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: true,
              complete: false,
              currentCount: 120,
              duration: '00:01:00',
              durationInSeconds: 120,
              elapsedTime: 0,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:01:00',
                timeToStartInSeconds: 60,
              },
              {
                active: true,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });

    describe('given active and not in progress timer state', () => {
      const state = TimerState({ active: true, inProgress: false })();

      describe('when reducing new state from action', () => {
        const action = {
          type: SUPER_TIMER_START,
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: true,
              complete: false,
              currentCount: 120,
              duration: '00:01:00',
              durationInSeconds: 120,
              elapsedTime: 0,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:01:00',
                timeToStartInSeconds: 60,
              },
              {
                active: true,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });

    describe('given active and  in progress timer state', () => {
      const state = TimerState({ active: true, inProgress: true })();

      describe('when reducing new state from action', () => {
        const action = {
          type: SUPER_TIMER_START,
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: true,
              complete: false,
              currentCount: 90,
              duration: '00:01:00',
              durationInSeconds: 120,
              elapsedTime: 30,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:30',
                timeToStartInSeconds: 30,
              },
              {
                active: true,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });
  });

  describe('SUPER_TIMER_TICK', () => {
    describe('given no timer state', () => {
      const state = new InitialState();

      describe('when reducing new state from action', () => {
        const action = {
          type: SUPER_TIMER_TICK,
          payload: {
            currentCount: 89,
          },
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            timers: [],
            superTimer: {
              duration: '00:00:00',
              durationInSeconds: 0,
              active: false,
              currentCount: null,
              elapsedTime: 0,
              complete: false,
            },
          });
        });
      });
    });

    describe('given inactive and not in progress timer state', () => {
      const state = TimerState({ active: false, inProgress: false })();

      describe('when reducing new state from action', () => {
        const action = {
          type: SUPER_TIMER_TICK,
          payload: { currentCount: 119 },
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: false,
              complete: false,
              currentCount: 120,
              duration: '00:01:00',
              durationInSeconds: 120,
              elapsedTime: 0,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:01:00',
                timeToStartInSeconds: 60,
              },
              {
                active: false,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });

    describe('given active and not in progress timer state', () => {
      const state = TimerState({ active: true, inProgress: false })();

      describe('when reducing new state from action', () => {
        const action = {
          type: SUPER_TIMER_TICK,
          payload: 119,
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: true,
              complete: false,
              currentCount: 119,
              duration: '00:01:00',
              durationInSeconds: 120,
              elapsedTime: 1,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:59',
                timeToStartInSeconds: 59,
              },
              {
                active: true,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });

    describe('given active and in progress timer state', () => {
      const state = TimerState({ active: true, inProgress: true })();

      describe('when reducing new state from action', () => {
        const action = {
          type: SUPER_TIMER_TICK,
          payload: 89,
        };
        const newState = reducer(state, action);

        it('returns correct state', () => {
          expect(newState.toJS()).toEqual({
            superTimer: {
              active: true,
              complete: false,
              currentCount: 89,
              duration: '00:01:00',
              durationInSeconds: 120,
              elapsedTime: 31,
            },
            timers: [
              {
                active: false,
                complete: false,
                duration: '00:01:00',
                durationInSeconds: 60,
                id: '1',
                timeToStart: '00:00:29',
                timeToStartInSeconds: 29,
              },
              {
                active: true,
                complete: false,
                duration: '00:02:00',
                durationInSeconds: 120,
                id: '2',
                timeToStart: '00:00:00',
                timeToStartInSeconds: 0,
              },
            ],
          });
        });
      });
    });
  });
});
