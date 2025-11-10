import { AUTH_ERROR_MESSAGES, DEFAULT_AUTH_ERROR_MESSAGE } from '$lib/constants/authErrorMessages';

export function getErrorMessage(err: any): string {
	const code = err?.code ?? '';
	const message = AUTH_ERROR_MESSAGES[code];

	return message ?? err?.message ?? DEFAULT_AUTH_ERROR_MESSAGE;
}
