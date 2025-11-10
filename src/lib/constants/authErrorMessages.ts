export const AUTH_ERROR_MESSAGES: Record<string, string> = {
	'auth/invalid-email': '이메일 형식이 올바르지 않습니다.',
	'auth/missing-password': '비밀번호를 입력해주세요.',
	'auth/weak-password': '비밀번호는 최소 6자 이상이어야 합니다.',
	'auth/email-already-in-use': '이미 사용 중인 이메일입니다.',
	'auth/invalid-credential': '존재하지 않는 아이디 또는 잘못된 비밀번호입니다.',
	'auth/wrong-password': '존재하지 않는 아이디 또는 잘못된 비밀번호입니다.',
	'auth/user-not-found': '존재하지 않는 아이디 또는 잘못된 비밀번호입니다.',
	'auth/too-many-requests': '로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.',
	'auth/user-disabled': '비활성화된 계정입니다. 관리자에게 문의하세요.'
};

export const DEFAULT_AUTH_ERROR_MESSAGE = '인증 중 오류가 발생했습니다.';
