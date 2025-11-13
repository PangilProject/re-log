import { currentUser } from '$lib/stores/user';
import { getRetrospectListByUser } from '$lib/services/retrospectService';
import { get } from 'svelte/store';
import { errorMessage, isLoading, retrospectsData } from './listStore';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '$lib/firebase';
import { errorDeleteRetrospect } from '$lib/utils/toast';
import { goToList } from '$lib/utils/navigation';

export async function loadRetrospects() {
	isLoading.set(true);
	errorMessage.set(null);

	try {
		const user = get(currentUser);
		if (!user) {
			errorMessage.set('로그인이 필요합니다.');
			return;
		}

		const { success, retrospects: data, error: err } = await getRetrospectListByUser(user.uid);

		if (success) retrospectsData.set(data ?? []);
		else if (err && typeof err === 'object' && 'message' in err)
			errorMessage.set((err as { message: string }).message);
		else errorMessage.set('데이터를 불러오는 중 오류가 발생했습니다.');
	} catch (e) {
		console.error(e);
		errorMessage.set('서버 오류가 발생했습니다.');
	} finally {
		isLoading.set(false);
	}
}

export async function deleteRetrospects(ids: string[]) {
	try {
		const promises = ids.map((id) => deleteDoc(doc(db, 'retrospectives', id)));
		await Promise.all(promises);

		// 클라이언트 스토어에서도 제거
		retrospectsData.update((items) => items.filter((item) => !ids.includes(item.id)));
	} catch (err) {
		console.error('삭제 오류:', err);
		errorDeleteRetrospect();
	}
}

export async function deleteRetrospect(id: string) {
	try {
		await deleteDoc(doc(db, 'retrospectives', id));

		goToList();
	} catch (err) {
		console.error('삭제 오류:', err);
		errorDeleteRetrospect();
	}
}
