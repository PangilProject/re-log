<!-- src/routes/(public)/login/+page.svelte -->
<script lang="ts">
	import LoginHeader from '$lib/components/layout/LoginRegisterHeader.svelte';
	import LoginForm from '$lib/components/auth/LoginForm.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
</script>

<div class="flex min-h-screen flex-col bg-linear-to-b from-blue-50 to-white">
	<LoginHeader />

	<main class="flex grow items-center justify-center px-4 pt-24">
		<LoginForm />
	</main>

	<Footer />
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
