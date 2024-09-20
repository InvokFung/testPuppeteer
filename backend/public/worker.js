// const { parentPort } = require("worker_threads");
const puppeteer = require("puppeteer");

async function generatePdf() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--disable-features=IsolateOrigins",
      "--disable-site-isolation-trials",
      "--autoplay-policy=user-gesture-required",
      "--disable-background-networking",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-breakpad",
      "--disable-client-side-phishing-detection",
      "--disable-component-update",
      "--disable-default-apps",
      "--disable-dev-shm-usage",
      "--disable-domain-reliability",
      "--disable-extensions",
      "--disable-features=AudioServiceOutOfProcess",
      "--disable-hang-monitor",
      "--disable-ipc-flooding-protection",
      "--disable-notifications",
      "--disable-offer-store-unmasked-wallet-cards",
      "--disable-popup-blocking",
      "--disable-print-preview",
      "--disable-prompt-on-repost",
      "--disable-renderer-backgrounding",
      "--disable-setuid-sandbox",
      "--disable-speech-api",
      "--disable-sync",
      "--hide-scrollbars",
      "--ignore-gpu-blacklist",
      "--metrics-recording-only",
      "--mute-audio",
      "--no-default-browser-check",
      "--no-first-run",
      "--no-pings",
      "--no-sandbox",
      "--no-zygote",
      "--password-store=basic",
      "--use-gl=swiftshader",
      "--use-mock-keychain",
    ],
  });
  const page = await browser.newPage();

  await page.emulateMediaType("print");
  await page.setViewport({
    width: 1600,
    height: 900,
    isLandscape: true,
  });

  const pdfContent = `
    <html>
      <body>
        <div>
          <h1>Hello, Testing!</h1>
        </div>
      </body>
    </html>
  `;
  await page.setContent(pdfContent);

  await page.setContent(pdfContent), { waitUntil: "networkidle0" };

  // Generate PDF buffer
  const pdfBuffer = await page.pdf({
    path: "example.pdf",
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    width: "1600px",
    height: "900px",
    preferCSSPageSize: true,
    printBackground: true,
  });

  await browser.close();
  return pdfBuffer;
}

// parentPort.on("message", async (msg) => {
//   let result = 2 * msg;
//   try {
//     const pdfBuffer = await generatePdf();
//     // console.log(pdfBuffer);
//     parentPort.postMessage(pdfBuffer);
//   } catch (e) {
//     console.log(e);
//     parentPort.postMessage(null);
//   }
// });

module.exports = { generatePdf };
