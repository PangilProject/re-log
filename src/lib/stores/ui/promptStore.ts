import { writable } from 'svelte/store';
export const promptStore = writable<{
	message: string;
	placeholder?: string;
	resolve: (v: string | null) => void;
	isOpen: boolean;
}>({
	message: '',
	placeholder: '',
	resolve: () => {},
	isOpen: false
});
