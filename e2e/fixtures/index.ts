/* eslint-disable react-hooks/rules-of-hooks */
import { test as base, expect } from '@playwright/test';

const API_URL = 'http://localhost:8000';

type TestFixtures = {
  resetDb: void;
};

export const test = base.extend<TestFixtures>({
page: async ({ page }, use) => {
  await page.route(`${API_URL}/**`, async (route) => {
    const headers = {
      ...route.request().headers(),
      'X-Test-Request': 'true',
    };
    await route.continue({ headers });
  });
  await use(page);
},

  resetDb: [async ({ request }, use) => {
    await request.post(`${API_URL}/_testing/reset`, {
      headers: { 'X-Test-Request': 'true' },
    });
    await request.post(`${API_URL}/_testing/seed`, {
      headers: { 'X-Test-Request': 'true' },
    });
    await use();
  }, { auto: true }],
});

export { expect };