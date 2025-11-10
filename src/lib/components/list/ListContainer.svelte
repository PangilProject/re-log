<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import ListHeader from './ListHeader.svelte';
	import ListCard from './ListCard.svelte';
	import EmptyState from './EmptyState.svelte';
	import { loadRetrospects } from '$lib/stores/list/listActions';
	import { errorMessage, isLoading, retrospectsData } from '$lib/stores/list/listStore';

	function handleNew() {
		goto('/write');
	}

	onMount(loadRetrospects);
</script>

<div class="page-inner">
	<ListHeader title="📘 나의 회고 목록" onNew={handleNew} />

	{#if $isLoading}
		<p class="loading">불러오는 중...</p>
	{:else if $errorMessage}
		<p class="error">{$errorMessage}</p>
	{:else if $retrospectsData.length === 0}
		<EmptyState onNew={handleNew} />
	{:else}
		<ul class="grid gap-6 sm:grid-cols-2">
			{#each $retrospectsData as { id, title, createdAt }}
				<ListCard {id} {title} {createdAt} />
			{/each}
		</ul>
	{/if}
</div>

<style>
	.page-inner {
		max-width: 1000px;
		margin: 0 auto;
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
