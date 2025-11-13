<script lang="ts">
	import { currentUser } from '$lib/stores/user';
	import { logout } from '$lib/services/userService';
	import { goto } from '$app/navigation';
	import { User } from 'lucide-svelte';
	import { goToMyPage } from '$lib/utils/navigation';
	import { errorLogOut, successLogOut } from '$lib/utils/toast';

	async function handleLogout() {
		const { success, error } = await logout();
		if (success) {
			successLogOut();
			goto('/');
		} else {
			errorLogOut();
			console.error('로그아웃 실패: ' + (error as any)?.message);
		}
	}
</script>

{#if $currentUser}
	<header
		class="fixed top-0 left-0 z-50 flex h-16 w-full items-center bg-(--white)/80 shadow-sm backdrop-blur-md"
	>
		<div class="mx-auto flex w-[1000px] items-center justify-between px-0 max-[1000px]:px-8">
			<a href="/list" class="cursor-pointer text-2xl font-bold text-(--brand-primary)">Re:Log</a>

			<div class="flex items-center gap-4">
				<div class="flex items-center gap-2">
					<p class="hidden truncate text-sm font-medium text-(--text-primary) sm:block">
						반갑습니다, {$currentUser.displayName ?? $currentUser.email}님
					</p>
					<button
						class="flex h-8 w-8 items-center justify-center rounded-full bg-(--brand-primary-light)"
						onclick={goToMyPage}
					>
						<User class="h-5 w-5 text-(--brand-primary)" />
					</button>
				</div>
				<button
					onclick={handleLogout}
					class="rounded-lg bg-(--brand-accent) px-3 py-1.5 text-sm font-semibold text-(--white) transition hover:bg-(--brand-accent-dark)"
				>
					로그아웃
				</button>
			</div>
		</div>
	</header>
{/if}
