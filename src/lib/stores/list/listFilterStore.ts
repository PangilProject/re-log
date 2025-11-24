import { writable, derived } from 'svelte/store';
import { retrospectsData, allRetrospectsData, isAllRetrospectsLoading } from './listStore';

export const searchQuery = writable('');
export const sortOrder = writable<'asc' | 'desc'>('desc');
export const selectedCategories = writable<string[]>([]);

export function resetCategories() {
	selectedCategories.set([]);
}

export const filteredRetrospects = derived(
	[
		retrospectsData,
		allRetrospectsData,
		searchQuery,
		sortOrder,
		selectedCategories,
		isAllRetrospectsLoading
	],
	([$paginatedData, $allData, $query, $order, $categories, $allDataLoading]) => {
		let filtered = $paginatedData;

		if (($query.trim() || $categories.length > 0) && $allData.length > 0) {
			filtered = $allData;
		} else if ($allDataLoading) {
			return [];
		}

		if ($categories.length > 0) {
			filtered = filtered.filter((item) => {
				const itemCategories = item.categories ?? [];
				return $categories.some((cat) => itemCategories.includes(cat));
			});
		}

		if ($query.trim()) {
			const lower = $query.toLowerCase();

			filtered = filtered.filter((item) => {
				const inTitle = item.title?.toLowerCase().includes(lower);

				const answersValues = Object.values(item.answers ?? {}).map((v) => String(v).toLowerCase());
				const inAnswers = answersValues.some((val) => val.includes(lower));

				return inTitle || inAnswers;
			});
		}

		filtered = filtered.sort((a, b) => {
			const timeA = a.createdAt?.seconds ?? 0;
			const timeB = b.createdAt?.seconds ?? 0;
			return $order === 'asc' ? timeA - timeB : timeB - timeA;
		});

		return filtered;
	}
);
