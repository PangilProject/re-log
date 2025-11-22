<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { adminAuthenticated } from '$lib/stores/admin';
	import { openPrompt } from '$lib/utils/prompt';
	import PageContainer from '$lib/components/layout/PageContainer.svelte';
	import { errorInvalidPassword } from '$lib/utils/toast';

	onMount(async () => {
		if ($adminAuthenticated) {
			return;
		}

		const password = await openPrompt('관리자 비밀번호를 입력하세요.', '비밀번호');
		if (password === import.meta.env.VITE_ADMIN_KEY) {
			adminAuthenticated.set(true);
		} else {
			errorInvalidPassword();
			goto('/list');
		}
	});

	const tabs = [
		{ name: '대시보드', href: '/manage' },
		{ name: '사용자 목록', href: '/manage/users' },
		{ name: '회고 목록', href: '/manage/posts' },
		{ name: '피드백 목록', href: '/manage/feedbacks' }
	];
</script>

{#if $adminAuthenticated}
	<PageContainer>
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-(--text-primary)">관리자 페이지</h1>
		</div>
		<div class="mb-6 border-b border-gray-200">
			<nav class="-mb-px flex space-x-8" aria-label="Tabs">
				{#each tabs as tab (tab.href)}
					<a
						href={tab.href}
						class="border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap {$page.url
							.pathname === tab.href
							? 'border-blue-500 text-blue-600'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
					>
						{tab.name}
					</a>
				{/each}
			</nav>
		</div>
		<slot />
	</PageContainer>
{/if}
