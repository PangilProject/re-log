import { writable, get } from 'svelte/store';
import { goto } from '$app/navigation';
import { currentUser } from '$lib/stores/user';
import { saveRetrospect } from '$lib/services/retrospectService';
import { renderMarkdown } from '$lib/markdown';

export type AnswerKey = 'today' | 'problem' | 'learned' | 'tomorrow' | 'summary';

export const title = writable('');
export const answers = writable<Record<AnswerKey, string>>({
	today: '',
	problem: '',
	learned: '',
	tomorrow: '',
	summary: ''
});

export const previews = writable<Record<AnswerKey, string>>({
	today: '',
	problem: '',
	learned: '',
	tomorrow: '',
	summary: ''
});

export function updatePreview(key: AnswerKey, value: string) {
	answers.update((a) => ({ ...a, [key]: value }));
	previews.update((p) => ({ ...p, [key]: renderMarkdown(value) }));
}

export function initPreviews() {
	const a = get(answers);
	Object.entries(a).forEach(([key, value]) => updatePreview(key as AnswerKey, value));
}

export async function submitRetrospect() {
	const t = get(title).trim();
	if (!t) {
		alert('제목을 입력해주세요.');
		return;
	}

	const user = get(currentUser);
	if (!user) {
		alert('로그인이 필요합니다.');
		return;
	}

	const userId = user.uid;
	const data = { title: t, answers: get(answers) };
	const { success, error, id } = await saveRetrospect(data, userId);

	if (success && id) {
		alert('회고가 성공적으로 저장되었습니다!');
		await goto(`/detail/${id}`);
	} else {
		console.error(error);
		alert('저장 중 오류가 발생했습니다.');
	}
}
