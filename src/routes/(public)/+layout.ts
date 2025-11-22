// src/routes/(public)/+layout.ts
import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const load = async ({ url }) => {
	// SSR에서는 auth 확인 불가 → 그대로 통과
	if (typeof window === 'undefined') return {};

	const currentPath = url.pathname;

	// 로그인 여부 확인
	const user = await new Promise((resolve) => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			unsubscribe();
			resolve(user);
		});
	});

	// 이미 로그인 상태인데 public 페이지 접근한 경우
	if (user) {
		// share 페이지는 예외 처리
		const isSharePage = currentPath.startsWith('/share');
		if (isSharePage)
			return {
				isLoggedIn: true
			};

		throw redirect(307, '/list');
	}

	// share 페이지는 예외 처리
	const isSharePage = currentPath.startsWith('/share');
	if (isSharePage) return {};

	return {};
};
