import type { GetFeedbackPayload, PostFeedbackPayload } from '@/types/interfaces/feedback';
import { writable } from 'svelte/store';

// 피드백 모달 상태
export interface FeedbackModalState {
	isOpen: boolean;
	mode: 'write' | 'view';
	// write 모드는 PostFeedbackPayload 형태, view 모드는 GetFeedbackPayload 형태
	feedback: PostFeedbackPayload | GetFeedbackPayload | null;
}

export const feedbackModalStore = writable<FeedbackModalState>({
	isOpen: false,
	mode: 'write',
	feedback: null
});

// 내부 전용: 상태를 직접 설정하는 함수
function setFeedbackModalState(state: FeedbackModalState) {
	feedbackModalStore.set(state);
}

// 쓰기 모달 열기
export function openWriteFeedbackModal() {
	setFeedbackModalState({
		isOpen: true,
		mode: 'write',
		feedback: null
	});
}

// 조회 모달 열기
export function openViewFeedbackModal(feedback: GetFeedbackPayload) {
	setFeedbackModalState({
		isOpen: true,
		mode: 'view',
		feedback
	});
}

// 닫기 기능도 함께 제공하면 완성형
export function closeFeedbackModal() {
	setFeedbackModalState({
		isOpen: false,
		mode: 'write',
		feedback: null
	});
}
