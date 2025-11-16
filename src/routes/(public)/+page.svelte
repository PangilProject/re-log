<script lang="ts">
	import PublicLayout from '$lib/components/layout/PublicLayout.svelte';
	import HeroSection from '$lib/components/landing/HeroSection.svelte';
	import ServiceIntroSection from '$lib/components/landing/ServiceIntroSection.svelte';
	import CTASection from '$lib/components/landing/CTASection.svelte';
</script>

<svelte:head>
	<title>re-log</title>
</svelte:head>

<PublicLayout>
	<HeroSection />
	<ServiceIntroSection />
	<CTASection />
</PublicLayout>
