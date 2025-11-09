<script lang="ts">
	import { registerWithEmail, loginWithGoogle } from '$lib/services/userService';
	import { goto } from '$app/navigation';
	import { getErrorMessage } from '$lib/utils/firebaseError';
	import { validatePassword } from '$lib/utils/validatePassword';

	let name = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let error: string | null = null;
	let loading = false;

	async function handleRegister() {
		if (!name || !email || !password || !confirmPassword) {
			error = '모든 필드를 입력해주세요.';
			return;
		}

		const pwError = validatePassword(password);
		if (pwError) {
			error = pwError;
			return;
		}

		if (password !== confirmPassword) {
			error = '비밀번호가 일치하지 않습니다.';
			return;
		}

		loading = true;
		const { success, error: err } = await registerWithEmail(name, email, password);
		loading = false;

		if (success) goto('/list');
		else error = getErrorMessage(err);
	}

	async function handleGoogleRegister() {
		const { success, error: err } = await loginWithGoogle();
		if (success) goto('/list');
		else error = getErrorMessage(err);
	}
</script>

<div class="auth-container">
	<h2>회원가입</h2>

	{#if error}<p class="error">{error}</p>{/if}

	<input type="text" placeholder="이름" bind:value={name} />
	<input type="email" placeholder="이메일" bind:value={email} />
	<input type="password" placeholder="비밀번호" bind:value={password} />
	<input type="password" placeholder="비밀번호 확인" bind:value={confirmPassword} />

	<button on:click={handleRegister} disabled={loading}>
		{loading ? '가입 중...' : '회원가입'}
	</button>

	<button on:click={handleGoogleRegister} class="google-btn">Google로 회원가입</button>

	<p class="link">이미 계정이 있으신가요? <a href="/login">로그인</a></p>
</div>

<style>
	.auth-container {
		max-width: 400px;
		margin: 4rem auto;
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}
	input {
		padding: 0.8rem;
		border: 1px solid #ccc;
		border-radius: 8px;
	}
	button {
		padding: 0.8rem;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		background-color: #4a6cf7;
		color: white;
	}
	.google-btn {
		background-color: #db4437;
	}
	.error {
		color: red;
		font-size: 0.9rem;
	}
	.link {
		margin-top: 1rem;
		text-align: center;
	}
</style>
