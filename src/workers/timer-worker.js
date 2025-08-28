// self.onmessage = is a built-in function that is called when a message is received from the main thread

let isRunning = false;
self.onmessage = function (event) {
  if (isRunning) return;
  isRunning = true;
  //message from main thread
  const state = event.data;
  const { activeTask, secondsRemaining } = state;

  const endDate = activeTask.startDate + secondsRemaining * 1000;

  console.log(new Date(endDate));

  const now = Date.now();

  let countDownSeconds = Math.ceil((endDate - now) / 1000);
  function tick() {
    self.postMessage(countDownSeconds);
    const now = Date.now();
    countDownSeconds = Math.floor((endDate - now) / 1000);

    // it will run again in 1 second
    setTimeout(tick, 1000);
  }

  tick();
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
