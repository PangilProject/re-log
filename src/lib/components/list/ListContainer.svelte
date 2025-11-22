<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import ListHeader from './ListHeader.svelte';
	import ListOptions from './ListOptions.svelte';
	import ListCard from './ListCard.svelte';
	import EmptyState from './EmptyState.svelte';
	import PageContainer from '$lib/components/layout/PageContainer.svelte';

	import { loadRetrospects } from '$lib/stores/list/listActions';
	import {
		retrospectsData,
		errorMessage,
		isLoading,
		hasMoreData
	} from '$lib/stores/list/listStore';
	import { filteredRetrospects, searchQuery, sortOrder } from '$lib/stores/list/listFilterStore';
	import FilterEmptyState from './FilterEmptyState.svelte';
	import { openRetrospectType } from '$lib/utils/retrospectTtype';

	let loadMoreElement: HTMLDivElement;
	let observer: IntersectionObserver;

	onMount(() => {
		// Clear existing data and load initial set
		retrospectsData.set([]);
		hasMoreData.set(true);
		loadRetrospects(false);

		observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					loadRetrospects(true);
				}
			},
			{ threshold: 1.0 }
		);

		if (loadMoreElement) {
			observer.observe(loadMoreElement);
		}
	});

	onDestroy(() => {
		if (observer && loadMoreElement) {
			observer.unobserve(loadMoreElement);
		}
	});
</script>

<PageContainer isLoading={$isLoading && $retrospectsData.length === 0} errorMessage={$errorMessage}>
	<ListHeader title="📘 나의 회고 목록" onNew={openRetrospectType} />
	<ListOptions {searchQuery} {sortOrder} />

	{#if $retrospectsData.length === 0 && !$isLoading}
		<EmptyState onNew={openRetrospectType} />
	{:else if $filteredRetrospects.length === 0 && !$isLoading}
		<FilterEmptyState onNew={openRetrospectType} />
	{:else}
		<ul class="grid gap-6 sm:grid-cols-2">
			{#each $filteredRetrospects as { id, title, createdAt, selectedEmotions, categories } (id)}
				<ListCard
					{id}
					{title}
					{createdAt}
					selectedEmotions={selectedEmotions ?? []}
					categories={categories ?? []}
				/>
			{/each}
		</ul>
		<div bind:this={loadMoreElement}></div>

		{#if $isLoading && $retrospectsData.length > 0}
			<p class="mt-6 text-center text-gray-500">로딩 중...</p>
		{:else if $hasMoreData}
			<div class="mt-6 text-center">
				<button on:click={() => loadRetrospects(true)} class="btn-load-more"> 더 불러오기 </button>
			</div>
		{/if}
	{/if}
</PageContainer>

<style>
	.btn-load-more {
		background-color: #2563eb; /* blue-600 */
		color: white;
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		font-weight: 600;
		transition: background-color 0.2s ease-in-out;
		cursor: pointer;
	}
	.btn-load-more:hover {
		background-color: #1e40af; /* blue-800 */
	}
</style>
