import all from '../src/4.mjs';

describe('.all Promise resolver', () => {
  test('resolves with an array of results in the correct order', async () => {
    const promise1 = new Promise(resolve => setTimeout(() => resolve(1), 100))
    const promise2 = new Promise(resolve => setTimeout(() => resolve(2), 200))
    const promise3 = new Promise(resolve => setTimeout(() => resolve(3), 300))

    const results = await all([promise1, promise2, promise3]);

    expect(results).toEqual([1, 2, 3]);
  });

  test('rejects with the correct error', async () => {
    const promise1 = new Promise((_, reject) => setTimeout(() => reject("Something error"), 100));
    const promise2 = new Promise(r => setTimeout(() => r(2), 200));

    await expect(all([promise1, promise2])).rejects.toEqual("Something error");
  });

  test('returns an empty array for an empty input array', async () => {
    const results = await all([]);
    expect(results).toEqual([]);
  });

  test('rejects if input is not an array', async () => {
    await expect(all(null)).rejects.toThrow('Input is not an array of promises.');
  });
});
