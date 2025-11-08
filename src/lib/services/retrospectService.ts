// src/lib/services/retrospectService.ts
import {
	addDoc,
	collection,
	serverTimestamp,
	getDocs,
	query,
	where,
	orderBy,
	doc,
	getDoc
} from 'firebase/firestore';
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
		const docRef = await addDoc(collection(db, 'retrospectives'), {
			...data,
			createdAt: serverTimestamp(),
			userId: 'temp-userId'
		});

		return { success: true, id: docRef.id };
	} catch (error) {
		console.error('Firestore 저장 오류:', error);
		return { success: false, error };
	}
}

/**
 * 특정 사용자(userId)의 모든 회고 리스트 가져오는 함수
 */
export async function getRetrospectListByUser(userId: string) {
	try {
		const q = query(
			collection(db, 'retrospectives'),
			where('userId', '==', userId),
			orderBy('createdAt', 'desc') // 최신순 정렬
		);

		const snapshot = await getDocs(q);
		const retrospects = snapshot.docs.map((doc) => ({
			id: doc.id,
			title: doc.data().title,
			createdAt: doc.data().createdAt
		}));

		return { success: true, retrospects };
	} catch (error) {
		console.error('회고 리스트 조회 실패:', error);
		return { success: false, error };
	}
}

export async function getRetrospectById(docId: string) {
	try {
		const docRef = doc(db, 'retrospectives', docId);
		const snapshot = await getDoc(docRef);

		if (!snapshot.exists()) {
			throw new Error('해당 문서를 찾을 수 없습니다.');
		}

		return { success: true, id: snapshot.id, data: snapshot.data() };
	} catch (error) {
		console.error('회고 상세 조회 실패:', error);
		return { success: false, error };
	}
}
