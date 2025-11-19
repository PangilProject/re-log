<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { detailData, isLoading, errorMessage } from '$lib/stores/detail/detailStore';
	import { loadDetail } from '$lib/stores/detail/detailActions';
	import DetailCard from './DetailCard.svelte';
	import PageContainer from '$lib/components/layout/PageContainer.svelte';
	import { currentUser } from '$lib/stores/user';
	import { derived } from 'svelte/store';
	import BackToListSection from '../common/BackToListSection.svelte';

	export let shareMode: boolean = false;

	const isAuthenticated = derived(currentUser, ($currentUser) => !!$currentUser);

	onMount(() => {
		const unsubscribe = page.subscribe(($page) => {
			if ($page?.params?.id) loadDetail(String($page.params.id));
		});
		return () => unsubscribe();
	});
</script>

<PageContainer isLoading={$isLoading} errorMessage={$errorMessage}>
	{#if !shareMode}
		<BackToListSection isDetailMode={true} />
	{/if}
	{#if $detailData}
		<DetailCard data={$detailData} isAuthenticated={$isAuthenticated} {shareMode} />
	{/if}
</PageContainer>
