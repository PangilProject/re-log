import { submitModifyRetrospect, submitRetrospect } from '$lib/stores/write/writeActions';
import { openConfirm } from './confirm';
import { answers, title } from '$lib/stores/write/writeStore';
import { get } from 'svelte/store';
import { RETROSPECT_KEYS } from '$lib/constants/retrospectKeys';
import { errorEmptyField, errorEmptyTitle } from './toast';
import { page } from '$app/stores';

export async function handleSubmitRetrospect(mode: string) {
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

	if (mode === 'write') {
		if (await openConfirm('작성하시겠습니까?')) {
			submitRetrospect();
		}
	} else {
		if (await openConfirm('수정하시겠습니까?')) {
			let docId: string | undefined;

			page.subscribe(($page) => {
				docId = $page.params?.id;
			})();

			if (!docId) return; // 안전 장치

			submitModifyRetrospect(docId);
		}
	}
}
