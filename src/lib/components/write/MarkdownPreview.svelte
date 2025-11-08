<script lang="ts">
	export let html: string;
</script>

<div class="preview">
	{@html html}
</div>

<style>
	.preview {
		border: 1px solid #ddd;
		padding: 1rem;
		border-radius: 8px;
		background: #fafafa;
	}
</style>
