import { writable, derived } from 'svelte/store';
import { retrospectsData } from './listStore';

export const searchQuery = writable('');
export const sortOrder = writable<'asc' | 'desc'>('desc');

export const filteredRetrospects = derived(
	[retrospectsData, searchQuery, sortOrder],
	([$data, $query, $order]) => {
		let filtered = $data;

		if ($query.trim()) {
			const lower = $query.toLowerCase();

			filtered = filtered.filter((item) => {
				// 제목 검색
				const inTitle = item.title.toLowerCase().includes(lower);

				// answers 검색 (RetrospectAnswers 또는 KPT 모두 처리)
				const answersValues = Object.values(item.answers ?? {}).map((v) => String(v).toLowerCase());
				const inAnswers = answersValues.some((val) => val.includes(lower));

				return inTitle || inAnswers;
			});
		}

		// 날짜 정렬
		filtered = filtered.sort((a, b) => {
			const timeA = a.createdAt?.seconds ?? 0;
			const timeB = b.createdAt?.seconds ?? 0;
			return $order === 'asc' ? timeA - timeB : timeB - timeA;
		});

		return filtered;
	}
);
