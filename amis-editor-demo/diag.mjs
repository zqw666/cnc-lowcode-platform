import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu']
});
const page = await browser.newPage();
page.on('console', m => console.log('[console:' + m.type() + ']', m.text().slice(0, 300)));
page.on('pageerror', e => console.log('[pageerror]', e.message.slice(0, 500)));
page.on('requestfailed', r => console.log('[reqfail]', r.url().slice(0, 120), r.failure() && r.failure().errorText));
page.on('response', r => { if (r.status() >= 400) console.log('[http' + r.status() + ']', r.url().slice(0, 120)); });

await page.goto('http://127.0.0.1:8766/', { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise(r => setTimeout(r, 6000));

const rootLen = await page.evaluate(() => (document.getElementById('root') || { innerHTML: '' }).innerHTML.length);
console.log('[root innerHTML length]', rootLen);
const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 300));
console.log('[body text]', JSON.stringify(bodyText));
await page.screenshot({ path: 'diag.png' });
console.log('[screenshot] diag.png saved');
await browser.close();
