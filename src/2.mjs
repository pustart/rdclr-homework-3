function picky(ms, func, cb) {
  let startTime = Date.now();
  let result = func();

  setTimeout(() => {
    let currentTime = Date.now();
    if (currentTime - startTime <= ms + 50) {
      cb(result);
    }
  }, 0);
}

export default picky;
