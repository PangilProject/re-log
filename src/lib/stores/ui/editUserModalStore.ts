import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';

export interface EditUserModalState {
	isOpen: boolean;
	user: User | null;
	resolve: (value: any | null) => void;
}

export const editUserModalStore = writable<EditUserModalState>({
	isOpen: false,
	user: null,
	resolve: () => {}
});

export function openEditUserModal(user: User): Promise<any | null> {
	return new Promise((resolve) => {
		editUserModalStore.set({
			isOpen: true,
			user,
			resolve
		});
	});
}
