<script lang="ts">
	import PrivatePageLayout from '$lib/components/layout/PrivatePageLayout.svelte';
	import { Toaster } from 'svelte-5-french-toast';
</script>

<PrivatePageLayout>
	<slot />
	<Toaster />
</PrivatePageLayout>
