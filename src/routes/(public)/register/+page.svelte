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

<!-- ✅ 회원가입 페이지 -->
<div class="flex min-h-screen flex-col bg-linear-to-b from-blue-50 to-white">
	<!-- 고정 헤더 (로그인 페이지와 동일) -->
	<header
		class="fixed top-0 left-0 z-50 flex h-16 w-full items-center bg-white/80 shadow-sm backdrop-blur-md"
	>
		<div class="mx-auto flex w-full max-w-6xl items-center justify-between px-6">
			<a href="/" class="cursor-pointer text-2xl font-bold text-blue-600">Re:Log</a>
			<!-- 균형 유지용 더미 영역 -->
			<div class="w-[90px]"></div>
		</div>
	</header>

	<!-- 메인 회원가입 폼 -->
	<main class="flex grow items-center justify-center px-4 pt-24">
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

				<button
					onclick={handleRegister}
					disabled={loading}
					class="mt-2 rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
				>
					{loading ? '가입 중...' : '회원가입'}
				</button>
				<button
					onclick={handleGoogleRegister}
					class="rounded-lg bg-[#db4437] py-3 font-semibold text-white transition hover:bg-[#c23321]"
				>
					Google로 회원가입
				</button>
			</div>

			<p class="mt-8 text-center text-sm text-gray-600">
				이미 계정이 있으신가요?
				<a href="/login" class="font-semibold text-blue-600 hover:underline">로그인</a>
			</p>
		</div>
	</main>

	<!-- 푸터 -->
	<footer class="bg-gray-900 py-8 text-gray-400">
		<div class="mx-auto max-w-6xl px-6 text-center">
			<p class="text-sm">© 2025 Re:Log. All rights reserved.</p>
			<p class="mt-2 text-xs">Developed by PangLab | Powered by SvelteKit & Firebase</p>
		</div>
	</footer>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
