import { goto } from '$app/navigation';
import { currentUser } from '$lib/stores/user';
import { getErrorMessage } from '$lib/utils/firebaseError';
import toast from 'svelte-5-french-toast';
import { get } from 'svelte/store';

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
		toast(`${user?.displayName}님 어서오세요!`, { icon: '🙋🏻', position: 'top-right' });
		await goto(redirect);
	} else {
		setError(getErrorMessage(error));
	}
}
