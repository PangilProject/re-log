import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '$lib/firebase';
import type { PostFeedbackPayload } from '@/types/interfaces/feedback';

/**
 * Firestore에 피드백 데이터를 추가하는 함수
 */
export async function saveFeedback(data: PostFeedbackPayload) {
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

/**
 * 모든 피드백 리스트를 가져오는 함수
 */
export async function getFeedbacks() {
	try {
		const q = query(collection(db, 'feedbacks'), orderBy('createdAt', 'desc'));
		const snapshot = await getDocs(q);
		const feedbacks = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}));
		return { success: true, feedbacks };
	} catch (error) {
		console.error('피드백 리스트 조회 실패:', error);
		return { success: false, error };
	}
}
