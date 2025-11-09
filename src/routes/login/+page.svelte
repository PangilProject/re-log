<script lang="ts">
	import { loginWithEmail, loginWithGoogle } from '$lib/services/userService';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let error: string | null = null;
	let loading = false;

	// ✅ Firebase 에러 코드별 사용자 메시지 매핑 함수
	function getErrorMessage(err: any): string {
		const code = err?.code ?? '';
		switch (code) {
			case 'auth/invalid-email':
				return '이메일 형식이 올바르지 않습니다.';
			case 'auth/missing-password':
				return '비밀번호를 입력해주세요.';
			case 'auth/invalid-credential':
			case 'auth/wrong-password':
			case 'auth/user-not-found':
				return '존재하지 않는 아이디 또는 잘못된 비밀번호입니다.';
			case 'auth/too-many-requests':
				return '로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.';
			case 'auth/user-disabled':
				return '비활성화된 계정입니다. 관리자에게 문의하세요.';
			default:
				return err?.message ?? '로그인 중 오류가 발생했습니다.';
		}
	}

	async function handleLogin() {
		if (!email || !password) {
			error = '이메일과 비밀번호를 입력해주세요.';
			return;
		}
		loading = true;
		const { success, error: err } = await loginWithEmail(email, password);
		loading = false;

		if (success) {
			goto('/list');
		} else {
			error = getErrorMessage(err);
		}
	}

	async function handleGoogleLogin() {
		const { success, error: err } = await loginWithGoogle();
		if (success) {
			goto('/list');
		} else {
			error = getErrorMessage(err);
		}
	}
</script>

<div class="auth-container">
	<h2>로그인</h2>

	{#if error}<p class="error">{error}</p>{/if}

	<input type="email" placeholder="이메일" bind:value={email} />
	<input type="password" placeholder="비밀번호" bind:value={password} />

	<button on:click={handleLogin} disabled={loading}>
		{loading ? '로그인 중...' : '로그인'}
	</button>

	<button on:click={handleGoogleLogin} class="google-btn">Google로 로그인</button>

	<p class="link">아직 회원이 아니신가요? <a href="/register">회원가입</a></p>
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
