<script lang="ts">
	import { onMount } from 'svelte';
	import ListHeader from './ListHeader.svelte';
	import ListOptions from './ListOptions.svelte';
	import ListCard from './ListCard.svelte';
	import EmptyState from './EmptyState.svelte';
	import PageContainer from '$lib/components/layout/PageContainer.svelte';
	import { goToWrite } from '$lib/utils/navigation';

	// ✅ store import
	import { loadRetrospects } from '$lib/stores/list/listActions';
	import { retrospectsData, errorMessage, isLoading } from '$lib/stores/list/listStore';
	import { filteredRetrospects, searchQuery, sortOrder } from '$lib/stores/list/listFilterStore';
	import FilterEmptyState from './FilterEmptyState.svelte';

	onMount(loadRetrospects);
</script>

<PageContainer isLoading={$isLoading} errorMessage={$errorMessage}>
	<ListHeader title="📘 나의 회고 목록" onNew={goToWrite} />
	<ListOptions {searchQuery} {sortOrder} />

	{#if $retrospectsData.length === 0}
		<EmptyState onNew={goToWrite} />
	{:else if $filteredRetrospects.length === 0}
		<FilterEmptyState onNew={goToWrite} />
	{:else}
		<ul class="grid gap-6 sm:grid-cols-2">
			{#each $filteredRetrospects as { id, title, createdAt }}
				<ListCard {id} {title} {createdAt} />
			{/each}
		</ul>
	{/if}
</PageContainer>
