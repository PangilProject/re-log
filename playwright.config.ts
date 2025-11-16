import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './src/tests/playwright', // 테스트 폴더
	testMatch: '**/*.spec.ts', // Playwright 테스트 파일만 명시적으로 지정
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		baseURL: 'http://localhost:5173', // SvelteKit 개발 서버 URL
		trace: 'on-first-retry'
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] }
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] }
		}
	],
	webServer: {
		command: 'npm run dev', // SvelteKit 개발 서버 시작 명령어
		url: 'http://localhost:5173',
		reuseExistingServer: !process.env.CI
	}
});
