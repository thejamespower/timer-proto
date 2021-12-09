import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import CustomTimeField from '../TimeField';

const uuid = require('uuid/v4');

const zeroDuration = '00:00:00';

class TimerCreator extends Component {
  static propTypes = {
    createTimer: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      duration: zeroDuration,
    };

    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleTimeChange(duration) {
    this.setState({ duration });
  }

  handleClick() {
    const { createTimer, name } = this.props;
    const { duration } = this.state;

    if (duration === zeroDuration) return;

    createTimer({
      duration,
      id: uuid(),
      name,
    });
  }

  render() {
    const { duration } = this.state;

    return (
      <div>
        <CustomTimeField value={duration} onChange={this.handleTimeChange} />
        <Button
          type="submit"
          onClick={() => {
            this.handleClick();
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
