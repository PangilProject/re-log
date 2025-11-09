<script lang="ts">
	import { onMount } from 'svelte';
	import { getRetrospectListByUser } from '$lib/services/retrospectService';
	import { currentUser } from '$lib/stores/user';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';

	let retrospects: { id: string; title: string; createdAt?: any }[] = [];
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		try {
			const user = get(currentUser);
			if (!user) {
				error = '로그인이 필요합니다.';
				loading = false;
				return;
			}

			const userId = user.uid;
			const { success, retrospects: data, error: err } = await getRetrospectListByUser(userId);

			if (success) retrospects = data ?? [];
			else error = (err as any)?.message ?? '데이터를 불러오는 중 오류 발생';
		} catch (e) {
			error = '서버 오류가 발생했습니다.';
			console.error(e);
		} finally {
			loading = false;
		}
	});

	function handleNewRetrospect() {
		goto('/write');
	}
</script>

<div class="page-container">
	<div class="page-inner">
		<!-- 헤더 -->
		<div class="page-header">
			<h2>📘 나의 회고 목록</h2>
			<button on:click={handleNewRetrospect}>+ 새 회고 작성</button>
		</div>

		<!-- 본문 -->
		{#if loading}
			<p class="loading">불러오는 중...</p>
		{:else if error}
			<p class="error">{error}</p>
		{:else if retrospects.length === 0}
			<div class="empty-card">
				<p>아직 작성된 회고가 없습니다. ✍️</p>
				<button on:click={handleNewRetrospect}>첫 회고 작성하기</button>
			</div>
		{:else}
			<ul class="grid gap-6 sm:grid-cols-2">
				{#each retrospects as retro}
					<li>
						<a href={`/detail/${retro.id}`} class="card">
							<h3>{retro.title}</h3>
							<p class="date">
								{retro.createdAt
									? new Date(retro.createdAt.seconds * 1000).toLocaleDateString()
									: '작성일 없음'}
							</p>
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style>
	.page-container {
		min-height: 100vh;
		background: linear-gradient(to bottom, #eff6ff, #ffffff);
		padding: 6rem 1rem 4rem;
	}

	.page-inner {
		max-width: 1000px;
		margin: 0 auto;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2.5rem;
	}

	h2 {
		font-size: 1.8rem;
		font-weight: 700;
		color: #1e3a8a;
	}

	button {
		background-color: #2563eb;
		color: white;
		border: none;
		padding: 0.6rem 1.2rem;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	button:hover {
		background-color: #1e40af;
	}

	.card {
		display: block;
		border: 1px solid #e5e7eb;
		border-radius: 12px;
		background-color: #fff;
		padding: 1.5rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
		transition: 0.2s ease;
	}

	.card:hover {
		transform: translateY(-3px);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
	}

	h3 {
		font-size: 1.2rem;
		font-weight: 600;
		color: #111827;
		margin-bottom: 0.4rem;
	}

	.date {
		font-size: 0.9rem;
		color: #6b7280;
	}

	.empty-card {
		text-align: center;
		padding: 4rem 2rem;
		background: white;
		border-radius: 16px;
		border: 1px solid #e5e7eb;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
	}

	.empty-card p {
		font-size: 1rem;
		color: #4b5563;
		margin-bottom: 1rem;
	}

	.loading,
	.error {
		text-align: center;
		margin-top: 2rem;
		color: #6b7280;
	}

	.error {
		color: #e74c3c;
	}
</style>
