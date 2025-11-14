import { writable } from 'svelte/store';

export const retrospectsData = writable<
	{ id: string; title: string; createdAt?: any; selectedEmotions?: string[] }[]
>([]);
export const isLoading = writable(true);
export const errorMessage = writable<string | null>(null);
