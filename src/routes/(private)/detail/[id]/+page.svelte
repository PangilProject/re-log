<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import DetailCard from '$lib/components/detail/DetailCard.svelte';
	import { getRetrospectById } from '$lib/services/retrospectService';

	let data: any = null;
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		const docId = $page.params.id;
		try {
			const { success, data: docData, error: err } = await getRetrospectById(String(docId));
			if (success) data = docData;
			else if (err && typeof err === 'object' && 'message' in err) {
				error = (err as { message: string }).message;
			} else {
				error = '데이터를 불러오는 중 오류 발생';
			}
		} catch (e) {
			console.error(e);
			error = '서버 오류가 발생했습니다.';
		} finally {
			loading = false;
		}
	});
</script>

<div class="page-container">
	<div class="page-inner">
		{#if loading}
			<p class="loading">불러오는 중...</p>
		{:else if error}
			<p class="error">{error}</p>
		{:else if data}
			<DetailCard {data} />
		{/if}
	</div>
</div>

<style>
	.page-container {
		min-height: 100vh;
		background: linear-gradient(to bottom, #eff6ff, #ffffff);
		padding: 6rem 1rem 4rem;
	}
	.page-inner {
		max-width: 800px;
		margin: 0 auto;
	}
	.loading,
	.error {
		text-align: center;
		color: #6b7280;
		margin-top: 2rem;
	}
	.error {
		color: #e74c3c;
	}
</style>
