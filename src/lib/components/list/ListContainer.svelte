<script lang="ts">
	import { onMount } from 'svelte';
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
		hasMoreData,
		isAllRetrospectsLoading // New import
	} from '$lib/stores/list/listStore';
	import { filteredRetrospects, searchQuery, sortOrder, selectedCategories } from '$lib/stores/list/listFilterStore'; // New imports
	import FilterEmptyState from './FilterEmptyState.svelte';
	import { openRetrospectType } from '$lib/utils/retrospectTtype';

	onMount(() => {
		// Clear existing data and load initial set
		retrospectsData.set([]);
		hasMoreData.set(true);
		loadRetrospects(false);
	});

	// Overall loading state for the PageContainer
	// Should be true if paginated data is loading (and no data yet)
	// OR if all retrospects data is loading for search
	$: overallLoading = ($isLoading && $retrospectsData.length === 0) || $isAllRetrospectsLoading;
</script>

<PageContainer isLoading={overallLoading} errorMessage={$errorMessage}>
	<ListHeader title="📘 나의 회고 목록" onNew={openRetrospectType} />
	<ListOptions {searchQuery} {sortOrder} />

	{#if overallLoading}
		<p class="mt-6 text-center text-gray-500">데이터를 불러오는 중...</p>
	{:else if $retrospectsData.length === 0 && !$isLoading}
		<EmptyState onNew={openRetrospectType} />
	{:else if $filteredRetrospects.length === 0 && ($searchQuery.trim() || $selectedCategories.length > 0)}
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

		{#if $isLoading && $retrospectsData.length > 0}
			<p class="mt-6 text-center text-gray-500">로딩 중...</p>
		{:else if $hasMoreData && !$searchQuery.trim() && $selectedCategories.length === 0}
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
