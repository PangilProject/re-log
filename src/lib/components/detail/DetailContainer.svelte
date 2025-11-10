<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { detailData, isLoading, errorMessage } from '$lib/stores/detail/detailStore';
	import { loadDetail } from '$lib/stores/detail/detailActions';
	import DetailCard from './DetailCard.svelte';
	import PageContainer from '$lib/components/layout/PageContainer.svelte';

	onMount(() => {
		const unsubscribe = page.subscribe(($page) => {
			if ($page?.params?.id) loadDetail(String($page.params.id));
		});
		return () => unsubscribe();
	});
</script>

<PageContainer isLoading={$isLoading} errorMessage={$errorMessage}>
	{#if $detailData}
		<DetailCard data={$detailData} />
	{/if}
</PageContainer>
