import { get, writable } from 'svelte/store';

export const selectedRetrospects = writable<string[]>([]);

export const isDeleteMode = writable(false);

export function toggleSelect(id: string) {
	selectedRetrospects.update((ids) =>
		ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
	);
}

export function clearSelection() {
	selectedRetrospects.set([]);
}

export function toggleDeleteMode() {
	isDeleteMode.update((v) => !v);
	if (!get(isDeleteMode)) clearSelection();
}
