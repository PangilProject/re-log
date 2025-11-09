export function validatePassword(pw: string) {
	if (pw.length < 6) {
		return '비밀번호는 최소 6자 이상이어야 합니다.';
	}
	if (!/[A-Za-z]/.test(pw) || !/[0-9]/.test(pw)) {
		return '비밀번호는 영문과 숫자를 모두 포함해야 합니다.';
	}
	if (/\s/.test(pw)) {
		return '비밀번호에는 공백을 포함할 수 없습니다.';
	}
	if (/^(?:123456|abcdef|password)$/i.test(pw)) {
		return '너무 단순한 비밀번호입니다. 다른 비밀번호를 사용해주세요.';
	}
	return null;
}
