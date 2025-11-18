import { alertStore } from '$lib/stores/ui/alertStore';

export function openAlert(message: string): Promise<void> {
	return new Promise((resolve) => {
		alertStore.set({
			mode: 'alert',
			message,
			resolve,
			isOpen: true,
			url: undefined
		});
	});
}

export function openShareAlert(docId: string): Promise<void> {
	return new Promise((resolve) => {
		alertStore.set({
			mode: 'share',
			message: '',
			resolve,
			isOpen: true,
			url: `/share/${docId}`
		});
	});
}
