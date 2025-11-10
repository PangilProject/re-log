<script lang="ts">
	import DetailHeader from './DetailHeader.svelte';
	import DetailSection from './DetailSection.svelte';

	export let data: any;
</script>

<div class="detail-card">
	<DetailHeader title={data.title} createdAt={data.createdAt} />

	{#each [['1️⃣ 오늘 한 일', data.answers?.today], ['2️⃣ 어려웠던 점', data.answers?.problem], ['3️⃣ 배운 점', data.answers?.learned], ['4️⃣ 내일 할 일', data.answers?.tomorrow], ['5️⃣ 총평', data.answers?.summary]] as [title, content]}
		<DetailSection {title} {content} />
	{/each}

	<div class="back-box">
		<a href="/list">← 목록으로 돌아가기</a>
	</div>
</div>

<style>
	.detail-card {
		background: #ffffff;
		border: 1px solid #e5e7eb;
		border-radius: 16px;
		padding: 2.5rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
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
</style>
