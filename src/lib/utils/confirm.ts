import { confirmStore } from '$lib/stores/ui/confirmStore';

export function openConfirm(message: string): Promise<boolean> {
	return new Promise((resolve) => {
		confirmStore.set({ message, resolve, isOpen: true });
	});
}
