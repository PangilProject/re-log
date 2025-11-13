import { writable } from 'svelte/store';
import { RETROSPECT_KEYS, type AnswerKey } from '$lib/constants/retrospectKeys';

const emptyAnswers = Object.fromEntries(RETROSPECT_KEYS.map((key) => [key, ''])) as Record<
	AnswerKey,
	string
>;

export const title = writable('');
export const answers = writable<Record<AnswerKey, string>>({ ...emptyAnswers });
export const previews = writable<Record<AnswerKey, string>>({ ...emptyAnswers });

export const isMobile = writable(false);

export function resetWriteStore() {
	title.set('');
	answers.set({ ...emptyAnswers });
	previews.set({ ...emptyAnswers });
	selectedEmotions.set([]);
}

export function hydrateWriteStore(doc: { title: string; answers: Record<AnswerKey, string> }) {
	title.set(doc.title);
	answers.set({ ...doc.answers });
	previews.set({ ...doc.answers });
}

export const selectedEmotions = writable<string[]>([]);
