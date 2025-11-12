import { get } from 'svelte/store';
import { goto } from '$app/navigation';
import { currentUser } from '$lib/stores/user';
import { saveRetrospect, updateRetrospect, deleteDraft } from '$lib/services/retrospectService';
import { renderMarkdown } from '$lib/markdown';
import { answers, previews, title, resetWriteStore } from './writeStore';
import toast from 'svelte-5-french-toast';
import type { AnswerKey } from '$lib/constants/retrospectKeys';

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
		toast.error('로그인이 필요합니다.');
		return;
	}

	const retrospectData = { title: get(title), answers: get(answers) };
	const { success, id } = await saveRetrospect(retrospectData, user.uid);

	if (success) {
		await deleteDraft(user.uid);
		resetWriteStore();
		toast.success('회고가 저장되었습니다!');
		goto(`/detail/${id}`);
	}
}

export async function submitModifyRetrospect(id: string) {
	const user = get(currentUser);
	if (!user) {
		toast.error('로그인이 필요합니다.');
		return;
	}

	const retrospectData = { title: get(title), answers: get(answers) };
	const { success } = await updateRetrospect(id, retrospectData, user.uid);

	if (success) {
		toast.success('회고가 수정되었습니다!');
		goto(`/detail/${id}`);
	}
}
