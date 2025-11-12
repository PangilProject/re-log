<script lang="ts">
	import PrivateLayout from '$lib/components/layout/PrivateLayout.svelte';
	import WriteContainer from '$lib/components/write/WriteContainer.svelte';
</script>

<PrivateLayout>
	<WriteContainer mode="modify" />
</PrivateLayout>
