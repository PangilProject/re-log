<script lang="ts">
	import PublicLayout from '$lib/components/layout/PublicLayout.svelte';
	import PrivateLayout from '$lib/components/layout/PrivateLayout.svelte';
	import DetailContainer from '$lib/components/detail/DetailContainer.svelte';
	import PrivateHeader from '$lib/components/layout/PrivateHeader.svelte';

	export let data;
</script>

{#if data.isLoggedIn}
	<PrivateLayout>
		<PrivateHeader />
		<div class="mt-20">
			<DetailContainer shareMode={true} isLoggedIn={data.isLoggedIn} />
		</div>
	</PrivateLayout>
{:else}
	<PublicLayout>
		<div class="mt-20">
			<DetailContainer shareMode={true} />
		</div>
	</PublicLayout>
{/if}
