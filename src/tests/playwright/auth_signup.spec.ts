// tests/playwright/register.spec.ts
import { test, expect } from '@playwright/test';

test('사용자는 회원가입을 성공적으로 완료할 수 있다', async ({ page }) => {
	const uniqueEmail = `testUser_${Date.now()}@example.com`;

	await page.goto('/register');
	await page.waitForLoadState('networkidle');

	await page.getByRole('textbox', { name: '이름' }).fill('테스트맨');
	await page.getByRole('textbox', { name: '이메일' }).fill(uniqueEmail);
	await page.getByRole('textbox', { name: '비밀번호', exact: true }).fill('password123');
	await page.getByRole('textbox', { name: '비밀번호 확인' }).fill('password123');

	// 회원가입 버튼 → 네비게이션 대기
	await Promise.all([
		page.waitForURL('**/list'),
		page.getByRole('button', { name: '회원가입', exact: true }).click()
	]);

	await expect(page).toHaveURL('/list');
});
