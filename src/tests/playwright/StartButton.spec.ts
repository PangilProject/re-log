import { test, expect } from '@playwright/test';

test.describe('StartButton 컴포넌트', () => {
	test('"시작하기" 버튼이 렌더링된다', async ({ page }) => {
		await page.goto('/');

		await page.waitForLoadState('networkidle');

		const buttons = page.getByRole('button', { name: '시작하기' });

		// Playwright에서는 count()를 직접 확인해야 함
		const count = await buttons.count();
		expect(count).toBeGreaterThan(0);
	});

	test('HeroSection의 "시작하기" 버튼 클릭 시 /login 으로 이동한다', async ({ page }) => {
		await page.goto('/');

		await page.waitForLoadState('networkidle');

		const visibleButton = page.getByRole('button', { name: '시작하기', exact: true }).first();

		await Promise.all([page.waitForURL('**/login'), visibleButton.click()]);

		await expect(page).toHaveURL('/login');
	});
});
