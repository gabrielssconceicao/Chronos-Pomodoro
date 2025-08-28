// self.onmessage = is a built-in function that is called when a message is received from the main thread
self.onmessage = function (event) {
  //message from main thread
  console.log('Worker: Message received from main script', event.data);

  self.postMessage('Olá para voce tbm!');
};

// Worker: it will run in a separate thread and will not block the main thread
// const worker = TimerWorkerManager.getInstance();

// worker.postMessage('Olá Mundo');

// // message from worker
// worker.onmessage((event) => {
//   console.log('Principal: Message received from worker', event.data);
// });
// worker.onmessage = function (event) {
//   console.log('Principal: Message received from main script', event.data);
// };
