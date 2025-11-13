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
	getDoc,
	updateDoc,
	setDoc,
	deleteDoc
} from 'firebase/firestore';
import { db } from '$lib/firebase';
import type { RetrospectDocument } from '$lib/types/retrospect';

export interface RetrospectData {
	title: string;
	answers: {
		today: string;
		problem: string;
		learned: string;
		tomorrow: string;
		summary: string;
	};
	selectedEmotions: string[];
}

/**
 * Firestore에 회고 데이터를 추가하는 함수
 */
export async function saveRetrospect(data: RetrospectData, userId: string) {
	try {
		const docRef = await addDoc(collection(db, 'retrospectives'), {
			...data,
			createdAt: serverTimestamp(),
			userId: userId
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

export async function getRetrospectById(docId: string): Promise<{
	success: boolean;
	id?: string;
	data?: RetrospectDocument;
	error?: unknown;
}> {
	try {
		const docRef = doc(db, 'retrospectives', docId);
		const snapshot = await getDoc(docRef);

		if (!snapshot.exists()) {
			throw new Error('해당 문서를 찾을 수 없습니다.');
		}

		return {
			success: true,
			id: snapshot.id,
			data: snapshot.data() as RetrospectDocument
		};
	} catch (error) {
		return { success: false, error };
	}
}

export async function updateRetrospect(docId: string, data: RetrospectData, userId: string) {
	try {
		const docRef = doc(db, 'retrospectives', docId);

		await updateDoc(docRef, {
			...data,
			updatedAt: serverTimestamp(),
			userId: userId
		});

		return { success: true };
	} catch (error) {
		console.error('회고 수정 실패:', error);
		return { success: false, error };
	}
}

export async function saveDraft(userId: string, draftData: RetrospectData) {
	try {
		const draftRef = doc(db, 'drafts', userId);
		await setDoc(draftRef, {
			...draftData,
			updatedAt: serverTimestamp()
		});
		return { success: true };
	} catch (error) {
		console.error('임시저장 실패:', error);
		return { success: false, error };
	}
}

export async function getDraft(userId: string): Promise<{
	success: boolean;
	data?: RetrospectDocument;
	error?: unknown;
}> {
	try {
		const draftRef = doc(db, 'drafts', userId);
		const docSnap = await getDoc(draftRef);
		if (docSnap.exists()) {
			return { success: true, data: docSnap.data() as RetrospectDocument };
		}
		return { success: true, data: undefined };
	} catch (error) {
		console.error('임시저장 불러오기 실패:', error);
		return { success: false, error };
	}
}

export async function deleteDraft(userId: string) {
	try {
		const draftRef = doc(db, 'drafts', userId);
		await deleteDoc(draftRef);
		return { success: true };
	} catch (error) {
		console.error('임시저장 삭제 실패:', error);
		return { success: false, error };
	}
}
