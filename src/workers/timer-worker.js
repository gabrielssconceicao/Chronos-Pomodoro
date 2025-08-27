// self.onmessage = is a built-in function that is called when a message is received from the main thread
self.onmessage = function (event) {
  //message from main thread
  console.log('Worker: Message received from main script', event.data);

  self.postMessage('Olá para voce tbm!');
};
