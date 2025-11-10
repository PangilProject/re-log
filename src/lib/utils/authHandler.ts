import { goto } from '$app/navigation';
import { getErrorMessage } from '$lib/utils/firebaseError';

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
	if (success) {
		await goto(redirect);
	} else {
		setError(getErrorMessage(error));
	}
}
