import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const load = async ({ url }) => {
	if (typeof window === 'undefined') return {};

	const currentPath = url.pathname;

	const user = await new Promise((resolve) => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			unsubscribe();
			resolve(user);
		});
	});

	const isSharePage = currentPath.startsWith('/share');
	const isFeedbackPage = currentPath.startsWith('/feedback');

	if (user) {
		if (isSharePage || isFeedbackPage)
			return {
				isLoggedIn: true
			};

		throw redirect(307, '/list');
	}

	if (isSharePage || isFeedbackPage) return {};

	return {};
};
