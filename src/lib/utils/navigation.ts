import { goto } from '$app/navigation';

export function goToLogin() {
	goto('/login');
}

export function goToWrite() {
	goto('/write');
}
