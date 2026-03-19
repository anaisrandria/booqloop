/* eslint-disable react-hooks/rules-of-hooks */
import { test as base, expect } from '@playwright/test';

type TestFixtures = {
  resetDb: void;
};

export const test = base.extend<TestFixtures>({
  page: async ({ page }, use) => {
    await page.setExtraHTTPHeaders({ 'X-Test-Request': 'true' });
    await use(page);
  },

  resetDb: [async ({ request }, use) => {
    await request.post('http://localhost:8000/_testing/reset', {
      headers: { 'X-Test-Request': 'true' },
    });
    await request.post('http://localhost:8000/_testing/seed', {
      headers: { 'X-Test-Request': 'true' },
    });
    await use();
  }, { auto: true }],
});

export { expect };