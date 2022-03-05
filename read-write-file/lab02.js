const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
  // khởi tạo một browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // điều hướng đến trang của browser đến website
  await page.goto('https://en.wikipedia.org/wiki/Node.js');

  const data = await page.$eval('*', (el) => el.innerText);
  // ...
  fs.writeFileSync('content.txt', data);
  await browser.close();
})();
