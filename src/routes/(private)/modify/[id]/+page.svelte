<script lang="ts">
	import { onMount } from 'svelte';
	import PageContainer from '$lib/components/layout/PageContainer.svelte';
	import WriteContainer from '$lib/components/write/WriteContainer.svelte';
	import { initializeEditorFromDoc } from '$lib/stores/write/writeActions';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(() => {
		if (data.retrospect) {
			initializeEditorFromDoc(data.retrospect);
		}
	});
</script>

<PageContainer>
	<WriteContainer mode="modify" />
</PageContainer>
