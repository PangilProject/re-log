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
	deleteDoc,
	limit,
	startAfter,
	type QueryDocumentSnapshot,
	type DocumentData
} from 'firebase/firestore';
import { db } from '$lib/firebase';
import type { RetrospectDocument, RetrospectPayload } from '@/types/retrospect';
import { PAGE_SIZE } from '$lib/constants/pagination';

/**
 * Firestore에 회고 데이터를 추가하는 함수
 * 새로운 회고 문서를 'retrospectives' 컬렉션에 생성하고, 서버 타임스탬프와 userId를 함께 저장한다.
 */

export async function saveRetrospect(data: RetrospectPayload, userId: string) {
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
 * 특정 사용자(userId)의 모든 회고 리스트를 가져오는 함수
 * userId로 필터링한 뒤 작성일(createdAt) 기준으로 내림차순 정렬하여 회고 목록을 반환한다.
 */
export async function getRetrospectListByUser(
	userId: string,
	lastVisible: QueryDocumentSnapshot<DocumentData> | null
) {
	try {
		const q = lastVisible
			? query(
					collection(db, 'retrospectives'),
					where('userId', '==', userId),
					orderBy('createdAt', 'desc'),
					startAfter(lastVisible),
					limit(PAGE_SIZE)
				)
			: query(
					collection(db, 'retrospectives'),
					where('userId', '==', userId),
					orderBy('createdAt', 'desc'),
					limit(PAGE_SIZE)
				);

		const snapshot = await getDocs(q);
		const retrospects = snapshot.docs.map((doc) => ({
			id: doc.id,
			title: doc.data().title,
			createdAt: doc.data().createdAt,
			selectedEmotions: doc.data().selectedEmotions,
			categories: doc.data().categories,
			answers: doc.data().answers
		}));
		const lastDoc = snapshot.docs[snapshot.docs.length - 1];
		return { success: true, retrospects, lastVisible: lastDoc };
	} catch (error) {
		console.error('회고 리스트 조회 실패:', error);
		return { success: false, error };
	}
}

/**
 * 특정 사용자(userId)의 모든 회고 리스트를 가져오는 함수 (검색용)
 * userId로 필터링한 뒤 작성일(createdAt) 기준으로 내림차순 정렬하여 회고 목록을 반환한다.
 * 이 함수는 모든 데이터를 가져오며 페이지네이션을 사용하지 않는다.
 */
export async function getAllRetrospectsByUser(userId: string) {
	try {
		const q = query(
			collection(db, 'retrospectives'),
			where('userId', '==', userId),
			orderBy('createdAt', 'desc')
		);

		const snapshot = await getDocs(q);
		const retrospects = snapshot.docs.map((doc) => ({
			id: doc.id,
			title: doc.data().title,
			createdAt: doc.data().createdAt,
			selectedEmotions: doc.data().selectedEmotions,
			categories: doc.data().categories,
			answers: doc.data().answers
		}));
		return { success: true, retrospects: retrospects as RetrospectDocument[] };
	} catch (error) {
		console.error('모든 회고 리스트 조회 실패:', error);
		return { success: false, error };
	}
}

/**
 * 회고 문서 ID(docId)를 기반으로 단일 회고 데이터를 조회하는 함수
 * 문서가 존재하지 않을 경우 에러를 반환하고, 존재할 경우 문서 ID 및 데이터를 함께 반환한다.
 */
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

/**
 * 특정 회고 문서(docId)를 업데이트하는 함수
 * 수정된 회고 데이터를 Firestore에 반영하고 updatedAt 타임스탬프를 기록한다.
 */

export async function updateRetrospect(docId: string, data: RetrospectPayload, userId: string) {
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

/**
 * 회고 작성 페이지의 임시 저장 기능을 위한 함수
 * 사용자 ID를 문서 ID로 사용해 'drafts' 컬렉션에 임시 데이터를 저장하거나 덮어쓴다.
 */
export async function saveDraft(userId: string, draftData: RetrospectPayload) {
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

/**
 * 특정 사용자의 임시저장된 회고 데이터를 불러오는 함수
 * drafts 컬렉션에서 사용자 ID 문서를 조회하여 존재하면 반환하고, 없으면 undefined를 반환한다.
 */

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

/**
 * 특정 사용자의 임시 저장 회고 데이터를 삭제하는 함수
 * drafts 컬렉션에서 사용자 ID를 문서 ID로 사용해 해당 문서를 제거한다.
 */

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

/**
 * 모든 사용자의 회고 리스트를 가져오는 관리자용 함수
 * 'retrospectives' 컬렉션 전체를 createdAt 내림차순으로 정렬하여 반환한다.
 */
export async function getAllRetrospects() {
	try {
		const q = query(collection(db, 'retrospectives'), orderBy('createdAt', 'desc'));

		const snapshot = await getDocs(q);
		const retrospects = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}));

		return { success: true, retrospects };
	} catch (error) {
		console.error('모든 회고 리스트 조회 실패:', error);
		return { success: false, error };
	}
}
