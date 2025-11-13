<script lang="ts">
	import PublicPageLayout from '$lib/components/layout/PublicPageLayout.svelte';
	import { Toaster } from 'svelte-5-french-toast';
</script>

<PublicPageLayout>
	<slot />
	<Toaster />
</PublicPageLayout>
