<script lang="ts">
	import { page } from '$app/stores';
	import PrivateLayout from '$lib/components/layout/PrivateLayout.svelte';
	import WriteContainer from '$lib/components/write/WriteContainer.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { resetWriteStore, retrospectType } from '$lib/stores/write/writeStore';

	onMount(() => {
		const typeParam = $page.params.type;

		if (typeParam === 'kpt' || typeParam === 'daily') {
			retrospectType.set(typeParam);
		} else {
			retrospectType.set('daily');
		}

		resetWriteStore();
	});

	onDestroy(() => {
		resetWriteStore();
		retrospectType.set('daily');
	});
</script>

<PrivateLayout>
	<WriteContainer mode="write" />
</PrivateLayout>
