import { writable } from 'svelte/store';
import type { RetrospectDocument } from '$lib/types/retrospect';

export interface ViewPostModalState {
	isOpen: boolean;
	post: (RetrospectDocument & { id: string; authorName?: string }) | null;
}

export const viewPostModalStore = writable<ViewPostModalState>({
	isOpen: false,
	post: null
});

export function openViewPostModal(post: RetrospectDocument & { id: string; authorName?: string }) {
	viewPostModalStore.set({
		isOpen: true,
		post
	});
}
