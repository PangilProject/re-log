<script lang="ts">
	import LoginRegisterHeader from '$lib/components/layout/LoginRegisterHeader.svelte';
	import RegisterForm from '$lib/components/auth/RegisterForm.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
</script>

<div class="flex min-h-screen flex-col bg-linear-to-b from-blue-50 to-white">
	<LoginRegisterHeader />

	<main class="flex grow items-center justify-center px-4 pt-24">
		<RegisterForm />
	</main>

	<Footer />
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
