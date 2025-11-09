<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { renderMarkdown } from '$lib/markdown';
	import { getRetrospectById } from '$lib/services/retrospectService';

	let data: any = null;
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		const docId = $page.params.id;
		try {
			const { success, data: docData, error: err } = await getRetrospectById(String(docId));
			if (success) data = docData;
			else if (err && typeof err === 'object' && 'message' in err)
				error = (err as { message: string }).message;
			else error = '데이터를 불러오는 중 오류 발생';
		} catch (e) {
			console.error(e);
			error = '서버 오류가 발생했습니다.';
		} finally {
			loading = false;
		}
	});
</script>

<div class="detail-container">
	{#if loading}
		<p>불러오는 중...</p>
	{:else if error}
		<p class="error">{error}</p>
	{:else if data}
		<h2>📝 {data.title}</h2>
		<p class="date">
			{data.createdAt
				? new Date(data.createdAt.seconds * 1000).toLocaleDateString()
				: '작성일 없음'}
		</p>

		<div class="section">
			<h3>1️⃣ 오늘 한 일</h3>
			<div class="preview">
				{@html renderMarkdown(data.answers?.today)}
			</div>
		</div>

		<div class="section">
			<h3>2️⃣ 어려웠던 점</h3>
			<div class="preview">
				{@html renderMarkdown(data.answers?.problem)}
			</div>
		</div>

		<div class="section">
			<h3>3️⃣ 배운 점</h3>
			<div class="preview">
				{@html renderMarkdown(data.answers?.learned)}
			</div>
		</div>

		<div class="section">
			<h3>4️⃣ 내일 할 일</h3>
			<div class="preview">
				{@html renderMarkdown(data.answers?.tomorrow)}
			</div>
		</div>

		<div class="section">
			<h3>5️⃣ 총평</h3>
			<div class="preview">
				{@html renderMarkdown(data.answers?.summary)}
			</div>
		</div>

		<div class="back-box">
			<a href="/list">← 목록으로 돌아가기</a>
		</div>
	{/if}
</div>

<style>
	.detail-container {
		max-width: 800px;
		margin: 2rem auto;
		padding: 1rem;
	}
	h2 {
		font-size: 1.8rem;
		margin-bottom: 0.5rem;
	}
	.date {
		color: #888;
		margin-bottom: 1.5rem;
		font-size: 0.9rem;
	}
	.section {
		margin-bottom: 2rem;
	}
	h3 {
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
		color: #0070f3;
	}
	.back-box {
		text-align: center;
		margin-top: 2rem;
	}
	a {
		text-decoration: none;
		color: #0070f3;
		font-weight: bold;
	}
	a:hover {
		text-decoration: underline;
	}
	.error {
		color: #e74c3c;
		text-align: center;
	}
</style>
