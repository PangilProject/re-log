import { test, expect } from '@playwright/test';

test('navigate to login page from homepage', async ({ page }) => {
	await page.goto('/');

	// Wait for the network to be idle to ensure the SvelteKit router is fully hydrated
	await page.waitForLoadState('networkidle');

	const targetButton = page.getByRole('button', { name: '시작하기' }).last();

	// Perform the click and wait for the navigation to complete
	await Promise.all([
		page.waitForURL('**/login'),
		targetButton.click()
	]);

	await expect(page).toHaveURL('/login');
});
