import type { CreatedAt } from '@/types/common';
import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { writable } from 'svelte/store';

export const retrospectsData = writable<
	{
		id: string;
		title: string;
		createdAt?: CreatedAt;
		selectedEmotions?: string[];
		categories?: string[];
		answers: Record<string, string>;
	}[]
>([]);
export const isLoading = writable(false);
export const errorMessage = writable<string | null>(null);

export const lastVisibleDoc = writable<QueryDocumentSnapshot<DocumentData> | null>(null);
export const hasMoreData = writable(true);
