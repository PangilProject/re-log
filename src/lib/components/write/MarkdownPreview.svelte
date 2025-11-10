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
</style>
