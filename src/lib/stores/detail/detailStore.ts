import type { RetrospectDocument } from '@/types/retrospect';
import { writable } from 'svelte/store';

export const detailData = writable<RetrospectDocument | null>(null);
export const isLoading = writable(true);
export const errorMessage = writable<string | null>(null);
