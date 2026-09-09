import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
const browser = await chromium.launch({ channel: 'chromium' });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1080 },
  deviceScaleFactor: 1,
});
await mkdir('artifacts/visual', { recursive: true });
for (const [name, path] of [
  ['home', '/'],
  ['fractional', '/fractional-support/'],
  ['personal', '/personal-support/'],
  ['about', '/about/'],
  ['tools', '/tools/'],
  ['enquire', '/enquire/'],
]) {
  await page.goto(`http://127.0.0.1:4387${path}`);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      Array.from(document.images).map(async (img) => {
        img.loading = 'eager';
        await img.decode().catch(() => {});
      }),
    );
  });
  await page.screenshot({ path: `artifacts/visual/${name}-desktop.png`, fullPage: true });
}
await page.setViewportSize({ width: 390, height: 844 });
for (const [name, path] of [
  ['home', '/'],
  ['fractional', '/fractional-support/'],
  ['enquire', '/enquire/?quiz=1'],
]) {
  await page.goto(`http://127.0.0.1:4387${path}`);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      Array.from(document.images).map(async (img) => {
        img.loading = 'eager';
        await img.decode().catch(() => {});
      }),
    );
  });
  await page.screenshot({ path: `artifacts/visual/${name}-mobile.png`, fullPage: true });
}
await browser.close();
console.log('Review screenshots written to artifacts/visual/');
