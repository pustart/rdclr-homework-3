import wait from '../src/3.mjs';

describe('wait function', () => {
  test('should resolve after the specified time', async () => {
    const startTime = Date.now();
    const delay = 1000;
    await wait(delay);
    const endTime = Date.now();
    const timeDifference = endTime - startTime;
    expect(timeDifference).toBeGreaterThanOrEqual(delay);
  });

  test('should reject if the delay is negative', async () => {
    const delay = -500;
    await expect(wait(delay)).rejects.toThrow();
  });

  test('should resolve immediately with 0 delay', async () => {
    const startTime = Date.now();
    const delay = 0;
    await wait(delay);
    const endTime = Date.now();
    const timeDifference = endTime - startTime;
    expect(timeDifference).toBeLessThan(10);
  });

  test('should be able to chain .then() after the promise', async () => {
    const delay = 500;
    const startTime = Date.now();

    const promise = wait(delay);
    const chainedPromise = promise.then(() => {
      const endTime = Date.now();
      const timeDifference = endTime - startTime;
      expect(timeDifference).toBeGreaterThanOrEqual(delay);
    });

    await chainedPromise;
  });
});
