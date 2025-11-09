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
		min-height: 240px;
		padding: 1rem 1.2rem;
		border-radius: 12px;
		border: 1px solid #d1d5db;
		background-color: #f9fafb;
		font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
		font-size: 0.95rem;
		line-height: 1.6;
		color: #111827;
		resize: vertical;
		transition:
			border 0.2s ease,
			box-shadow 0.2s ease,
			background 0.2s ease;
		box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.03);
	}

	.editor-textarea:focus {
		outline: none;
		border-color: #2563eb; /* blue-600 */
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
		background-color: #ffffff;
	}

	.editor-textarea::placeholder {
		color: #9ca3af; /* gray-400 */
	}
</style>
