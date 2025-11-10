<script lang="ts">
	import { onMount } from 'svelte';
	import { initPreviews } from '$lib/stores/write/writeActions';
	import WriteForm from './WriteForm.svelte';
	import PageContainer from '$lib/components/layout/PageContainer.svelte';

	onMount(initPreviews);
</script>

<PageContainer isLoading={false} errorMessage={null}>
	<WriteForm />
</PageContainer>
