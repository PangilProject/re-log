<script lang="ts">
	import { registerWithEmail, loginWithGoogle } from '$lib/services/userService';
	import { goto } from '$app/navigation';

	let name = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let error: string | null = null;
	let loading = false;

	// ✅ 비밀번호 유효성 검증 함수
	function validatePassword(pw: string) {
		if (pw.length < 6) {
			return '비밀번호는 최소 6자 이상이어야 합니다.';
		}
		if (!/[A-Za-z]/.test(pw) || !/[0-9]/.test(pw)) {
			return '비밀번호는 영문과 숫자를 모두 포함해야 합니다.';
		}
		if (/\s/.test(pw)) {
			return '비밀번호에는 공백을 포함할 수 없습니다.';
		}
		if (/^(?:123456|abcdef|password)$/i.test(pw)) {
			return '너무 단순한 비밀번호입니다. 다른 비밀번호를 사용해주세요.';
		}
		return null;
	}

	async function handleRegister() {
		// ✅ 필수 입력 검증
		if (!name || !email || !password || !confirmPassword) {
			error = '모든 필드를 입력해주세요.';
			return;
		}

		// ✅ 비밀번호 검증
		const pwError = validatePassword(password);
		if (pwError) {
			error = pwError;
			return;
		}

		// ✅ 비밀번호 일치 확인
		if (password !== confirmPassword) {
			error = '비밀번호가 일치하지 않습니다.';
			return;
		}

		loading = true;
		const { success, error: err } = await registerWithEmail(name, email, password);
		loading = false;

		if (success) {
			goto('/list');
		} else {
			// ✅ Firebase 에러코드 기반 처리
			const msg = typeof err === 'string' ? err : ((err as any)?.message ?? '회원가입 실패');
			if (msg.includes('weak-password')) {
				error = '비밀번호는 최소 6자 이상이어야 합니다.';
			} else if (msg.includes('email-already-in-use')) {
				error = '이미 사용 중인 이메일입니다.';
			} else {
				error = msg;
			}
		}
	}

	async function handleGoogleRegister() {
		const { success, error: err } = await loginWithGoogle();
		if (success) goto('/list');
		else error = (err as any)?.message ?? '구글 회원가입 실패';
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
