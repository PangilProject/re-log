<!-- src/lib/components/auth/LoginForm.svelte -->
<script lang="ts">
	import { loginWithEmail, loginWithGoogle } from '$lib/services/userService';
	import { goto } from '$app/navigation';
	import { getErrorMessage } from '$lib/utils/firebaseError';
	import LoginButton from './LoginButton.svelte';

	let email = '';
	let password = '';
	let error: string | null = null;
	let loading = false;

	async function handleLogin() {
		if (!email || !password) {
			error = '이메일과 비밀번호를 입력해주세요.';
			return;
		}
		loading = true;
		const { success, error: err } = await loginWithEmail(email, password);
		loading = false;

		if (success) goto('/list');
		else error = getErrorMessage(err);
	}

	async function handleGoogleLogin() {
		const { success, error: err } = await loginWithGoogle();
		if (success) goto('/list');
		else error = getErrorMessage(err);
	}
</script>

<div
	class="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-10 shadow-sm transition hover:shadow-md"
>
	<h2 class="mb-8 text-center text-3xl font-bold text-gray-800">로그인</h2>

	{#if error}
		<p class="mb-4 text-center text-sm font-medium text-red-500">{error}</p>
	{/if}

	<div class="flex flex-col gap-4">
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

		<LoginButton label="로그인" {loading} onClick={handleLogin} />
		<LoginButton
			label="Google로 로그인"
			color="bg-[#db4437] hover:bg-[#c23321]"
			onClick={handleGoogleLogin}
		/>
	</div>

	<p class="mt-8 text-center text-sm text-gray-600">
		아직 회원이 아니신가요?
		<a href="/register" class="font-semibold text-blue-600 hover:underline">회원가입</a>
	</p>
</div>
