// 작성/수정 Form에서 사용하는 answer 구조
export type RetrospectAnswers = {
	today: string;
	problem: string;
	learned: string;
	tomorrow: string;
	summary: string;
};

// Firestore 문서의 형태 (createdAt, userId 포함)
export interface RetrospectDocument {
	type: 'daily' | 'kpt'; // 회고 종류 식별자 추가
	title: string;
	answers: RetrospectAnswers | RetrospectAnswersKPT; // Union 타입으로 변경
	userId: string;
	createdAt?: any; // Timestamp (Optional: Firestore Timestamp)
	updatedAt?: any; // Timestamp
	selectedEmotions: string[];
}

// 작성/수정 시 payload로 넘기는 타입
export interface RetrospectPayload {
	type: 'daily' | 'kpt'; // 회고 종류 식별자 추가
	title: string;
	answers: RetrospectAnswers | RetrospectAnswersKPT; // Union 타입으로 변경
	selectedEmotions: string[]; // 추가
}

export type RetrospectAnswersKPT = {
	keep: string;
	problem: string;
	try: string;
};
