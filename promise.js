/* function doAsyncWork(resolve, reject) {
  if (success) {
    resolve(data);
  } else {
    reject(reason);
  }
}

let myPromise = new Promise(doAsyncWork); */

/* let myPromise = new Promise((resolve, reject) => {
  if (success) {
    resolve(data);
  } else {
    reject(reason);
  }
}); */

MethodThatReturnsPromise()
  .then((data) => console.log(data))
  .catch((error) => console.log(error))
  .finally(() => console.log("All domne")); // clean up code
