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

{#if $currentUser}
	<header class="header">
		<div class="user-info">
			<p class="user-name">{$currentUser.displayName ?? $currentUser.email}</p>
		</div>
		<button class="logout-btn" onclick={handleLogout}>로그아웃</button>
	</header>
{/if}

<main class="main-container">
	{@render children()}
</main>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background-color: #f8f9fc;
		border-bottom: 1px solid #e5e7eb;
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.user-info {
		font-size: 0.95rem;
		color: #333;
	}

	.user-name {
		font-weight: 600;
		margin: 0;
	}

	.logout-btn {
		background-color: #e74c3c;
		color: white;
		border: none;
		border-radius: 6px;
		padding: 0.5rem 1rem;
		cursor: pointer;
		font-weight: 600;
		transition: background 0.2s ease;
	}

	.logout-btn:hover {
		background-color: #c0392b;
	}

	.main-container {
		max-width: 900px;
		margin: 2rem auto;
		padding: 0 1rem;
	}

	:global(body) {
		font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
		background-color: #fafafa;
		margin: 0;
		padding: 0;
	}
</style>
