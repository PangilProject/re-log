import { submitModifyRetrospect, submitRetrospect } from '$lib/stores/write/writeActions';
import { openConfirm } from './confirm';
import { answers, title } from '$lib/stores/write/writeStore';
import { get } from 'svelte/store';
import { RETROSPECT_KEYS } from '$lib/constants/retrospectKeys';
import { errorEmptyField, errorEmptyTitle } from './toast';
import { page } from '$app/stores';
import toast from 'svelte-5-french-toast';

// ✔️ 작성/수정 제출 로직을 하나로 통합
async function runSubmit(mode: string) {
	if (mode === 'write') {
		return submitRetrospect();
	}

	// 수정 모드
	let docId: string | undefined;

	page.subscribe(($page) => {
		docId = $page.params?.id;
	})();

	if (!docId) return;

	return submitModifyRetrospect(docId);
}

export async function handleSubmitRetrospect(mode: string) {
	const currentTitle = get(title).trim();
	if (!currentTitle) {
		errorEmptyTitle();
		return;
	}

	const currentAnswers = get(answers);

	// 상태 판별
	const filledCount = RETROSPECT_KEYS.filter((key) => !!currentAnswers[key]?.trim()).length;

	const allFilled = filledCount === RETROSPECT_KEYS.length;
	const allEmpty = filledCount === 0;

	// 1) 모두 비어 있음 → 작성 요구
	if (allEmpty) {
		errorEmptyField();
		return;
	}

	// 2) 일부만 비어 있음 → confirm 후 제출
	if (!allFilled) {
		const ok = await openConfirm('작성되지 않은 칸이 있습니다. 저장하시겠습니까?');
		if (!ok) return;

		await runSubmit(mode);
		return;
	}

	// 3) 모두 작성됨 → 정상 confirm 후 제출
	const ok = await openConfirm(mode === 'write' ? '작성하시겠습니까?' : '수정하시겠습니까?');
	if (!ok) return;

	await runSubmit(mode);
}
