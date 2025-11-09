<script lang="ts">
	import '../../app.css';
	import '../../lib/styles/preview.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	import { currentUser } from '$lib/stores/user';
	import { logout } from '$lib/services/userService';
	import { goto } from '$app/navigation';

	async function handleLogout() {
		const { success, error } = await logout();
		if (success) {
			alert('로그아웃 되었습니다.');
			goto('/login');
		} else {
			alert('로그아웃 실패: ' + (error as any)?.message);
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- ✅ 고정 헤더 (공통 스타일) -->
{#if $currentUser}
	<header
		class="fixed top-0 left-0 z-50 flex h-16 w-full items-center bg-white/80 shadow-sm backdrop-blur-md"
	>
		<div class="mx-auto flex w-full max-w-6xl items-center justify-between px-6">
			<!-- 로고 -->
			<a href="/list" class="cursor-pointer text-2xl font-bold text-blue-600">Re:Log</a>

			<!-- 사용자 정보 + 로그아웃 -->
			<div class="flex items-center gap-4">
				<p class="text-sm font-semibold text-gray-700">
					{$currentUser.displayName ?? $currentUser.email}
				</p>
				<button
					onclick={handleLogout}
					class="rounded-lg bg-red-500 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-red-600"
				>
					로그아웃
				</button>
			</div>
		</div>
	</header>
{/if}

<!-- ✅ 메인 콘텐츠 -->
<main>
	<div class="mx-auto w-full max-w-5xl">
		{@render children()}
	</div>
</main>

<!-- ✅ 푸터 (선택적으로 추가 가능, 현재는 비워둠) -->
<footer class="mt-16 py-8 text-center text-sm text-gray-400">
	<p>© 2025 Re:Log. All rights reserved.</p>
</footer>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
	:global(body) {
		font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
		background: linear-gradient(to bottom, #eff6ff, #ffffff);
		margin: 0;
		padding: 0;
	}
</style>
