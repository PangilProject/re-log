// src/lib/components/common/StartButton.test.ts
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';

// goToLogin을 mock 처리
vi.mock('$lib/utils/navigation', () => {
	return {
		goToLogin: vi.fn()
	};
});

// mock 이후 import (중요!)
import { goToLogin } from '$lib/utils/navigation';
import StartButton from '$lib/components/common/StartButton.svelte';

describe('StartButton 컴포넌트', () => {
	it('"시작하기" 텍스트를 가진 버튼을 렌더링한다', () => {
		render(StartButton);
		const button = screen.getByRole('button', { name: '시작하기' });
		expect(button).toBeInTheDocument();
	});

	it('버튼을 클릭하면 goToLogin이 호출된다', async () => {
		render(StartButton);
		const button = screen.getByRole('button', { name: '시작하기' });

		await fireEvent.click(button);

		expect(goToLogin).toHaveBeenCalledTimes(1);
	});
});
