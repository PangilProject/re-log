<script lang="ts">
	export let mode: 'write' | 'modify' = 'write';
	import { onMount } from 'svelte';
	import { initPreviews } from '$lib/stores/write/writeActions';
	import WriteForm from './WriteForm.svelte';
	import PageContainer from '$lib/components/layout/PageContainer.svelte';
	import { hydrateWriteStore, resetWriteStore } from '$lib/stores/write/writeStore';
	import { page } from '$app/stores';
	import { getRetrospectById } from '$lib/services/retrospectService';

	// onMount(initPreviews);
	onMount(async () => {
		const docId = $page?.params?.id;

		if (mode === 'write') {
			resetWriteStore();
			return;
		}

		if (mode === 'modify' && docId) {
			const { success, data, error } = await getRetrospectById(docId);
			console.log(data);
			if (success && data) {
				hydrateWriteStore(data);
			} else {
				console.error('문서 불러오기 실패:', error);
			}
		}
	});
</script>

<PageContainer isLoading={false} errorMessage={null}>
	<WriteForm {mode} />
</PageContainer>
