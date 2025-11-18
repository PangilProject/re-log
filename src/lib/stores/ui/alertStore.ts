import { writable } from 'svelte/store';

export const alertStore = writable<{
	message: string;
	resolve: () => void;
	isOpen: boolean;
	mode: string;
	url?: string;
}>({
	message: '',
	resolve: () => {},
	isOpen: false,
	mode: '',
	url: undefined
});
