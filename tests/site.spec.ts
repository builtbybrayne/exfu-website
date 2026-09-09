import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync, existsSync } from 'node:fs';
const routes = [
  '/',
  '/fractional-support/',
  '/personal-support/',
  '/about/',
  '/tools/',
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
      const url = new URL(href, 'http://127.0.0.1:4391');
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
  await expect(page.locator('#quiz-progress')).toHaveText('Question 2 of 3');
  await expect(page.getByLabel('AI across my business', { exact: false })).toBeChecked();
  await page.getByRole('button', { name: /Next question/ }).click();
  await expect(page.getByRole('alert')).toContainText('Choose at least one');
  await page.getByLabel('Making the case to others', { exact: true }).check();
  await page.getByRole('button', { name: /Next question/ }).click();
  await page.getByRole('button', { name: 'Back', exact: true }).click();
  await expect(page.getByLabel('Making the case to others', { exact: true })).toBeChecked();
  await page.getByRole('button', { name: /Next question/ }).click();
  await page.getByLabel('I have an opportunity in mind', { exact: true }).check();
  await page.getByRole('button', { name: /See my starting point/ }).click();
  await expect(page.locator('#support')).toHaveValue('Fractional AI support');
  await expect(page.locator('#message')).toHaveValue(/making the case to others/);
  await expect(page.locator('#enquiry-form')).toBeHidden();
  await page.locator('#discuss-plan').click();
  await page.locator('#message').fill('My own edited brief. Please keep this.');
  await page.locator('#back-to-plan').click();
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
          `http://127.0.0.1:4391${url.pathname}${url.search}`,
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
  await page.goto('http://127.0.0.1:4391/enquire/?quiz=1');
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  const form = page.locator('#enquiry-form');
  await expect(form).toBeVisible();
  await expect(form).toHaveAttribute('method', 'POST');
  await expect(form).toHaveAttribute('action', '/thanks/');
  await expect(page.locator('#email')).toHaveAttribute('required', '');
  await page.goto('http://127.0.0.1:4391/fractional-support/');
  await expect(page.locator('#what-we-can-do')).toContainText('MCP servers');
  await expect(page.locator('.faqs details')).toHaveCount(0);
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

test('multiple answers produce an ungated plan with all relevant support options', async ({
  page,
}) => {
  await page.goto('/enquire/?quiz=1');
  for (const value of ['business', 'project', 'personal'])
    await page.locator(`input[value="${value}"]`).check();
  await page.locator('#quiz-next').click();
  await page.getByLabel('Making the case to others', { exact: true }).check();
  await page.getByLabel('Time or experience to build it', { exact: true }).check();
  await page.locator('#quiz-next').click();
  await page.getByLabel('Ready to bring in help', { exact: true }).check();
  await page.locator('#quiz-next').click();
  await expect(page.locator('#result-title')).toHaveText('Make one opportunity easy to assess.');
  await expect(page.locator('#result-steps')).toContainText('Remove one build uncertainty');
  await expect(page.locator('#result-offers article')).toHaveCount(3);
  await expect(page.locator('#email')).toBeHidden();
  await page.evaluate(() =>
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: async () => {
          throw new Error('denied');
        },
      },
    }),
  );
  await page.locator('#copy-plan').click();
  await expect(page.locator('#copy-fallback')).toBeVisible();
  await expect(page.locator('#copy-fallback')).toHaveValue(/Write a one-page case/);
});
test('avatar ring includes all portraits and supports paused keyboard rotation', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const ring = page.locator('.role-ring');
  await expect(page.locator('.role-card')).toHaveCount(12);
  await ring.scrollIntoViewIfNeeded();
  const before = await ring.getAttribute('data-angle');
  await ring.focus();
  await page.keyboard.press('ArrowRight');
  await expect(ring).not.toHaveAttribute('data-angle', before!);
  for (const src of await page
    .locator('.role-card img')
    .evaluateAll((images) => images.map((img) => img.getAttribute('src')!)))
    expect(existsSync(`public${src}`)).toBeTruthy();
});

