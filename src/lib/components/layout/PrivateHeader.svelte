<script lang="ts">
	import { currentUser } from '$lib/stores/user';
	import { logout } from '$lib/services/userService';
	import { goto } from '$app/navigation';
	import { User } from 'lucide-svelte';
	import { goToMyPage } from '$lib/utils/navigation';
	import toast from 'svelte-5-french-toast';

	async function handleLogout() {
		const { success, error } = await logout();
		if (success) {
			toast('로그아웃 되었습니다.', { icon: '👋' });
			goto('/');
		} else {
			toast.success('로그아웃 실패');
			console.error('로그아웃 실패: ' + (error as any)?.message);
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
				<div class="flex items-center gap-2">
					<p class="hidden truncate text-sm font-medium text-gray-800 sm:block">
						반갑습니다, {$currentUser.displayName ?? $currentUser.email}님
					</p>
					<button
						class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100"
						onclick={goToMyPage}
					>
						<User class="h-5 w-5 text-blue-600" />
					</button>
				</div>
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
