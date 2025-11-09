<script lang="ts">
	export let html: string;
</script>

<div class="preview" class:empty={!html}>
	{@html html}
</div>

<style>
	.preview {
		width: 100%;
		min-height: 240px;
		padding: 1rem 1.2rem;
		border: 1px solid #e5e7eb;
		border-radius: 12px;
		background-color: #ffffff;
		color: #1f2937;
		font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
		font-size: 0.95rem;
		line-height: 1.7;
		overflow-y: auto;
		box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.03);
	}

	.empty {
		color: #9ca3af;
		text-align: center;
		font-style: italic;
	}
	.empty::before {
		content: '미리보기가 여기에 표시됩니다.';
	}

	/* Markdown 스타일 */
	.preview h1,
	.preview h2,
	.preview h3 {
		margin: 1rem 0 0.5rem;
		font-weight: 700;
		line-height: 1.3;
		color: #1e3a8a;
	}
	.preview p {
		margin: 0.5rem 0;
	}
	.preview ul,
	.preview ol {
		margin: 0.75rem 0 0.75rem 1.2rem;
		padding-left: 1rem;
	}
	.preview li {
		margin-bottom: 0.3rem;
	}
	.preview blockquote {
		margin: 1rem 0;
		padding: 0.8rem 1rem;
		background: #f1f5f9;
		border-left: 4px solid #3b82f6;
		border-radius: 8px;
		color: #374151;
		font-style: italic;
	}
	.preview code {
		background: #f3f4f6;
		padding: 0.2rem 0.4rem;
		border-radius: 4px;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.9rem;
		color: #1e40af;
	}
	.preview pre {
		background: #1e293b;
		color: #e2e8f0;
		padding: 1rem;
		border-radius: 8px;
		overflow-x: auto;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.9rem;
		margin: 1rem 0;
	}
</style>
