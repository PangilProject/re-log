// src/lib/utils/prompt.ts
import { promptStore } from '$lib/stores/ui/promptStore';

export function openPrompt(message: string, placeholder?: string): Promise<string | null> {
	return new Promise((resolve) => {
		promptStore.set({
			message,
			placeholder,
			resolve,
			isOpen: true
		});
	});
}
