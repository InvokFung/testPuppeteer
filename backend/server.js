const express = require("express");
const app = express();
const port = 8000;
const { Worker } = require("worker_threads");

app.use(express.static("public"));
app.use(express.json());

app.get("/test", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/calculate", (req, res) => {
  const { number } = req.body;
  const worker = new Worker("./worker.js");
  worker.on("message", (result) => {
    res.json({ result });
  });
  worker.on("error", (msg) => {
    console.log(msg);
  });
  worker.on("exit", () => {
    console.log("worker is exited");
  });
  worker.postMessage(number);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
