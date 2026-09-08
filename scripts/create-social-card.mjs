// Render a social sharing card from the actual site font and logo.
// This is a screenshot of a small HTML layout, not a generated brand asset.
import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
const font = (await readFile('public/fonts/work-sans-variable.woff2')).toString('base64');
const logo = (await readFile('public/images/exfu-logo-light.png')).toString('base64');
const browser = await chromium.launch({ channel: 'chromium' });
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.setContent(`<!doctype html><html lang="en"><head><style>
@font-face{font-family:Work;src:url(data:font/woff2;base64,${font})}*{box-sizing:border-box}body{margin:0;background:#f5f3ee;color:#25231f;font-family:Work,Arial}main{padding:56px 68px;width:1200px;height:630px;position:relative;overflow:hidden}img{width:140px;display:block}h1{font-size:85px;line-height:.94;letter-spacing:-6px;font-weight:650;margin:54px 0 28px;position:relative;z-index:1}p{font-size:23px;margin:0;color:#625e57;letter-spacing:-.6px}aside{position:absolute;width:330px;height:330px;right:-65px;top:210px;background:#dfd8ce;border-radius:50%}.card{position:absolute;right:90px;top:155px;width:255px;height:325px;padding:25px;background:#fcfbf8;transform:rotate(10deg);box-shadow:0 20px 30px -10px #4b463e33;font-size:29px;font-weight:600;line-height:1.1;letter-spacing:-1.5px}.card b{display:block;color:#bb3826;font-size:145px;line-height:1.2;font-weight:450}.site{position:absolute;bottom:53px;right:70px;font-size:22px;color:#bb3826}
</style></head><body><main><img src="data:image/png;base64,${logo}" alt="ExFu"><h1>You see the potential.<br>Let’s make it work.</h1><p>Fractional AI support & practical delivery.</p><aside></aside><div class="card">Experienced help<br>alongside you.<b>↗</b></div><span class="site">exfu.ai</span></main></body></html>`);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/images/social-card.png' });
await browser.close();
