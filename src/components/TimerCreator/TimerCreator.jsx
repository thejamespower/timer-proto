import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import { TextField } from '@material-ui/core';
import CustomTimeField from '../TimeField';
import convertSecondsToDuration from '../../lib/convertSecondsToDuration';
import convertDurationToSeconds from '../../lib/convertDurationToSeconds';

const uuid = require('uuid/v4');

const zeroDuration = '00:00:00';

class TimerCreator extends Component {
  static propTypes = {
    createTimer: PropTypes.func.isRequired,
    createSubTimer: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      duration: zeroDuration,
      subTimers: [],
    };

    this.changeDuration = this.changeDuration.bind(this);
    this.addTimerToSuperTimer = this.addTimerToSuperTimer.bind(this);
    this.createSubTimer = this.createSubTimer.bind(this);
    this.changeSubTimerDuration = this.changeSubTimerDuration.bind(this);
    this.changeSubTimerName = this.changeSubTimerName.bind(this);
  }

  changeDuration(duration) {
    this.setState({ duration });
  }

  changeSubTimerDuration(subTimer, duration) {
    const { subTimers } = this.state;
    this.setState({
      subTimers: subTimers.map(timer =>
        timer.id === subTimer.id
          ? {
              ...timer,
              duration,
            }
          : timer,
      ),
    });
  }

  changeSubTimerName(subTimer, name) {
    const { subTimers } = this.state;
    this.setState({
      subTimers: subTimers.map(timer =>
        timer.id === subTimer.id
          ? {
              ...timer,
              name,
            }
          : timer,
      ),
    });
  }

  addTimerToSuperTimer() {
    const { createTimer, name, createSubTimer } = this.props;
    const { duration, subTimers } = this.state;

    if (duration === zeroDuration) return;

    const parentId = uuid();

    createTimer({
      duration,
      id: parentId,
      name,
    });

    subTimers.map(subTimer =>
      createSubTimer({
        duration: subTimer.duration,
        id: uuid(),
        parentId,
        name: `${subTimer.name} ${name}`,
        offset: convertSecondsToDuration(
          convertDurationToSeconds(duration) -
            convertDurationToSeconds(subTimer.duration),
        ),
      }),
    );
  }

  createSubTimer() {
    const { subTimers } = this.state;

    this.setState({
      subTimers: [
        ...subTimers,
        {
          offset: zeroDuration,
          duration: zeroDuration,
          id: uuid(),
          name: '',
        },
      ],
    });
  }

  removeSubTimer(id) {
    const { subTimers } = this.state;

    this.setState({
      subTimers: subTimers.filter(timers => timers.id !== id),
    });
  }

  render() {
    const { duration, subTimers } = this.state;

    return (
      <div>
        <CustomTimeField value={duration} onChange={this.changeDuration} />

        {subTimers.map(subTimer => (
          <div key={subTimer.id}>
            <Button
              type="button"
              onClick={() => {
                this.removeSubTimer(subTimer.id);
              }}
              style={{ marginTop: '1rem' }}
            >
              X
            </Button>
            <TextField
              style={{ width: '100%' }}
              id="item-name"
              label="Name"
              value={subTimer.name}
              onChange={event =>
                this.changeSubTimerName(subTimer, event.target.value)
              }
              margin="normal"
            />
            <CustomTimeField
              value={subTimer.duration}
              onChange={value => this.changeSubTimerDuration(subTimer, value)}
            />
          </div>
        ))}
        <Button
          type="button"
          onClick={() => {
            this.createSubTimer();
          }}
          style={{ marginTop: '1rem' }}
        >
          Do something else to it?
        </Button>

        <Button
          type="submit"
          onClick={() => {
            this.addTimerToSuperTimer();
          }}
          style={{ marginTop: '1rem' }}
        >
          Create timer
        </Button>
      </div>
    );
  }
}

export default TimerCreator;
