function all(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      reject(new Error('Input is not an array of promises.'));
      return;
    }

    if (promises.length === 0) {
      resolve([]);
      return;
    }

    const results = new Array(promises.length);
    let completedCount = 0;
    let rejected = false;


    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(result => {
          if (!rejected) {
            results[index] = result;
            completedCount++;

            if (completedCount === promises.length) {
              resolve(results);
            }
          }
        })
        .catch(error => {
          if (!rejected) {
            rejected = true;
            reject(error);
          }
        });
    });
  });
}

export default all;
