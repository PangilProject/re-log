// src/lib/services/retrospectService.ts
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '$lib/firebase';

export interface RetrospectData {
	title: string;
	answers: {
		today: string;
		problem: string;
		learned: string;
		tomorrow: string;
		summary: string;
	};
}

/**
 * Firestore에 회고 데이터를 추가하는 함수
 */
export async function saveRetrospect(data: RetrospectData) {
	try {
		await addDoc(collection(db, 'retrospectives'), {
			...data,
			createdAt: serverTimestamp(),
			userId: 'temp-userId'
		});
		return { success: true };
	} catch (error) {
		console.error('❌ Firestore 저장 오류:', error);
		return { success: false, error };
	}
}
