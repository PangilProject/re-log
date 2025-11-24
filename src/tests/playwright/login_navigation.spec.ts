import { test, expect } from '@playwright/test';

test('navigate to login page from homepage', async ({ page }) => {
	await page.goto('/');

	await page.waitForLoadState('networkidle');

	const targetButton = page.getByRole('button', { name: '시작하기' }).last();

	await Promise.all([page.waitForURL('**/login'), targetButton.click()]);

	await expect(page).toHaveURL('/login');
});
