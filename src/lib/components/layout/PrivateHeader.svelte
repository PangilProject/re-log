<script lang="ts">
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

{#if $currentUser}
	<header
		class="fixed top-0 left-0 z-50 flex h-16 w-full items-center bg-white/80 shadow-sm backdrop-blur-md"
	>
		<div class="mx-auto flex w-full max-w-6xl items-center justify-between px-6">
			<a href="/list" class="cursor-pointer text-2xl font-bold text-blue-600">Re:Log</a>

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
