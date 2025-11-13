import { submitRetrospect } from '$lib/stores/write/writeActions';
import { openConfirm } from './confirm';
import { answers, title } from '$lib/stores/write/writeStore';
import { get } from 'svelte/store';
import { RETROSPECT_KEYS } from '$lib/constants/retrospectKeys';
import { errorEmptyField, errorEmptyTitle } from './toast';

export async function handleSubmitRetrospect() {
	const currentTitle = get(title).trim();
	if (!currentTitle) {
		errorEmptyTitle();
		return;
	}

	// ✅ store 값을 실제 객체로 꺼내기
	const currentAnswers = get(answers);

	// ✅ 모든 항목이 비어 있지 않은지 검사
	const allFilled = RETROSPECT_KEYS.every((key) => !!currentAnswers[key]?.trim());

	if (!allFilled) {
		errorEmptyField();
		return;
	}

	if (await openConfirm('작성하시겠습니까?')) {
		submitRetrospect();
	}
}
