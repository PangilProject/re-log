<script lang="ts">
	import ConfirmModal from '$lib/components/common/ConfirmModal.svelte';
	import PromptModal from '$lib/components/common/PromptModal.svelte';
	import PrivatePageLayout from '$lib/components/layout/PrivatePageLayout.svelte';
	import { Toaster } from 'svelte-5-french-toast';
</script>

<PrivatePageLayout>
	<slot />
	<Toaster />
	<ConfirmModal />
	<PromptModal />
</PrivatePageLayout>
