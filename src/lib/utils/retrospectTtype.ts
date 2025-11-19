import { chooseRetrospectTypeStore } from '../stores/ui/chooseRetrospectTypeStore';

export function openRetrospectType(): Promise<boolean> {
	return new Promise((resolve) => {
		chooseRetrospectTypeStore.set({ resolve, isOpen: true });
	});
}
