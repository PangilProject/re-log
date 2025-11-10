<script lang="ts">
	import type { Writable } from 'svelte/store';
	import Dropdown from '$lib/components/common/Dropdown.svelte';

	export let searchQuery: Writable<string>;
	export let sortOrder: Writable<'asc' | 'desc'>;

	const sortOptions = [
		{ label: '최신순', value: 'desc' },
		{ label: '오래된순', value: 'asc' }
	];
</script>

<div class="mb-6 flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
	<!-- 🔍 검색 -->
	<input
		type="text"
		placeholder="제목으로 검색..."
		bind:value={$searchQuery}
		class="w-[98%] rounded-md border-none px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none sm:w-[48.5%]"
	/>

	<!-- ⏱️ 정렬 -->
	<Dropdown label="정렬:" selected={sortOrder} options={sortOptions} />
</div>
