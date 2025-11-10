<script lang="ts">
	import { registerWithEmail, loginWithGoogle } from '$lib/services/userService';
	import { goto } from '$app/navigation';
	import { getErrorMessage } from '$lib/utils/firebaseError';
	import { validatePassword } from '$lib/utils/validatePassword';
	import LoginButton from '$lib/components/auth/LoginButton.svelte';

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

<div
	class="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-10 shadow-sm transition hover:shadow-md"
>
	<h2 class="mb-8 text-center text-3xl font-bold text-gray-800">회원가입</h2>

	{#if error}
		<p class="mb-4 text-center text-sm font-medium text-red-500">{error}</p>
	{/if}

	<div class="flex flex-col gap-4">
		<input
			type="text"
			placeholder="이름"
			bind:value={name}
			class="rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
		/>
		<input
			type="email"
			placeholder="이메일"
			bind:value={email}
			class="rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
		/>
		<input
			type="password"
			placeholder="비밀번호"
			bind:value={password}
			class="rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
		/>
		<input
			type="password"
			placeholder="비밀번호 확인"
			bind:value={confirmPassword}
			class="rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
		/>

		<!-- ✅ 버튼 컴포넌트로 교체 -->
		<LoginButton label="회원가입" {loading} onClick={handleRegister} />

		<LoginButton
			label="Google로 회원가입"
			color="bg-[#db4437] hover:bg-[#c23321]"
			onClick={handleGoogleRegister}
		/>
	</div>

	<p class="mt-8 text-center text-sm text-gray-600">
		이미 계정이 있으신가요?
		<a href="/login" class="font-semibold text-blue-600 hover:underline">로그인</a>
	</p>
</div>
