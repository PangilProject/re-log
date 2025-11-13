import toast from 'svelte-5-french-toast';
import { TOAST_MESSAGES } from '$lib/constants/toastMessages';

export function successDeleteRetrospect() {
	toast.success(TOAST_MESSAGES.RETROSPECT_DELETED);
}

export function errorChoiceToast() {
	toast.error(TOAST_MESSAGES.RETROSPECT_SELECT_REQUIRED);
}

export function errorLogOut() {
	toast.error(TOAST_MESSAGES.LOGOUT_ERROR);
}

export function successLogOut() {
	toast(TOAST_MESSAGES.LOGOUT_SUCCESS, { icon: '👋' });
}

export function successDraftSave() {
	toast.success(TOAST_MESSAGES.DRAFT_SAVED);
}

export function errorNeedLogin() {
	toast.error(TOAST_MESSAGES.NEED_LOGIN);
}

export function successSaveRetrospect() {
	toast.success(TOAST_MESSAGES.RETROSPECT_SAVED);
}

export function successModifyRetrospect() {
	toast.success(TOAST_MESSAGES.RETROSPECT_MODIFIED);
}

export function errorEmptyName() {
	toast.error(TOAST_MESSAGES.EMPTY_NAME);
}

export function successModifyProfile() {
	toast.success(TOAST_MESSAGES.PROFILE_UPDATED);
}

export function errorModifyProfile() {
	toast.error(TOAST_MESSAGES.PROFILE_UPDATE_ERROR);
}

export function errorNeedReLogin() {
	toast.error(TOAST_MESSAGES.NEED_RELOGIN);
}

export function errorDeleteAccount() {
	toast.error(TOAST_MESSAGES.DELETE_ACCOUNT_ERROR);
}

export function errorEmptyPassword() {
	toast.error(TOAST_MESSAGES.EMPTY_PASSWORD);
}

export function errorEmptyField() {
	toast.error(TOAST_MESSAGES.EMPTY_FIELD);
}

export function errorDeleteRetrospect() {
	toast.error(TOAST_MESSAGES.RETROSPECT_DELETE_ERROR);
}

export function customGoodBye() {
	toast(TOAST_MESSAGES.GOODBYE, { icon: '👋' });
}

export function customWelcome(user: any) {
	toast(TOAST_MESSAGES.WELCOME_USER(user?.displayName), {
		icon: '🙋🏻',
		position: 'top-right'
	});
}

export function errorEmptyDocID() {
	toast.error(TOAST_MESSAGES.RETROSPECT_EMPTY_ID);
}
