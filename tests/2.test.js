import { describe, test, expect, jest } from "@jest/globals";
import picky from '../src/2.mjs';

console.log = jest.fn();

const getName = () => {
  return "Aparor";
};

async function delay(milliseconds) {
  await new Promise(resolve => setTimeout(resolve, milliseconds));
}

describe('Picky function', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    console.log.mockClear();
  });

  test('should call console.log with the expected result', () => {
    picky(5000, getName, console.log);
    jest.runAllTimers();

    expect(console.log).toHaveBeenCalledWith("Aparor");
  });

  test('should call the callback after the delay', async () => {
    picky(2000, async () => await delay(1000), () => console.log("Я закончил работу"));

    jest.advanceTimersByTime(2000);

    await Promise.resolve();

    expect(console.log).toHaveBeenCalledWith("Я закончил работу");
  });
});
