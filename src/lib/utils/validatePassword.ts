import { PASSWORD_ERROR_MESSAGES } from '$lib/constants/passwordMessages';

export function validatePassword(pw: string) {
	if (pw.length < 6) {
		return PASSWORD_ERROR_MESSAGES.TOO_SHORT;
	}
	if (!/[A-Za-z]/.test(pw) || !/[0-9]/.test(pw)) {
		return PASSWORD_ERROR_MESSAGES.MISSING_LETTER_OR_NUMBER;
	}
	if (/\s/.test(pw)) {
		return PASSWORD_ERROR_MESSAGES.CONTAINS_SPACE;
	}
	if (/^(?:123456|abcdef|password)$/i.test(pw)) {
		return PASSWORD_ERROR_MESSAGES.TOO_SIMPLE;
	}
	return null;
}
