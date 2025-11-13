<script lang="ts">
	export let raw: string;
	export let onInput: (value: string) => void;

	function handleInput(e: Event) {
		const target = e.target as HTMLTextAreaElement | null;
		if (!target) return;
		onInput(target.value);
	}
</script>

<textarea
	bind:value={raw}
	on:input={handleInput}
	rows="10"
	class="editor-textarea"
	placeholder="Markdown 형식으로 회고를 작성하세요..."
></textarea>

<style>
	.editor-textarea {
		width: 100%;
		height: 100%;
		padding: 1rem 1.2rem;
		font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
		font-size: 0.95rem;
		line-height: 1.7;
		color: #111827;
		resize: none;
		border: none;
		border: 1px solid #e2e8f0; /* (--border-muted) */
		border-radius: 12px;
		transition: border 0.5s ease;
	}

	.editor-textarea:focus {
		outline: none;
		box-shadow: none;
		border: 1px solid #2563eb; /* (--border-muted) */
	}

	.editor-textarea::placeholder {
		color: #9ca3af; /* gray-400 */
	}
</style>
