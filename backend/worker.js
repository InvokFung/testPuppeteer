const { parentPort } = require("worker_threads");

parentPort.on("message", (msg) => {
  let result = 2 * msg;
  parentPort.postMessage(result);
});
