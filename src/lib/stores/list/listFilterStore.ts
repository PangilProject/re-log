import { writable, derived } from 'svelte/store';
import { retrospectsData, allRetrospectsData, isAllRetrospectsLoading } from './listStore';

export const searchQuery = writable('');
export const sortOrder = writable<'asc' | 'desc'>('desc');
export const selectedCategories = writable<string[]>([]);

export function resetCategories() {
	selectedCategories.set([]);
}

export const filteredRetrospects = derived(
	[retrospectsData, allRetrospectsData, searchQuery, sortOrder, selectedCategories, isAllRetrospectsLoading],
	([$paginatedData, $allData, $query, $order, $categories, $allDataLoading]) => {
		let filtered = $paginatedData; // Default to paginated data

        // If search query or category filter is active AND all data is loaded, use allData
        if (($query.trim() || $categories.length > 0) && $allData.length > 0) {
            filtered = $allData; // Use full data for search and filter
        } else if ($allDataLoading) {
            // If full data is still loading, return empty to indicate no results yet from full search.
            return [];
        }

		/** 1) 카테고리 필터 적용 */
		if ($categories.length > 0) {
			filtered = filtered.filter((item) => {
				/** item.categories가 예를 들어 ["기술", "성장"] 이런 형태라고 가정 */
				const itemCategories = item.categories ?? [];
				return $categories.some((cat) => itemCategories.includes(cat));
			});
		}

		/** 2) 검색 필터 적용 */
		if ($query.trim()) {
			const lower = $query.toLowerCase();

			filtered = filtered.filter((item) => {
				const inTitle = item.title?.toLowerCase().includes(lower);

				const answersValues = Object.values(item.answers ?? {}).map((v) => String(v).toLowerCase());
				const inAnswers = answersValues.some((val) => val.includes(lower));

				return inTitle || inAnswers;
			});
		}

		/** 3) 정렬 적용 */
		filtered = filtered.sort((a, b) => {
			const timeA = a.createdAt?.seconds ?? 0;
			const timeB = b.createdAt?.seconds ?? 0;
			return $order === 'asc' ? timeA - timeB : timeB - timeA;
		});

		return filtered;
	}
);
