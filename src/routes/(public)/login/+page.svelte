<script lang="ts">
	import { loginWithEmail, loginWithGoogle } from '$lib/services/userService';
	import { goto } from '$app/navigation';
	import { getErrorMessage } from '$lib/utils/firebaseError';

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

<div class="flex min-h-screen flex-col bg-linear-to-b from-blue-50 to-white">
	<!-- ✅ 고정 헤더 (랜딩과 동일 구조로 수정) -->
	<header
		class="fixed top-0 left-0 z-50 flex h-16 w-full items-center bg-white/80 shadow-sm backdrop-blur-md"
	>
		<div class="mx-auto flex w-full max-w-6xl items-center justify-between px-6">
			<a href="/" class="cursor-pointer text-2xl font-bold text-blue-600">Re:Log</a>
			<!-- ⚡️ 랜딩 페이지와 높이를 맞추기 위한 공간 균형용 빈 div -->
			<div class="w-[90px]"></div>
		</div>
	</header>

	<!-- 메인 로그인 폼 -->
	<main class="flex grow items-center justify-center px-4 pt-24">
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
				<button
					onclick={handleLogin}
					disabled={loading}
					class="mt-2 rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
				>
					{loading ? '로그인 중...' : '로그인'}
				</button>
				<button
					onclick={handleGoogleLogin}
					class="rounded-lg bg-[#db4437] py-3 font-semibold text-white transition hover:bg-[#c23321]"
				>
					Google로 로그인
				</button>
			</div>

			<p class="mt-8 text-center text-sm text-gray-600">
				아직 회원이 아니신가요?
				<a href="/register" class="font-semibold text-blue-600 hover:underline">회원가입</a>
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
