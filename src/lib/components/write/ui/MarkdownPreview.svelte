<script lang="ts">
	export let html: string;
</script>

<div class="preview" class:empty={!html}>
	{@html html}
</div>

<style>
	.preview {
		width: 100%;
		height: 100%;
		padding: 1rem 1.2rem;
		border: none;
		color: #1f2937;
		font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
		font-size: 0.95rem;
		line-height: 1.7;
		overflow-y: auto;
		box-shadow: none;
		border: 1px solid #e2e8f0;
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
