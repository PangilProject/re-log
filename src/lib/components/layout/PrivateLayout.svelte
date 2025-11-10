<script lang="ts">
	export let padding: string = '6rem 1rem 4rem';
</script>

<div class="page-container" style={`padding: ${padding}`}>
	<slot />
</div>

<style>
	.page-container {
		min-height: 100vh;
		background: linear-gradient(to bottom, #eff6ff, #ffffff);
	}
</style>
