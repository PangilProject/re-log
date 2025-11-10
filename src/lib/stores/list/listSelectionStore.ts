import { get, writable } from 'svelte/store';

// 선택된 카드 ID 배열
export const selectedRetrospects = writable<string[]>([]);

export const isDeleteMode = writable(false);

// 선택 / 해제 토글 함수
export function toggleSelect(id: string) {
	selectedRetrospects.update((ids) =>
		ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
	);
}

// 전체 선택 해제
export function clearSelection() {
	selectedRetrospects.set([]);
}

export function toggleDeleteMode() {
	isDeleteMode.update((v) => !v);
	if (!get(isDeleteMode)) clearSelection(); // 모드 해제 시 선택 초기화
}
