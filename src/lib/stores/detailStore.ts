import { writable } from 'svelte/store';
import { getRetrospectById } from '$lib/services/retrospectService';

export const data = writable<any>(null);
export const loading = writable(true);
export const error = writable<string | null>(null);

export async function loadDetail(docId: string) {
	loading.set(true);
	error.set(null);

	try {
		const { success, data: docData, error: err } = await getRetrospectById(docId);

		if (success) {
			data.set(docData);
		} else if (err && typeof err === 'object' && 'message' in err) {
			error.set((err as { message: string }).message);
		} else {
			error.set('데이터를 불러오는 중 오류 발생');
		}
	} catch (e) {
		console.error(e);
		error.set('서버 오류가 발생했습니다.');
	} finally {
		loading.set(false);
	}
}
