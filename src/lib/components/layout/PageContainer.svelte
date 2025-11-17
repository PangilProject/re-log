<script lang="ts">
	export let isLoading: boolean = false;
	export let errorMessage: string | null = null;
</script>

<div class="page-inner">
	{#if isLoading}
		<p class="loading">불러오는 중...</p>
	{:else if errorMessage}
		<p class="error">{errorMessage}</p>
	{:else}
		<slot />
	{/if}
</div>

<style>
	.page-inner {
		max-width: 1000px;
		margin: 0 auto;
		padding-bottom: 3rem;
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
