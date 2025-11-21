import { openConfirm } from './confirm';
import {
	answers,
	title,
	retrospectType,
	selectedEmotions,
	selectedCategories,
	resetWriteStore
} from '$lib/stores/write/writeStore';
import { get } from 'svelte/store';
import { RETROSPECT_KPT_SECTIONS, RETROSPECT_SECTIONS } from '$lib/constants/retrospect_sections';
import {
	errorEmptyField,
	errorEmptyTitle,
	errorNeedLogin,
	successModifyRetrospect,
	successSaveRetrospect
} from './toast';
import { page } from '$app/stores';
import { goto } from '$app/navigation';
import { deleteDraft, saveRetrospect, updateRetrospect } from '$lib/services/retrospectService';
import type {
	RetrospectAnswers,
	RetrospectAnswersKPT,
	RetrospectPayload
} from '@/types/retrospect';

async function runSubmit(mode: 'write' | 'modify', type: 'daily' | 'kpt') {
	const user = get(page).data.user;
	if (!user) {
		errorNeedLogin();
		return;
	}

	const retrospectData: RetrospectPayload = {
		type,
		title: get(title).trim(),
		answers: get(answers),
		selectedEmotions: get(selectedEmotions),
		categories: get(selectedCategories)
	};

	if (mode === 'write') {
		const { success, id } = await saveRetrospect(retrospectData, user.uid);
		if (success && id) {
			await deleteDraft(user.uid);
			resetWriteStore();
			successSaveRetrospect();
			goto(`/detail/${id}`);
		}
	} else {
		const docId = get(page).params.id;
		if (!docId) {
			console.error('수정 모드에서 문서 ID를 찾을 수 없습니다.');
			return;
		}
		const { success } = await updateRetrospect(docId, retrospectData, user.uid);
		if (success) {
			successModifyRetrospect();
			goto(`/detail/${docId}`);
		}
	}
}

export async function handleSubmitRetrospect(mode: 'write' | 'modify') {
	const currentTitle = get(title).trim();
	if (!currentTitle) {
		errorEmptyTitle();
		return;
	}

	const currentAnswers = get(answers);
	const type = get(retrospectType);

	let filledCount = 0;
	let allFilled = false;

	if (type === 'daily') {
		const keys = RETROSPECT_SECTIONS.map((s) => s.key);
		const dailyAnswers = currentAnswers as RetrospectAnswers;
		filledCount = keys.filter((key) => !!dailyAnswers[key]?.trim()).length;
		allFilled = filledCount === keys.length;
	} else if (type === 'kpt') {
		const keys = RETROSPECT_KPT_SECTIONS.map((s) => s.key);
		const kptAnswers = currentAnswers as RetrospectAnswersKPT;
		filledCount = keys.filter((key) => !!kptAnswers[key]?.trim()).length;
		allFilled = filledCount === keys.length;
	}

	const allEmpty = filledCount === 0;

	if (allEmpty) {
		errorEmptyField();
		return;
	}

	if (!allFilled) {
		const ok = await openConfirm('작성되지 않은 칸이 있습니다. 저장하시겠습니까?');
		if (!ok) return;

		await runSubmit(mode, type);
		return;
	}

	const ok = await openConfirm(
		mode === 'write' ? '회고를 등록하시겠습니까?' : '회고를 수정하시겠습니까?'
	);
	if (!ok) return;

	await runSubmit(mode, type);
}
