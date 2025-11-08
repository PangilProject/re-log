<script lang="ts">
	import EditorTextarea from '$lib/components/write/EditorTextarea.svelte';
	import MarkdownPreview from '$lib/components/write/MarkdownPreview.svelte';

	export let title: string;
	export let value: string;
	export let html: string;
	export let onInput: (v: string) => void;
</script>

<section class="retrospect-section">
	<h3>{title}</h3>
	<EditorTextarea raw={value} {onInput} />
	<MarkdownPreview {html} />
</section>

<style>
	.retrospect-section {
		border: 1px solid #eee;
		border-radius: 12px;
		padding: 1.5rem;
		background: #fafafa;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
		margin-bottom: 1.5rem;
	}

	h3 {
		margin-bottom: 0.6rem;
		color: #444;
		font-weight: 600;
	}
</style>
