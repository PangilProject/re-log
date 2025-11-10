<script lang="ts">
	import { RETROSPECT_SECTIONS } from '$lib/constants/retrospect_sections';
	import DetailHeader from './DetailHeader.svelte';
	import DetailSection from './DetailSection.svelte';

	export let data: any;
</script>

<div class="detail-card">
	<DetailHeader title={data.title} createdAt={data.createdAt} />

	{#each RETROSPECT_SECTIONS as section}
		<DetailSection title={section.label} content={data.answers?.[section.key] || ''} />
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
		@media (width < 40rem) {
			padding: 1rem;
		}
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
