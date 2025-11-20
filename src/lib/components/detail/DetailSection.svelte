<script lang="ts">
	import { renderMarkdown } from '$lib/markdown';
	export let title: string;
	export let content: string;
</script>

<div class="section">
	<h3>{title}</h3>
	<div class="preview">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html renderMarkdown(content || '')}
	</div>
</div>

<style>
	.section {
		margin-bottom: 2rem;
	}
	h3 {
		font-size: 1.1rem;
		font-weight: 600;
		color: #2563eb;
		margin-bottom: 0.6rem;
	}
</style>
