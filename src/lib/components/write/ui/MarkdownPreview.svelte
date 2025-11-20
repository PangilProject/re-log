<script lang="ts">
	export let html: string;
</script>

<div class="preview" class:empty={!html}>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html html}
</div>

<style>
	.empty {
		color: #9ca3af;
		text-align: center;
		font-style: italic;
	}
	.empty::before {
		content: '미리보기가 여기에 표시됩니다.';
	}
</style>
