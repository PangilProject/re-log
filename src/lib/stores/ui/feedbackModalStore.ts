import { writable } from 'svelte/store';
import type { FeedbackPayload } from '$lib/services/feedbackService';

export interface FeedbackModalState {
	isOpen: boolean;
	mode: 'write' | 'view';
	feedback: FeedbackPayload | null;
}

export const feedbackModalStore = writable<FeedbackModalState>({
	isOpen: false,
	mode: 'write',
	feedback: null
});

export function openFeedbackModal(feedback: FeedbackPayload | null = null, mode: 'write' | 'view' = 'write') {
	feedbackModalStore.set({
		isOpen: true,
		mode: feedback ? 'view' : 'write',
		feedback
	});
}
