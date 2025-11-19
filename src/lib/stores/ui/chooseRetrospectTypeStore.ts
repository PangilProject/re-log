import { writable } from 'svelte/store';

export const chooseRetrospectTypeStore = writable<{
	message?: string;
	resolve: (value: boolean) => void;
	isOpen: boolean;
	retrospectType?: string;
}>({
	message: '',
	resolve: () => {},
	isOpen: false,
	retrospectType: ''
});
