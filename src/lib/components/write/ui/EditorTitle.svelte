<script lang="ts">
	export let title: string;
	export let onInput: (value: string) => void;
	function handleInput(e: Event) {
		const target = e.target as HTMLTextAreaElement | null;
		if (!target) return;
		onInput(target.value);
	}
</script>

<input
	bind:value={title}
	on:input={handleInput}
	placeholder="제목을 입력하세요"
	class="title-input"
/>

<style>
	.title-input {
		padding: 0.5rem;
		font-size: 1.2rem;
		border: 1px solid #ccc;
		border-radius: 8px;
		width: 100%;
	}

	/* 태블릿 이하 (768px) */
	@media (max-width: 768px) {
		.title-input {
			font-size: 1rem;
		}
	}
</style>
