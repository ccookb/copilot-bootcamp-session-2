const { defineConfig, devices } = require('@playwright/test');

const FRONTEND_PORT = process.env.FRONTEND_PORT || process.env.PORT || 3000;
const BACKEND_PORT = process.env.BACKEND_PORT || 3030;

module.exports = defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  retries: 0,
  fullyParallel: false,
  use: {
    baseURL: `http://127.0.0.1:${FRONTEND_PORT}`,
    trace: 'on-first-retry',
  },
  webServer: [
    {
      command: `PORT=${BACKEND_PORT} npm run start:backend`,
      port: BACKEND_PORT,
      reuseExistingServer: true,
    },
    {
      command: `PORT=${FRONTEND_PORT} npm run start:frontend`,
      port: Number(FRONTEND_PORT),
      reuseExistingServer: true,
    },
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
