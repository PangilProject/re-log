// src/lib/constants/passwordMessages.ts
export const PASSWORD_ERROR_MESSAGES = {
	TOO_SHORT: '비밀번호는 최소 6자 이상이어야 합니다.',
	MISSING_LETTER_OR_NUMBER: '비밀번호는 영문과 숫자를 모두 포함해야 합니다.',
	CONTAINS_SPACE: '비밀번호에는 공백을 포함할 수 없습니다.',
	TOO_SIMPLE: '너무 단순한 비밀번호입니다. 다른 비밀번호를 사용해주세요.'
} as const;
