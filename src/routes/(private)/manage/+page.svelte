<script lang="ts">
	import { onMount } from 'svelte';
	import { getAllUsers } from '$lib/services/userService';
	import { getAllRetrospects } from '$lib/services/retrospectService';
	import CountCard from '$lib/components/feedback/CountCard.svelte';
	import ChartCard from '$lib/components/feedback/ChartCard.svelte';
	import type { UserDoc } from '@/types/interfaces/user';
	import type { RetrospectDoc } from '@/types/interfaces/retrospect';
	import { groupDataByDay } from '$lib/utils/chart/groupDataByDay';

	let isLoading = true;
	let totalUsers = 0;
	let totalPosts = 0;

	let usersByDay: Map<string, number> | undefined;
	let postsByDay: Map<string, number> | undefined;

	async function fetchData() {
		isLoading = true;

		const [usersRes, retrospectsRes] = await Promise.all([getAllUsers(), getAllRetrospects()]);

		if (usersRes.success && usersRes.users) {
			totalUsers = usersRes.users.length;
			usersByDay = groupDataByDay(usersRes.users as UserDoc[]);
		}

		if (retrospectsRes.success && retrospectsRes.retrospects) {
			totalPosts = retrospectsRes.retrospects.length;
			postsByDay = groupDataByDay(retrospectsRes.retrospects as RetrospectDoc[]);
		}

		isLoading = false;
	}

	onMount(fetchData);
</script>

<div class="mb-4 flex justify-end">
	<button
		on:click={fetchData}
		disabled={isLoading}
		class="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
	>
		새로고침
	</button>
</div>

{#if isLoading}
	<p>데이터를 불러오는 중...</p>
{:else}
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
		<CountCard cardTitle="총 사용자 수" count={totalUsers} suffix="명" />
		<CountCard cardTitle="총 회고 수" count={totalPosts} suffix="개" />
	</div>

	<div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
		{#if usersByDay}
			<ChartCard cardTitle="일일 가입자 수" data={usersByDay} />
		{/if}

		{#if postsByDay}
			<ChartCard cardTitle="일일 작성된 글 수" data={postsByDay} />
		{/if}
	</div>
{/if}
