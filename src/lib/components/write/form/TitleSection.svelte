<script lang="ts">
	import EditorTitle from '../EditorTitle.svelte';
	import { title } from '$lib/stores/write/writeStore';
</script>

<div class="title-box">
	<EditorTitle title={$title} onInput={(v) => title.set(v)} />
</div>

<style>
	.title-box {
		margin-bottom: 2.5rem;
	}
</style>
