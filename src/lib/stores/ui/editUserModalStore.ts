import { writable } from 'svelte/store';
import type { UserDoc } from '@/types/interfaces/user';

export interface EditUserModalState {
	isOpen: boolean;
	user: UserDoc | null;
	resolve: (value: EditUserResult | null) => void;
}

export type EditUserResult = {
	displayName?: string;
	email?: string;
	photoURL?: string;
} | null;

export const editUserModalStore = writable<EditUserModalState>({
	isOpen: false,
	user: null,
	resolve: () => {}
});

export function openEditUserModal(user: UserDoc): Promise<EditUserResult> {
	return new Promise((resolve) => {
		editUserModalStore.set({
			isOpen: true,
			user,
			resolve
		});
	});
}
