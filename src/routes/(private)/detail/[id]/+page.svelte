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

<div class="page-container">
	<div class="page-inner">
		{#if loading}
			<p class="loading">불러오는 중...</p>
		{:else if error}
			<p class="error">{error}</p>
		{:else if data}
			<div class="detail-card">
				<h2>📝 {data.title}</h2>
				<p class="date">
					{data.createdAt
						? new Date(data.createdAt.seconds * 1000).toLocaleDateString()
						: '작성일 없음'}
				</p>

				{#each [['1️⃣ 오늘 한 일', data.answers?.today], ['2️⃣ 어려웠던 점', data.answers?.problem], ['3️⃣ 배운 점', data.answers?.learned], ['4️⃣ 내일 할 일', data.answers?.tomorrow], ['5️⃣ 총평', data.answers?.summary]] as [title, content]}
					<div class="section">
						<h3>{title}</h3>
						<div class="preview">
							{@html renderMarkdown(content)}
						</div>
					</div>
				{/each}

				<div class="back-box">
					<a href="/list">← 목록으로 돌아가기</a>
				</div>
			</div>
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
		max-width: 800px;
		margin: 0 auto;
	}

	.detail-card {
		background: #ffffff;
		border: 1px solid #e5e7eb;
		border-radius: 16px;
		padding: 2.5rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
	}

	h2 {
		font-size: 1.8rem;
		font-weight: 700;
		color: #1e3a8a;
		text-align: center;
		margin-bottom: 0.3rem;
	}

	.date {
		text-align: center;
		color: #6b7280;
		font-size: 0.9rem;
		margin-bottom: 2rem;
	}

	h3 {
		font-size: 1.1rem;
		font-weight: 600;
		color: #2563eb;
		margin-bottom: 0.6rem;
	}

	.preview {
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		background: #f9fafb;
		padding: 1rem 1.2rem;
		color: #111827;
		line-height: 1.7;
	}

	.section {
		margin-bottom: 2rem;
	}

	.back-box {
		text-align: center;
		margin-top: 2rem;
	}

	a {
		display: inline-block;
		background-color: #2563eb;
		color: #fff;
		font-weight: 600;
		padding: 0.6rem 1.2rem;
		border-radius: 8px;
		text-decoration: none;
		transition: 0.2s ease;
	}

	a:hover {
		background-color: #1e40af;
	}

	.loading,
	.error {
		text-align: center;
		color: #6b7280;
		margin-top: 2rem;
	}

	.error {
		color: #e74c3c;
	}
</style>
