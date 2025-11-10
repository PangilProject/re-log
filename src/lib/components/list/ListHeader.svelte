<script lang="ts">
	export let title: string;
	export let onNew: () => void;
</script>

<div
	class="mb-4 flex flex-col items-start justify-end sm:mb-10 sm:flex-row sm:items-center sm:justify-between"
>
	<h2>{title}</h2>
	<button on:click={onNew} class="mt-3 sm:mt-0">+ 새 회고 작성</button>
</div>

<style>
	h2 {
		font-size: 1.8rem;
		font-weight: 700;
		color: #1e3a8a;
	}

	button {
		background-color: #2563eb;
		color: white;
		border: none;
		padding: 0.4rem 1.2rem;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	button:hover {
		background-color: #1e40af;
	}
</style>
