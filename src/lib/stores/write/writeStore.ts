import { writable } from 'svelte/store';
import { RETROSPECT_KEYS, type AnswerKey } from '$lib/constants/retrospectKeys';
import { renderMarkdown } from '$lib/markdown';

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

	const renderedPreviews = Object.fromEntries(
		Object.entries(doc.answers).map(([key, value]) => [key, renderMarkdown(value)])
	) as Record<AnswerKey, string>;
	previews.set(renderedPreviews);
}

export const selectedEmotions = writable<string[]>([]);
