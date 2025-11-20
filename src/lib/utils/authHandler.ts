import { goto } from '$app/navigation';
import { currentUser } from '$lib/stores/user';
import { getErrorMessage } from '$lib/utils/firebaseError';
import { get } from 'svelte/store';
import { customWelcome } from './toast';

export async function handleAuthResult({
	success,
	error,
	setError,
	redirect = '/list'
}: {
	success: boolean;
	error?: unknown;
	setError: (msg: string | null) => void;
	redirect?: string;
}) {
	const user = get(currentUser);

	if (success) {
		const name = user?.displayName ?? '사용자';
		customWelcome(name);
		await goto(redirect);
	} else {
		setError(getErrorMessage(error));
	}
}
