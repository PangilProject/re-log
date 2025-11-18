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
	title: string;
	answers: RetrospectAnswers;
	userId: string;
	createdAt?: any; // Timestamp (Optional: Firestore Timestamp)
	updatedAt?: any; // Timestamp
	selectedEmotions: string[];
}

// 작성/수정 시 payload로 넘기는 타입
export interface RetrospectPayload {
	title: string;
	answers: RetrospectAnswers;
}
