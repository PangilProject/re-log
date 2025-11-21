import { goto } from '$app/navigation';

export function goToLogin() {
	goto('/login');
}

export function goToWrite() {
	goto('/write');
}

export function goToMyPage() {
	goto('/mypage');
}

export function goToList() {
	goto('/list');
}

export function goToRegister() {
	goto('/register');
}

export function goToForgotPassword() {
	goto('/forgot-password');
}

export function goToModify(docId: string) {
	goto(`/modify/${docId}`);
}
