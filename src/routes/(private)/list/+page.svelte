<script lang="ts">
	import { onMount } from 'svelte';
	import { getRetrospectListByUser } from '$lib/services/retrospectService';

	let retrospects: { id: string; title: string; createdAt?: any }[] = [];
	let loading = true;
	let error: string | null = null;

	const userId = 'temp-userId'; // 추후 Firebase Auth 적용 시 교체

	onMount(async () => {
		try {
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
</script>

<div class="list-container">
	<h2>📘 나의 회고 목록</h2>

	{#if loading}
		<p class="loading">불러오는 중...</p>
	{:else if error}
		<p class="error">{error}</p>
	{:else if retrospects.length === 0}
		<p>아직 작성된 회고가 없습니다. ✍️</p>
	{:else}
		<ul>
			{#each retrospects as retro}
				<li>
					<a href={`/detail/${retro.id}`}>
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

<style>
	.list-container {
		max-width: 800px;
		margin: 2rem auto;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	h2 {
		font-size: 1.6rem;
		font-weight: bold;
	}
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	li {
		border: 1px solid #ddd;
		border-radius: 10px;
		padding: 1rem 1.2rem;
		transition: background 0.2s ease;
	}
	a {
		text-decoration: none;
		color: inherit;
		display: block;
	}
	li:hover {
		background: #f6f9ff;
	}
	h3 {
		margin: 0 0 0.3rem 0;
		font-size: 1.2rem;
	}
	.date {
		color: gray;
		font-size: 0.9rem;
	}
	.loading,
	.error {
		text-align: center;
		color: #777;
	}
	.error {
		color: #e74c3c;
	}
</style>
