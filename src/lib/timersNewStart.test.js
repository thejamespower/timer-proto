import timersNewStart from './timersNewStart';
import convertSecondsToDuration from './convertSecondsToDuration';

jest.mock('./convertSecondsToDuration');

describe('timersNewStart', () => {
  beforeAll(() => {
    convertSecondsToDuration.mockImplementation(a => a);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('given elapsedTime and x', () => {
    const elapsedTime = 100;
    const x = {
      durationInSeconds: 10,
    };

    const assertCommon = (totalTime, timeToStart) => {
      it('returns destructured x', () => {
        const run = timersNewStart(elapsedTime, totalTime)(x);
        expect(run).toEqual(expect.objectContaining({ durationInSeconds: 10 }));
      });

      it('returns property timeToStartInSeconds', () => {
        const run = timersNewStart(elapsedTime, totalTime)(x);
        expect(run).toEqual(
          expect.objectContaining({ timeToStartInSeconds: timeToStart }),
        );
      });

      it('returns property timeToStart', () => {
        const run = timersNewStart(elapsedTime, totalTime)(x);
        expect(run).toEqual(expect.objectContaining({ timeToStart }));
      });
    };

    describe('given timeToStartInSeconds != 0', () => {
      const totalTime = 200;

      assertCommon(totalTime, totalTime - x.durationInSeconds - elapsedTime);

      it('returns property active = false', () => {
        const run = timersNewStart(elapsedTime, totalTime)(x);
        expect(run).toEqual(expect.objectContaining({ active: false }));
      });
    });

    describe('given timeToStartInSeconds = 0', () => {
      const totalTime = 110;

      assertCommon(totalTime, totalTime - x.durationInSeconds - elapsedTime);

      it('returns property active = true', () => {
        const run = timersNewStart(elapsedTime, totalTime)(x);
        expect(run).toEqual(expect.objectContaining({ active: true }));
      });
    });
  });
});