test('each persona cycles portraits and the pause control stops the cycle', async ({ page }) => {
  await page.goto('/');
  const ring = page.locator('.role-ring');
  await ring.scrollIntoViewIfNeeded();
  await ring.hover();
  const portrait = page.locator('.role-card').first().locator('img.is-current');
  const first = await portrait.getAttribute('src');
  await expect(portrait).not.toHaveAttribute('src', first!, { timeout: 8000 });
  await page.locator('[data-ring-pause]').click();
  const paused = await portrait.getAttribute('src');
  await page.waitForTimeout(5500);
  await expect(portrait).toHaveAttribute('src', paused!);
});
test('setup commands copy exact text and FAQs are permanently visible', async ({ page }) => {
  await page.goto('/tools/');
  await page.getByRole('radio', { name: 'Claude Code', exact: true }).check();
  await page.evaluate(() =>
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: async (text: string) => {
          (window as any).copied = text;
        },
      },
    }),
  );
  await page
    .getByRole('button', { name: 'Copy Agent Library install command', exact: true })
    .click();
  expect(await page.evaluate(() => (window as any).copied)).toBe(
    'claude plugin install exfu-agent-library-solo@exfu-marketplace',
  );
  for (const route of ['/fractional-support/', '/personal-support/']) {
    await page.goto(route);
    await expect(page.locator('.faqs details')).toHaveCount(0);
    for (const answer of await page.locator('.faq-answer p').all())
      await expect(answer).toBeVisible();
  }
});

test('persona details open as an accessible modal and as full cards without moving the fan anchor', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const ring = page.locator('.role-ring');
  await ring.scrollIntoViewIfNeeded();
  await ring.evaluate((el) => (el.scrollLeft = 180));
  expect(await ring.evaluate((el) => el.scrollLeft)).toBe(0);
  const card = page.locator('.role-card[data-role="ceo"]');
  await card.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog')).toContainText(
    'Will this turn into another strategy deck?',
  );
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
      .violations,
  ).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(card).toBeFocused();
  expect(await ring.evaluate((el) => el.scrollLeft)).toBe(0);
  await page.locator('#show-roles').click();
  await expect(page.locator('#role-directory')).toBeVisible();
  await expect(page.locator('#role-directory article')).toHaveCount(12);
  for (const detail of await page.locator('#role-directory .role-reassurance').all())
    await expect(detail).toBeVisible();
  await page.setViewportSize({ width: 320, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});
test('needs buttons skip known question and general quiz keeps it', async ({ page }) => {
  for (const need of ['business', 'project', 'personal']) {
    await page.goto('/');
    await page.locator(`.needs-links a[href$="need=${need}"]`).click();
    await expect(page.locator('#quiz-progress')).toHaveText('Question 2 of 3');
    await page.locator('#quiz-back').click();
    await expect(page.locator(`input[name="quiz-need"][value="${need}"]`)).toBeChecked();
  }
  await page.goto('/');
  await page.locator('.quiz-general').click();
  await expect(page.locator('#quiz-progress')).toHaveText('Question 1 of 3');
});
test('plugin selection updates installation, copied text and first-session guidance', async ({
  page,
}) => {
  await page.goto('/tools/');
  await page.getByRole('radio', { name: 'Claude Code', exact: true }).check();
  await page.evaluate(() =>
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: async (text: string) => {
          (window as any).copied = text;
        },
      },
    }),
  );
  for (const pkg of [
    'exfu-agent-plan-visualiser',
    'exfu-humane-agents',
    'exfu-agent-planning-and-delegating',
    'exfu-agent-library-solo',
  ]) {
    await page.selectOption('#plugin-choice', pkg);
    await expect(page.locator('#selected-plugin-name')).toHaveText(pkg);
    await expect(page.locator('#selected-slash code')).toHaveText(
      `/plugin install ${pkg}@exfu-marketplace`,
    );
    await expect(page.locator(`[data-plugin-first="${pkg}"]`)).toBeVisible();
    await expect(page.locator('[data-plugin-first]:visible')).toHaveCount(1);
    await page.locator('#selected-terminal button').click();
    expect(await page.evaluate(() => (window as any).copied)).toContain(
      `install ${pkg}@exfu-marketplace`,
    );
  }
});

