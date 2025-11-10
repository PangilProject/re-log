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
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.5rem;
		background: #ffffff;
		border-radius: 16px;
		box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
		transition:
			box-shadow 0.2s ease,
			transform 0.2s ease;
	}
	.retrospect-section:hover {
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
		transform: translateY(-2px);
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
		border: 1px solid #e2e8f0; /* gray-200 */
		border-radius: 12px;
		background-color: #f9fafb;
		padding: 1rem;
		overflow-y: auto;
		min-height: 250px;
		max-height: 400px;
	}

	.editor-preview {
		background: #ffffff;
	}
</style>
