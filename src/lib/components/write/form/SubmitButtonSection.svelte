<script lang="ts">
	import { submitRetrospect } from '$lib/stores/write/writeActions';
	import { isMobile } from '$lib/stores/write/writeStore';
</script>

{#if !$isMobile}
	<div class="submit-box">
		<button on:click={submitRetrospect}>💾 작성 완료</button>
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
