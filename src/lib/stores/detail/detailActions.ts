import { getRetrospectById } from '$lib/services/retrospectService';
import { detailData, isLoading, errorMessage } from './detailStore';

export async function loadDetail(docId: string) {
	isLoading.set(true);
	errorMessage.set(null);

	try {
		const { success, data, error } = await getRetrospectById(docId);

		if (success && data) {
			detailData.set(data);
		} else if (error && typeof error === 'object' && 'message' in error) {
			errorMessage.set((error as { message: string }).message);
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
