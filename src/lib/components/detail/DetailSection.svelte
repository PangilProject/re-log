<script lang="ts">
	import { renderMarkdown } from '$lib/markdown';
	export let title: string;
	export let content: string;
</script>

<div class="section">
	<h3>{title}</h3>
	<div class="preview">
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
	.preview {
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		background: #f9fafb;
		padding: 1rem 1.2rem;
		color: #111827;
		line-height: 1.7;
	}
</style>
