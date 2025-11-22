import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '$lib/firebase';

export interface FeedbackPayload {
	email?: string;
	message: string;
}

/**
 * Firestore에 피드백 데이터를 추가하는 함수
 */
export async function saveFeedback(data: FeedbackPayload) {
	try {
		await addDoc(collection(db, 'feedbacks'), {
			...data,
			createdAt: serverTimestamp()
		});
		return { success: true };
	} catch (error) {
		console.error('피드백 저장 오류:', error);
		return { success: false, error };
	}
}
