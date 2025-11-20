import { get } from 'svelte/store';
import { goto } from '$app/navigation';
import { currentUser } from '$lib/stores/user';
import { saveRetrospect, updateRetrospect, deleteDraft } from '$lib/services/retrospectService';
import { renderMarkdown } from '$lib/markdown';
import {
	answers,
	previews,
	title,
	resetWriteStore,
	selectedEmotions,
	retrospectType
} from './writeStore';
import type { AnswerKey } from '$lib/constants/retrospectKeys';
import { errorNeedLogin, successModifyRetrospect, successSaveRetrospect } from '$lib/utils/toast';
import { EMOTIONS } from '$lib/constants/emotions';
import type { RetrospectDocument } from '@/types/retrospect';

export function initializeEditorFromDoc(doc: RetrospectDocument) {
	title.set(doc.title);
	retrospectType.set(doc.type);
	answers.set(doc.answers);
	selectedEmotions.set(doc.selectedEmotions);
	initPreviews();
}

export function updatePreview(key: AnswerKey, value: string) {
	answers.update((ans) => ({ ...ans, [key]: value }));
	previews.update((pre) => ({ ...pre, [key]: renderMarkdown(value) }));
}

export function initPreviews() {
	const currentAnswers = get(answers);
	Object.entries(currentAnswers).forEach(([key, value]) => updatePreview(key as AnswerKey, value));
}

export async function submitRetrospect() {
	const user = get(currentUser);
	if (!user) {
		errorNeedLogin();
		return;
	}

	const retrospectData = {
		type: get(retrospectType),
		title: get(title),
		answers: get(answers),
		selectedEmotions: get(selectedEmotions)
	};
	const { success, id } = await saveRetrospect(retrospectData, user.uid);

	if (success) {
		await deleteDraft(user.uid);
		resetWriteStore();
		successSaveRetrospect();
		goto(`/detail/${id}`);
	}
}

export async function submitModifyRetrospect(id: string) {
	const user = get(currentUser);
	if (!user) {
		errorNeedLogin();
		return;
	}

	const retrospectData = {
		type: get(retrospectType),
		title: get(title),
		answers: get(answers),
		selectedEmotions: get(selectedEmotions)
	};
	const { success } = await updateRetrospect(id, retrospectData, user.uid);

	if (success) {
		successModifyRetrospect();
		goto(`/detail/${id}`);
	}
}

export function toggleEmotion(key: string) {
	selectedEmotions.update((list) => {
		if (list.includes(key)) {
			return list.filter((item) => item !== key);
		}
		return [...list, key];
	});
}

export function clearAllEmotions() {
	selectedEmotions.set([]);
}

export function clickAllEmotions() {
	selectedEmotions.update(() => {
		return EMOTIONS.map((emotion) => emotion.key);
	});
}

export function setSelectedEmotions(emotions: string[]) {
	selectedEmotions.set(emotions);
}
