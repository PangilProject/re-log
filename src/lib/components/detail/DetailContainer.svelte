<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { data, loading, error, loadDetail } from '$lib/stores/detailStore';
	import DetailCard from './DetailCard.svelte';

	onMount(() => {
		const unsubscribe = page.subscribe(($page) => {
			if ($page?.params?.id) loadDetail(String($page.params.id));
		});
		return () => unsubscribe();
	});
</script>

<div class="page-inner">
	{#if $loading}
		<p class="loading">불러오는 중...</p>
	{:else if $error}
		<p class="error">{$error}</p>
	{:else if $data}
		<DetailCard data={$data} />
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
