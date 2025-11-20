import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const type = params.type;

	if (type === 'daily' || type === 'kpt') {
		return {
			type: type as 'daily' | 'kpt'
		};
	}

	throw error(404, 'Not found');
};