test('agent handoff is copyable and the structured map has real local destinations', async ({
  page,
  request,
}) => {
  await page.goto('/');
  await page.evaluate(() =>
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: async (text: string) => {
          (window as any).copied = text;
        },
      },
    }),
  );
  await page.getByRole('button', { name: 'Copy agent fit prompt' }).click();
  expect(await page.evaluate(() => (window as any).copied)).toContain('independent assessment');
  expect(await page.evaluate(() => (window as any).copied)).toContain('not a booking API');
  const data = await (await request.get('/agent-info.json')).json();
  expect(data.contact.booking_api).toBeNull();
  for (const entry of data.pages.filter((entry: any) => entry.kind === 'content'))
    expect((await request.get(new URL(entry.url).pathname)).ok()).toBeTruthy();
  await expect(page.locator('.tools-section pre')).toHaveCount(0);
  await expect(page.locator('.tools-section .more-tools')).toContainText('And more');
});
test('tools catalogue selects the correct plugin and sidebar stays available', async ({ page }) => {
  await page.goto('/tools/');
  await page.locator('[data-choose-plugin="exfu-humane-agents"]').click();
  await expect(page.locator('#plugin-choice')).toHaveValue('exfu-humane-agents');
  await expect(page.locator('#selected-tool-title')).toHaveText('Install Humane agents.');
  await expect(page.locator('#selected-terminal code')).not.toContainText('marketplace add');
  await page.locator('#first-session').scrollIntoViewIfNeeded();
  await expect(page.getByRole('navigation', { name: 'Tools page sections' })).toBeInViewport();
  await page.locator('#troubleshooting').scrollIntoViewIfNeeded();
  await expect(page.locator('.tools-sidebar a[href="#troubleshooting"]')).toHaveAttribute(
    'aria-current',
    'location',
  );
});

test('app selection filters every setup step, preserves plugin choice and supports keyboard switching', async ({
  page,
}) => {
  await page.goto('/tools/');
  const cowork = page.getByRole('radio', { name: 'Cowork', exact: true });
  const code = page.getByRole('radio', { name: 'Claude Code', exact: true });
  await expect(cowork).toBeChecked();
  await expect(page.locator('[data-setup-app="code"]:visible')).toHaveCount(0);
  await page.locator('[data-choose-plugin="exfu-humane-agents"]').click();
  await page.getByRole('link', { name: 'Change app', exact: true }).click();
  await expect(cowork).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(code).toBeChecked();
  await expect(page.locator('[data-setup-app="cowork"]:visible')).toHaveCount(0);
  await expect(page.locator('[data-setup-app="code"]:visible')).toHaveCount(2);
  await expect(page.locator('#plugin-choice')).toHaveValue('exfu-humane-agents');
  await expect(page.locator('#selected-terminal code')).toContainText(
    'exfu-humane-agents@exfu-marketplace',
  );
  await expect(page.locator('#app-selection-status')).toContainText('Claude Code');
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
      .violations,
  ).toEqual([]);
  await cowork.check();
  await expect(page.locator('[data-setup-app="cowork"]:visible')).toHaveCount(2);
  await expect(page.locator('#plugin-choice')).toHaveValue('exfu-humane-agents');
});

test('without JavaScript both app instructions and narrative content remain readable', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4391/tools/');
  await expect(page.locator('.app-picker')).toBeHidden();
  await expect(page.locator('[data-setup-app]:visible')).toHaveCount(4);
  for (const route of ['/fractional-support/', '/personal-support/']) {
    await page.goto(`http://127.0.0.1:4391${route}`);
    await expect(page.locator('.narrative-image')).toBeVisible();
    const img = page.locator('.narrative-image img');
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0))
      .toBeTruthy();
    await expect(page.locator('.faq-answer')).not.toHaveCount(0);
  }
  await context.close();
});
