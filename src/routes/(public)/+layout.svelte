<script lang="ts">
	import '../../app.css';
	import '../../lib/styles/preview.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	:global(body) {
		font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
		background-color: #fafafa;
		margin: 0;
		padding: 0;
	}
</style>
