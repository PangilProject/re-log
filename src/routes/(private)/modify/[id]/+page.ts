import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getRetrospectById } from '$lib/services/retrospectService';

export const load: PageLoad = async ({ params }) => {
	const { id } = params;
	const result = await getRetrospectById(id);

	if (result.success && result.data && result.id) {
		return {
			retrospect: { ...result.data, id: result.id }
		};
	}

	throw error(404, '회고를 찾을 수 없습니다.');
};
