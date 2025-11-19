<script lang="ts">
	import AlertModal from '$lib/components/common/AlertModal.svelte';
	import ChooseRetrospectTypeModal from '$lib/components/common/ChooseRetrospectTypeModal.svelte';
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
	<AlertModal />
	<ChooseRetrospectTypeModal />
</PrivatePageLayout>
