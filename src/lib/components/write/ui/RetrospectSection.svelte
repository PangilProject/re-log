<script lang="ts">
	import EditorTextarea from './EditorTextarea.svelte';
	import MarkdownPreview from './MarkdownPreview.svelte';

	export let title: string;
	export let value: string;
	export let html: string;
	export let onInput: (v: string) => void;
</script>

<section class="retrospect-section">
	<h3>{title}</h3>

	<div class="editor-box">
		<!-- 왼쪽: 에디터 -->
		<div class="editor-input">
			<EditorTextarea raw={value} {onInput} />
		</div>

		<!-- 오른쪽: 미리보기 -->
		<div class="editor-preview">
			<MarkdownPreview {html} />
		</div>
	</div>
</section>

<style>
	.retrospect-section {
		min-width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2rem;
		transition:
			box-shadow 0.2s ease,
			transform 0.2s ease;
		margin-right: 20px;
	}

	h3 {
		color: #1e3a8a; /* blue-900 */
		font-size: 1.1rem;
		font-weight: 600;
		margin: 0;
	}

	.editor-box {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	@media (min-width: 768px) {
		.editor-box {
			grid-template-columns: 1fr 1fr;
		}
	}

	.editor-input,
	.editor-preview {
		overflow-y: auto;
		min-height: 250px;
		max-height: 400px;
	}
</style>
