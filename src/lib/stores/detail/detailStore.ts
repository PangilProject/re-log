import { writable } from 'svelte/store';

export const detailData = writable<any>(null);
export const isLoading = writable(true);
export const errorMessage = writable<string | null>(null);
