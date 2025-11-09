export function getErrorMessage(err: any): string {
	const code = err?.code ?? '';

	switch (code) {
		case 'auth/invalid-email':
			return '이메일 형식이 올바르지 않습니다.';
		case 'auth/missing-password':
			return '비밀번호를 입력해주세요.';
		case 'auth/weak-password':
			return '비밀번호는 최소 6자 이상이어야 합니다.';
		case 'auth/email-already-in-use':
			return '이미 사용 중인 이메일입니다.';
		case 'auth/invalid-credential':
		case 'auth/wrong-password':
		case 'auth/user-not-found':
			return '존재하지 않는 아이디 또는 잘못된 비밀번호입니다.';
		case 'auth/too-many-requests':
			return '로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.';
		case 'auth/user-disabled':
			return '비활성화된 계정입니다. 관리자에게 문의하세요.';
		default:
			return err?.message ?? '인증 중 오류가 발생했습니다.';
	}
}
