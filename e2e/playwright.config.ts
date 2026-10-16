import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: '.',
    testMatch: '*.spec.ts',
    timeout: 60_000,
    retries: 1,
    workers: 1,
    use: {
        baseURL: process.env.E2E_BASE_URL ?? 'http://localhost:3001',
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        actionTimeout: 10_000,
        navigationTimeout: 20_000,
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    ],
});
