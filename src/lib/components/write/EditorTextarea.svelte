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
		padding: 0.5rem;
		border-radius: 8px;
		border: 1px solid #ccc;
		resize: vertical;
		font-family: monospace;
	}
</style>
