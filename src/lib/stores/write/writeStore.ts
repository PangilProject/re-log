import { writable } from 'svelte/store';
import { RETROSPECT_KEYS, type AnswerKey } from '$lib/constants/retrospectKeys';

export const title = writable('');
export const answers = writable<Record<AnswerKey, string>>(
	Object.fromEntries(RETROSPECT_KEYS.map((key) => [key, ''])) as Record<AnswerKey, string>
);
export const previews = writable<Record<AnswerKey, string>>(
	Object.fromEntries(RETROSPECT_KEYS.map((key) => [key, ''])) as Record<AnswerKey, string>
);
