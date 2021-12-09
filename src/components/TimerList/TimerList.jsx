import React from 'react';
import PropTypes from 'prop-types';

import Timer from '../Timer';
import SuperTimer from '../SuperTimer';

function TimerList(props) {
  const { timers } = props;
  return (
    <div>
      {timers.map(timer => (
        <Timer key={timer.id} timer={timer} />
      ))}
      <SuperTimer />
    </div>
  );
}

TimerList.propTypes = {
  timers: PropTypes.arrayOf(
    PropTypes.shape({
      duration: PropTypes.string.isRequired,
      durationInSeconds: PropTypes.number.isRequired,
      active: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

export default TimerList;
