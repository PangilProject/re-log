import { currentUser } from '$lib/stores/user';
import { getRetrospectListByUser, getAllRetrospectsByUser } from '$lib/services/retrospectService';
import { get } from 'svelte/store';
import {
	errorMessage,
	isLoading,
	retrospectsData,
	lastVisibleDoc,
	hasMoreData,
	allRetrospectsData,
	isAllRetrospectsLoading
} from './listStore';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '$lib/firebase';
import { errorDeleteRetrospect } from '$lib/utils/toast';
import { goToList } from '$lib/utils/navigation';
import { PAGE_SIZE } from '$lib/constants/pagination';

export async function loadRetrospects(loadMore = false) {
	if (get(isLoading) || (loadMore && !get(hasMoreData))) return;

	isLoading.set(true);
	errorMessage.set(null);

	try {
		const user = get(currentUser);
		if (!user) {
			errorMessage.set('로그인이 필요합니다.');
			return;
		}

		const lastDoc = loadMore ? get(lastVisibleDoc) : null;
		const {
			success,
			retrospects: data,
			lastVisible,
			error: err
		} = await getRetrospectListByUser(user.uid, lastDoc);

		if (success && data) {
			if (loadMore) {
				retrospectsData.update((existing) => [...existing, ...data]);
			} else {
				retrospectsData.set(data);
			}
			lastVisibleDoc.set(lastVisible);
			if (data.length < PAGE_SIZE) {
				hasMoreData.set(false);
			}
		} else if (err && typeof err === 'object' && 'message' in err) {
			errorMessage.set((err as { message: string }).message);
		} else {
			errorMessage.set('데이터를 불러오는 중 오류가 발생했습니다.');
		}
	} catch (e) {
		console.error(e);
		errorMessage.set('서버 오류가 발생했습니다.');
	} finally {
		isLoading.set(false);
	}
}

export async function loadAllRetrospects() {
    // Only load if not already loading and data is not already present
    if (get(isAllRetrospectsLoading) || get(allRetrospectsData).length > 0) return;

    isAllRetrospectsLoading.set(true);
    errorMessage.set(null); // Clear any previous error messages

    try {
        const user = get(currentUser);
        if (!user) {
            errorMessage.set('로그인이 필요합니다.');
            return;
        }

        const { success, retrospects: data, error: err } = await getAllRetrospectsByUser(user.uid);

        if (success && data) {
            allRetrospectsData.set(data);
        } else if (err && typeof err === 'object' && 'message' in err) {
            errorMessage.set((err as { message: string }).message);
        } else {
            errorMessage.set('모든 회고 데이터를 불러오는 중 오류가 발생했습니다.');
        }
    } catch (e) {
        console.error(e);
        errorMessage.set('서버 오류가 발생했습니다.');
    } finally {
        isAllRetrospectsLoading.set(false);
    }
}

export async function deleteRetrospects(ids: string[]) {
	try {
		const promises = ids.map((id) => deleteDoc(doc(db, 'retrospectives', id)));
		await Promise.all(promises);

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
