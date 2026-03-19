import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: './global-setup.ts',
  testDir: './e2e/tests',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
  },
});