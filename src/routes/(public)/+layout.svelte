<script lang="ts">
	import PublicPageLayout from '$lib/components/layout/PublicPageLayout.svelte';
	import { Toaster } from 'svelte-5-french-toast';
	import FeedbackModal from '$lib/components/common/FeedbackModal.svelte';
</script>

<PublicPageLayout>
	<slot />
	<Toaster />
	<FeedbackModal />
</PublicPageLayout>
