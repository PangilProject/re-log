<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { loadRetrospects, retrospects, loading, error } from '$lib/stores/listStore';
	import ListHeader from './ListHeader.svelte';
	import ListCard from './ListCard.svelte';
	import EmptyState from './EmptyState.svelte';

	function handleNew() {
		goto('/write');
	}

	onMount(loadRetrospects);
</script>

<div class="page-inner">
	<ListHeader title="📘 나의 회고 목록" onNew={handleNew} />

	{#if $loading}
		<p class="loading">불러오는 중...</p>
	{:else if $error}
		<p class="error">{$error}</p>
	{:else if $retrospects.length === 0}
		<EmptyState onNew={handleNew} />
	{:else}
		<ul class="grid gap-6 sm:grid-cols-2">
			{#each $retrospects as { id, title, createdAt }}
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
