const { chromium } = require("playwright");

(async () => {
  const timing = {
    launchBrowser: [],
    launchContext: [],
    launchPage: [],
    close: [],
    total: [],
  };

  for (let i = 0; i < 10; i++) {
    const a = Date.now();
    const browser = await chromium.launch({ headless: false });
    timing.launchBrowser.push(Date.now() - a);

    const b = Date.now();
    const context = await browser.newContext();
    timing.launchContext.push(Date.now() - b);

    const c = Date.now();
    await context.newPage();
    timing.launchPage.push(Date.now() - c);

    const d = Date.now();
    await browser.close();
    timing.close.push(Date.now() - d);

    timing.total.push(Date.now() - a);
  }

  console.log("timing", timing);

  Object.keys(timing).forEach((key) => {
    const times = timing[key];
    console.log(`${key}: ${times.reduce((a, b) => a + b) / times.length}`);
  });
})();
