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

	const plainUser = JSON.parse(JSON.stringify(user));

	return {
		user: plainUser
	};
};
