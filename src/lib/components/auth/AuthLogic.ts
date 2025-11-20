import { loginWithEmail, registerWithEmail, loginWithGoogle } from '$lib/services/userService';
import { validatePassword } from '$lib/utils/validatePassword';
import { handleAuthResult } from '$lib/utils/authHandler';

export async function handleLogin({
	email,
	password,
	setError,
	setLoading
}: {
	email: string;
	password: string;
	setError: (msg: string | null) => void;
	setLoading: (v: boolean) => void;
}) {
	if (!email || !password) {
		setError('이메일과 비밀번호를 입력해주세요.');
		return;
	}

	setLoading(true);
	const { success, error } = await loginWithEmail(email, password);
	setLoading(false);

	await handleAuthResult({ success, error, setError });
}

export async function handleRegister({
	name,
	email,
	password,
	confirmPassword,
	setError,
	setLoading
}: {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	setError: (msg: string | null) => void;
	setLoading: (v: boolean) => void;
}) {
	if (!name || !email || !password || !confirmPassword) {
		setError('모든 필드를 입력해주세요.');
		return;
	}

	const pwError = validatePassword(password);
	if (pwError) {
		setError(pwError);
		return;
	}

	if (password !== confirmPassword) {
		setError('비밀번호가 일치하지 않습니다.');
		return;
	}

	setLoading(true);
	const { success, error } = await registerWithEmail(name, email, password);
	setLoading(false);

	await handleAuthResult({ success, error, setError });
}

export async function handleGoogleAuth(
	setError: (msg: string | null) => void,
	setLoading: (v: boolean) => void
) {
	setLoading(true);
	const { success, error } = await loginWithGoogle();
	setLoading(false);
	await handleAuthResult({ success, error, setError });
}
