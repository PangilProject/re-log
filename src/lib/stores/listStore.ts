import { writable, get } from 'svelte/store';
import { currentUser } from '$lib/stores/user';
import { getRetrospectListByUser } from '$lib/services/retrospectService';

export const retrospects = writable<{ id: string; title: string; createdAt?: any }[]>([]);
export const loading = writable(true);
export const error = writable<string | null>(null);

export async function loadRetrospects() {
	loading.set(true);
	error.set(null);

	try {
		const user = get(currentUser);
		if (!user) {
			error.set('로그인이 필요합니다.');
			return;
		}

		const { success, retrospects: data, error: err } = await getRetrospectListByUser(user.uid);

		if (success) retrospects.set(data ?? []);
		else if (err && typeof err === 'object' && 'message' in err)
			error.set((err as { message: string }).message);
		else error.set('데이터를 불러오는 중 오류가 발생했습니다.');
	} catch (e) {
		console.error(e);
		error.set('서버 오류가 발생했습니다.');
	} finally {
		loading.set(false);
	}
}
