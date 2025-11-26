import type { Timestamp } from 'firebase/firestore';
import { startOfDay, format } from 'date-fns';
import { SvelteMap } from 'svelte/reactivity';

export interface HasCreatedAt {
	createdAt: Timestamp;
}

export function groupDataByDay<T extends HasCreatedAt>(data: T[]): Map<string, number> {
	const grouped = new SvelteMap<string, number>();

	for (const item of data) {
		const day = format(startOfDay(item.createdAt.toDate()), 'yyyy-MM-dd');
		grouped.set(day, (grouped.get(day) || 0) + 1);
	}

	return new SvelteMap([...grouped.entries()].sort());
}
