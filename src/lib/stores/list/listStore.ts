import type { CreatedAt } from '@/types/common';
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
export const isLoading = writable(true);
export const errorMessage = writable<string | null>(null);
