<!-- src/lib/components/layout/Layout.svelte -->
<script lang="ts">
	import Header from './PublicHeader.svelte';
</script>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="grow">
		<slot />
	</main>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
