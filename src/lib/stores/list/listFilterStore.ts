import { writable, derived } from 'svelte/store';
import { retrospectsData } from './listStore';

export const searchQuery = writable('');
export const sortOrder = writable<'asc' | 'desc'>('desc');

export const filteredRetrospects = derived(
	[retrospectsData, searchQuery, sortOrder],
	([$data, $query, $order]) => {
		let filtered = $data;

		// 검색 필터
		if ($query.trim()) {
			const lower = $query.toLowerCase();
			filtered = filtered.filter((item) => item.title.toLowerCase().includes(lower));
		}

		// 정렬
		filtered = filtered.sort((a, b) => {
			const timeA = a.createdAt?.seconds ?? 0;
			const timeB = b.createdAt?.seconds ?? 0;
			return $order === 'asc' ? timeA - timeB : timeB - timeA;
		});

		return filtered;
	}
);
