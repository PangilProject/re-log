import type { Timestamp } from 'firebase/firestore';

/**
 * 사용자가 피드백을 제출할 때 사용하는 요청(payload) 타입입니다.
 * Firestore에 저장되기 전 단계이므로 id/createdAt 필드는 포함되지 않습니다.
 */
export interface PostFeedbackPayload {
	email: string;
	message: string;
}

/**
 * Firestore에서 읽어온 피드백 데이터의 타입입니다.
 * 문서 id 및 생성 일시(createdAt)가 포함됩니다.
 */
export interface GetFeedbackPayload {
	id: string;
	email: string;
	message: string;
	createdAt: Timestamp;
}
