import { writable } from 'svelte/store';

export const confirmStore = writable<{
	message: string;
	resolve: (value: boolean) => void;
	isOpen: boolean;
}>({
	message: '',
	resolve: () => {},
	isOpen: false
});
