import convertSecondsToDuration from './convertSecondsToDuration';

const updateTimerOnTick = (elapsedTime, totalTime) => x => {
  const timeToStartInSeconds = Math.max(
    0,
    totalTime - x.durationInSeconds - elapsedTime,
  );
  return {
    ...x,
    timeToStartInSeconds,
    timeToStart: convertSecondsToDuration(timeToStartInSeconds),
    active: timeToStartInSeconds === 0,
  };
};

export default updateTimerOnTick;
