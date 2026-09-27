import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
    testDir: '.',
    testMatch: '*.spec.ts',
    timeout: 60000,
    retries: 1,
    workers: 1,
    use: {
        baseURL: process.env.E2E_BASE_URL ?? 'http://localhost:3001',
        headless: true,
        screenshot: 'only-on-failure',
        actionTimeout: 10000,
        navigationTimeout: 20000,
    },
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
