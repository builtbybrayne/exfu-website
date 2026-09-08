import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync, existsSync } from 'node:fs';
const routes = [
  '/',
  '/fractional-support/',
  '/personal-support/',
  '/about/',
  '/enquire/',
  '/privacy/',
  '/thanks/',
  '/404/',
];
for (const path of routes) {
  test(`${path} renders accessible content and working internal links`, async ({
    page,
    request,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
    const accessibility = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(accessibility.violations).toEqual([]);
    const links = await page
      .locator('a[href]')
      .evaluateAll((nodes) =>
        nodes.map((n) => n.getAttribute('href')!).filter((h) => h.startsWith('/')),
      );
    for (const href of [...new Set(links)]) {
      const url = new URL(href, 'http://127.0.0.1:4321');
      const response = await request.get(url.pathname);
      expect(response.ok(), href).toBeTruthy();
      if (url.hash)
        expect(await response.text(), href).toContain(
          `id="${decodeURIComponent(url.hash.slice(1))}"`,
        );
    }
    expect(errors).toEqual([]);
  });
}
for (const width of [320, 390, 768, 1024, 1440]) {
  test(`all content fits a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of routes) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      const sizes = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }));
      expect(sizes.scroll, path).toBeLessThanOrEqual(sizes.client + 1);
    }
  });
}
test('mobile menu opens with keyboard and Escape restores focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Menu' });
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link').first(),
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
});
test('quiz validates, retains back navigation, builds a brief and preserves edits', async ({
  page,
}) => {
  await page.goto('/enquire/?quiz=1&need=business');
  await expect(page.getByLabel('AI across my business', { exact: false })).toBeChecked();
  await page.getByRole('button', { name: /Next question/ }).click();
  await page.getByRole('button', { name: /Next question/ }).click();
  await expect(page.getByRole('alert')).toContainText('Choose one answer');
  await page.getByLabel('Making the case to others', { exact: true }).check();
  await page.getByRole('button', { name: /Next question/ }).click();
  await page.getByRole('button', { name: 'Back', exact: true }).click();
  await expect(page.getByLabel('Making the case to others', { exact: true })).toBeChecked();
  await page.getByRole('button', { name: /Next question/ }).click();
  await page.getByLabel('I have an opportunity in mind', { exact: true }).check();
  await page.getByRole('button', { name: /See my starting point/ }).click();
  await expect(page.locator('#support')).toHaveValue('Fractional AI support');
  await expect(page.locator('#message')).toHaveValue(/Making the case to others/);
  await page.locator('#message').fill('My own edited brief. Please keep this.');
  await page.getByRole('button', { name: 'Change my answers' }).click();
  await page.getByRole('button', { name: /Next question/ }).click();
  await page.getByRole('button', { name: /Next question/ }).click();
  await page.getByRole('button', { name: /See my starting point/ }).click();
  await expect(page.locator('#message')).toHaveValue('My own edited brief. Please keep this.');
});
test('quiz can be skipped and direct support links preselect the right enquiry', async ({
  page,
}) => {
  await page.goto('/enquire/?quiz=1&need=personal');
  await page.getByRole('button', { name: 'Skip to enquiry' }).click();
  await expect(page.locator('#enquiry-form')).toBeVisible();
  await expect(page.locator('#support')).toHaveValue('Personal AI support');
  await page.goto('/enquire/?need=project');
  await expect(page.locator('#support')).toHaveValue('A defined project');
});
test('local preview cannot falsely claim enquiry delivery', async ({ page }) => {
  await page.goto('/enquire/');
  await page.locator('#name').fill('Local Test');
  await page.locator('#email').fill('test@example.com');
  await page.locator('#message').fill('This must remain local.');
  await page.getByRole('button', { name: /Send enquiry/ }).click();
  await expect(page.getByRole('status')).toContainText('This preview cannot send');
  await expect(page.locator('#message')).toHaveValue('This must remain local.');
  await expect(page.getByRole('button', { name: /Send enquiry/ })).toBeEnabled();
});
for (const fail of [false, true]) {
  test(`production form ${fail ? 'failure preserves the brief' : 'success sends all fields and shows thanks'} with a mocked Netlify response`, async ({
    page,
  }) => {
    // A reserved test hostname exercises production submission, fully intercepted.
    // No request or enquiry is sent to an external host.
    await page.route('https://exfu.test/**', async (route) => {
      const req = route.request();
      const url = new URL(req.url());
      if (req.method() === 'POST') {
        expect(req.headers()['content-type']).toBe('application/x-www-form-urlencoded');
        const data = new URLSearchParams(req.postData()!);
        expect(data.get('form-name')).toBe('enquiry');
        expect(data.get('email')).toBe('test@example.com');
        expect(data.get('message')).toBe('A business brief & useful context.');
        expect(data.get('bot-field')).toBe('');
        await route.fulfill({ status: fail ? 503 : 200, body: fail ? 'Unavailable' : 'OK' });
      } else {
        const response = await page.request.get(
          `http://127.0.0.1:4321${url.pathname}${url.search}`,
        );
        if (url.pathname === '/enquire/') {
          // Netlify removes this marker during deployment when form detection is enabled.
          const body = (await response.text()).replace('data-netlify="true"', '');
          await route.fulfill({ response, body });
        } else await route.fulfill({ response });
      }
    });
    await page.goto('https://exfu.test/enquire/');
    await page.locator('#name').fill('Test Person');
    await page.locator('#email').fill('test@example.com');
    await page.locator('#message').fill('A business brief & useful context.');
    await page.getByRole('button', { name: /Send enquiry/ }).click();
    if (fail) {
      await expect(page.getByRole('status')).toContainText('could not confirm');
      await expect(page.locator('#message')).toHaveValue('A business brief & useful context.');
      await expect(page.getByRole('button', { name: /Send enquiry/ })).toBeEnabled();
    } else {
      await expect(page).toHaveURL('https://exfu.test/thanks/');
      await expect(page.getByRole('heading', { name: 'A good place to start.' })).toBeVisible();
    }
  });
}
test('without JavaScript the navigation, substantive content and native form remain available', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/enquire/?quiz=1');
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  const form = page.locator('#enquiry-form');
  await expect(form).toBeVisible();
  await expect(form).toHaveAttribute('method', 'POST');
  await expect(form).toHaveAttribute('action', '/thanks/');
  await expect(page.locator('#email')).toHaveAttribute('required', '');
  await page.goto('http://127.0.0.1:4321/fractional-support/');
  await expect(page.locator('#what-we-can-do')).toContainText('MCP servers');
  await page.getByText('How are scope and fees agreed?', { exact: true }).click();
  await expect(
    page.getByText('We discuss the outcome, the work involved', { exact: false }),
  ).toBeVisible();
  await context.close();
});
test('built form is discoverable by Netlify; metadata, sitemap and social assets exist', async () => {
  const html = readFileSync('dist/enquire/index.html', 'utf8');
  expect(html).toContain('data-netlify="true"');
  expect(html).toContain('netlify-honeypot="bot-field"');
  expect(html).toContain('name="form-name" value="enquiry"');
  expect(existsSync('dist/sitemap-index.xml')).toBeTruthy();
  expect(existsSync('dist/_headers')).toBeTruthy();
  expect(existsSync('dist/_redirects')).toBeTruthy();
  expect(existsSync('dist/images/social-card.png')).toBeTruthy();
  const sitemap = readFileSync('dist/sitemap-0.xml', 'utf8');
  expect(sitemap).toContain('https://exfu.ai/fractional-support/');
  expect(sitemap).not.toContain('/thanks/');
  for (const path of routes.filter((p) => p !== '/404/')) {
    const page = readFileSync(`dist${path}index.html`, 'utf8');
    expect(page).toContain(`rel="canonical" href="https://exfu.ai${path}"`);
    expect(page).toContain('application/ld+json');
  }
});

test('the mobile quiz stays accessible at every step and puts the first question in view', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/enquire/?quiz=1');
  await expect(page.locator('.enquiry-quiz-title')).toBeVisible();
  const question = page.getByText('Where would you like help?', { exact: true });
  await expect(question).toBeInViewport();
  for (const answer of ['My own workload', 'Making it work day to day', 'Already trying things']) {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
    await page.getByLabel(answer, { exact: false }).check();
    await page.locator('#quiz-next').click();
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width).toBeLessThanOrEqual(390);
  }
  await expect(page.locator('#support')).toHaveValue('Personal AI support');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});
