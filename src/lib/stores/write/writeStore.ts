import { writable, get } from 'svelte/store';
import { renderMarkdown } from '$lib/markdown';
import type { RetrospectAnswers, RetrospectAnswersKPT } from '@/types/retrospect';
import { RETROSPECT_KPT_SECTIONS, RETROSPECT_SECTIONS } from '$lib/constants/retrospect_sections';

export const retrospectType = writable<'daily' | 'kpt'>('daily');

const emptyDailyAnswers: RetrospectAnswers = Object.fromEntries(
	RETROSPECT_SECTIONS.map((section) => [section.key, ''])
) as RetrospectAnswers;

const emptyKptAnswers: RetrospectAnswersKPT = Object.fromEntries(
	RETROSPECT_KPT_SECTIONS.map((section) => [section.key, ''])
) as RetrospectAnswersKPT;

export const title = writable('');
export const answers = writable<RetrospectAnswers | RetrospectAnswersKPT>({ ...emptyDailyAnswers });
export const previews = writable<Record<string, string>>({});

export const isMobile = writable(false);

export function resetWriteStore() {
	title.set('');
	const type = get(retrospectType);
	if (type === 'kpt') {
		answers.set({ ...emptyKptAnswers });
		previews.set({ ...emptyKptAnswers });
	} else {
		answers.set({ ...emptyDailyAnswers });
		previews.set({ ...emptyDailyAnswers });
	}
	selectedEmotions.set([]);
}
export function hydrateWriteStore(doc: {
	title: string;
	answers: RetrospectAnswers | RetrospectAnswersKPT;
	type: 'daily' | 'kpt';
}) {
	retrospectType.set(doc.type);
	title.set(doc.title);
	answers.set({ ...doc.answers });

	const renderedPreviews = Object.fromEntries(
		Object.entries(doc.answers).map(([key, value]) => [key, renderMarkdown(value as string)])
	) as Record<string, string>;
	previews.set(renderedPreviews);
}

export const selectedEmotions = writable<string[]>([]);
