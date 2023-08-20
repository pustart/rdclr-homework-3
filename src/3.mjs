function wait(ms) {
  return new Promise((resolve, reject) => {
    if (ms < 0) {
      reject(new Error("Delay cannot be negative"));
    } else {
      setTimeout(resolve, ms);
    }
  });
}

export default wait;
