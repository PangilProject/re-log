<script lang="ts">
	import '../../../app.css';
	import '../../../lib/styles/preview.css';
	import favicon from '$lib/assets/favicon.svg';
	import PrivateHeader from './PrivateHeader.svelte';
	import PrivateLayout from './PrivateLayout.svelte';
	import Footer from './Footer.svelte';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col bg-linear-to-b from-(--landing-bg-start) to-(--white)">
	<PrivateHeader />

	<main class="mt-16 grow">
		<PrivateLayout>
			<slot />
		</PrivateLayout>
	</main>

	<Footer />
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
	:global(body) {
		font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
		margin: 0;
		padding: 0;
	}
</style>
