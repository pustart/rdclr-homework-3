import { describe, test, expect } from "@jest/globals";
import delay from '../src/1.mjs';

describe('Delay function', () => {
  test('should wait for the specified time', () => {
    const startTime = Date.now();
    const delayTime = 3000;

    delay(delayTime);

    const endTime = Date.now();
    const elapsed = endTime - startTime;

    const errorMargin = 100;

    expect(elapsed).toBeGreaterThanOrEqual(delayTime - errorMargin);
    expect(elapsed).toBeLessThanOrEqual(delayTime + errorMargin);
  });
});
