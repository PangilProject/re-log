<script lang="ts">
	import LoginRegisterHeader from '$lib/components/layout/LoginRegisterHeader.svelte';

	// slot으로 폼(LoginForm or RegisterForm)을 전달받음
</script>

<div class="flex min-h-screen flex-col bg-linear-to-b from-(--landing-bg-start) to-(--white)">
	<LoginRegisterHeader />

	<main class="flex grow items-center justify-center px-4 pt-24">
		<slot />
	</main>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
