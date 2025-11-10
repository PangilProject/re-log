<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { detailData, isLoading, errorMessage } from '$lib/stores/detail/detailStore';
	import DetailCard from './DetailCard.svelte';
	import { loadDetail } from '$lib/stores/detail/detailActions';

	onMount(() => {
		const unsubscribe = page.subscribe(($page) => {
			if ($page?.params?.id) loadDetail(String($page.params.id));
		});
		return () => unsubscribe();
	});
</script>

<div class="page-inner">
	{#if $isLoading}
		<p class="loading">불러오는 중...</p>
	{:else if $errorMessage}
		<p class="error">{$errorMessage}</p>
	{:else if $detailData}
		<DetailCard data={$detailData} />
	{/if}
</div>

<style>
	.page-inner {
		max-width: 800px;
		margin: 0 auto;
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
