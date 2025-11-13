<script lang="ts">
	import { isMobile } from '$lib/stores/write/writeStore';
	import { handleSubmitRetrospect } from '$lib/utils/retrospectHandler';

	export let mode: 'write' | 'modify' = 'write';
</script>

{#if !$isMobile}
	<div class="submit-box">
		<button on:click={() => handleSubmitRetrospect(mode)}>💾 작성 완료</button>
	</div>
{/if}

<style>
	.submit-box {
		margin-top: 3rem;
		display: flex;
		justify-content: center;
	}
	button {
		background-color: #2563eb;
		color: #fff;
		border: none;
		border-radius: 8px;
		padding: 0.8rem 2rem;
		font-weight: 600;
		cursor: pointer;
		transition: 0.2s ease;
	}
	button:hover {
		background-color: #1e40af;
	}
</style>
