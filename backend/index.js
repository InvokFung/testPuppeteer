const express = require("express");
const cors = require("cors");
const app = express();
const port = 8081;
const { Worker } = require("worker_threads");
const { generatePdf } = require("./public/worker");
const path = require("path");
const fs = require("fs");

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/abc", (req, res) => {
  res.send("Hello World ABC");
});

app.get("/test", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/check", async (req, res) => {
  try {
    const pdfBuffer = await generatePdf();

    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=test.pdf",
      "Content-Length": pdfBuffer.length,
    });
    res.end(pdfBuffer);
    // fs.writeFile(filePath, pdfBuffer, (err) => {
    //   if (err) {
    //     console.error("Error writing PDF to file:", err);
    //     res.status(500).send("Error generating PDF");
    //   } else {
    //     res.send("PDF generated and saved as example.pdf");
    //   }
    // });
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
});

app.post("/calculate", async (req, res) => {
  const { number } = req.body;
  const test = await generatePdf();
  res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=test.pdf",
    "Content-Length": test.length,
  });
  res.end(test);

  // const worker = new Worker(__dirname + "/public/worker.js");
  // worker.on("message", (result) => {
  //   // res.json({ result });
  //   if (result) {
  //     res.setHeader("Content-Type", "application/pdf");
  //     res.setHeader("Content-Disposition", 'inline; filename="output.pdf"');
  //     res.send(result);
  //   } else {
  //     res.status(500).send("Error generating PDF");
  //   }
  // });
  // worker.on("error", (msg) => {
  //   console.log(msg);
  // });
  // worker.on("exit", () => {
  //   console.log("worker is exited");
  // });
  // worker.postMessage(number);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// module.exports = app;
