<script lang="ts">
	import '../../../app.css';
	import '../../../lib/styles/preview.css';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from './Footer.svelte';
	// optional: import PublicHeader from './PublicHeader.svelte';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col bg-(--white)">
	<!-- 비로그인 페이지 전용 헤더 -->

	<main class="grow">
		<div>
			<slot />
		</div>
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
