// src/routes/(private)/+layout.ts
import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const load = async () => {
	if (typeof window === 'undefined') {
		return {};
	}

	const user = await new Promise((resolve) => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			unsubscribe();
			resolve(user);
		});
	});

	if (!user) {
		throw redirect(307, '/login');
	}

	// Firebase의 User 객체는 순수한 JSON이 아니므로, 필요한 데이터만 추출하여 전달합니다.
	// 전체를 직렬화/역직렬화하여 순수 객체로 만드는 것도 일반적인 방법입니다.
	const plainUser = JSON.parse(JSON.stringify(user));

	return {
		user: plainUser
	};
};
