<script lang="ts">
	import { onMount } from 'svelte';
	import ListHeader from './ListHeader.svelte';
	import ListCard from './ListCard.svelte';
	import EmptyState from './EmptyState.svelte';
	import { loadRetrospects } from '$lib/stores/list/listActions';
	import { errorMessage, isLoading, retrospectsData } from '$lib/stores/list/listStore';
	import PageContainer from '$lib/components/layout/PageContainer.svelte';
	import { goToWrite } from '$lib/utils/navigation';

	onMount(loadRetrospects);
</script>

<PageContainer isLoading={$isLoading} errorMessage={$errorMessage}>
	<ListHeader title="📘 나의 회고 목록" onNew={goToWrite} />

	{#if $retrospectsData.length === 0}
		<EmptyState onNew={goToWrite} />
	{:else}
		<ul class="grid gap-6 sm:grid-cols-2">
			{#each $retrospectsData as { id, title, createdAt }}
				<ListCard {id} {title} {createdAt} />
			{/each}
		</ul>
	{/if}
</PageContainer>
