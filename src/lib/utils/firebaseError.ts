import type { FirebaseError } from 'firebase/app';
import { AUTH_ERROR_MESSAGES, DEFAULT_AUTH_ERROR_MESSAGE } from '$lib/constants/authErrorMessages';

export function getErrorMessage(err: unknown): string {
	if (typeof err === 'object' && err !== null && 'code' in err) {
		const firebaseErr = err as FirebaseError;
		const message = AUTH_ERROR_MESSAGES[firebaseErr.code];
		return message ?? firebaseErr.message ?? DEFAULT_AUTH_ERROR_MESSAGE;
	}

	return DEFAULT_AUTH_ERROR_MESSAGE;
}
