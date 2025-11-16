import { expect, test } from 'vitest';
import { validatePassword } from '$lib/utils/validatePassword';
import { PASSWORD_ERROR_MESSAGES } from '$lib/constants/passwordMessages';

test('returns error for password shorter than 6 characters', () => {
	expect(validatePassword('abc1')).toBe(PASSWORD_ERROR_MESSAGES.TOO_SHORT);
});

test('returns error when missing letters or numbers', () => {
	expect(validatePassword('abcdef')).toBe(PASSWORD_ERROR_MESSAGES.MISSING_LETTER_OR_NUMBER);
	expect(validatePassword('123456')).toBe(PASSWORD_ERROR_MESSAGES.MISSING_LETTER_OR_NUMBER);
});

test('returns error when password contains spaces', () => {
	expect(validatePassword('abc 123')).toBe(PASSWORD_ERROR_MESSAGES.CONTAINS_SPACE);
});

test('returns null for valid password', () => {
	expect(validatePassword('secure123')).toBeNull();
});
