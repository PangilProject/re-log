export const TOAST_MESSAGES = {
	// 공통
	NEED_LOGIN: '로그인이 필요합니다.',
	NEED_RELOGIN: '계정을 삭제하려면 다시 로그인해야 합니다.',
	EMPTY_FIELD: '모든 항목을 작성해주세요.',
	EMPTY_PASSWORD: '비밀번호가 입력되지 않았습니다.',
	EMPTY_NAME: '이름을 입력해주세요.',
	GOODBYE: '서비스를 이용해주셔서 감사합니다.',

	// 회고 관련
	RETROSPECT_SAVED: '회고가 저장되었습니다!',
	RETROSPECT_MODIFIED: '회고가 수정되었습니다!',
	RETROSPECT_DELETED: '회고가 삭제되었습니다.',
	RETROSPECT_DELETE_ERROR: '삭제 중 오류가 발생했습니다.',
	RETROSPECT_SELECT_REQUIRED: '삭제할 회고를 선택해주세요.',
	RETROSPECT_EMPTY_ID: '유효하지 않는 회고입니다.',
	RETROSPECT_EMPTY_TITLE: '제목을 입력해주세요.',

	// 임시저장
	DRAFT_SAVED: '임시저장 되었습니다.',

	// 로그아웃
	LOGOUT_SUCCESS: '로그아웃 되었습니다.',
	LOGOUT_ERROR: '로그아웃 실패',

	// 프로필
	PROFILE_UPDATED: '프로필이 수정되었습니다!',
	PROFILE_UPDATE_ERROR: '프로필 수정 중 문제가 발생했습니다.',

	// 계정 삭제
	DELETE_ACCOUNT_ERROR: '회원 탈퇴 중 문제가 발생했습니다.',

	// 동적 메시지
	WELCOME_USER: (name: string) => `${name}님 어서오세요!`
} as const;
