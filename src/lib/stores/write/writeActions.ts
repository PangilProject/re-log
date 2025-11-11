// src/lib/stores/write/writeActions.ts
import { get } from 'svelte/store';
import { goto } from '$app/navigation';
import { currentUser } from '$lib/stores/user';
import { saveRetrospect } from '$lib/services/retrospectService';
import { renderMarkdown } from '$lib/markdown';
import { answers, previews, title } from './writeStore';
import { RETROSPECT_MESSAGES } from '$lib/constants/retrospectMessages';
import type { AnswerKey } from '$lib/constants/retrospectKeys';
import toast from 'svelte-5-french-toast';

export function updatePreview(key: AnswerKey, value: string) {
	answers.update((currentAnswers) => ({ ...currentAnswers, [key]: value }));
	previews.update((currentPreviews) => ({ ...currentPreviews, [key]: renderMarkdown(value) }));
}

export function initPreviews() {
	const currentAnswers = get(answers);
	Object.entries(currentAnswers).forEach(([key, value]) => updatePreview(key as AnswerKey, value));
}

export async function submitRetrospect() {
	const currentTitle = get(title).trim();
	if (!currentTitle) {
		toast.error(RETROSPECT_MESSAGES.EMPTY_TITLE);
		return;
	}

	const user = get(currentUser);
	if (!user) {
		toast.error(RETROSPECT_MESSAGES.NEED_LOGIN);
		return;
	}

	const userId = user.uid;
	const retrospectData = { title: currentTitle, answers: get(answers) };
	const { success, error, id } = await saveRetrospect(retrospectData, userId);

	if (success && id) {
		toast.error(RETROSPECT_MESSAGES.SAVE_SUCCESS);
		await goto(`/detail/${id}`);
	} else {
		console.error(error);
		toast.error(RETROSPECT_MESSAGES.SAVE_ERROR);
	}
}
