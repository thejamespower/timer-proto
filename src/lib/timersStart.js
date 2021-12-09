import convertSecondsToDuration from './convertSecondsToDuration';

const timersStart = total => x => ({
  ...x,
  timeToStartInSeconds: total - x.durationInSeconds,
  timeToStart: convertSecondsToDuration(total - x.durationInSeconds),
});

export default timersStart;
