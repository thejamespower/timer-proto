import convertSecondsToDuration from './convertSecondsToDuration';

const setTimerStart = total => x => ({
  ...x,
  timeToStartInSeconds: total - x.durationInSeconds,
  timeToStart: convertSecondsToDuration(total - x.durationInSeconds),
});

export default setTimerStart;
