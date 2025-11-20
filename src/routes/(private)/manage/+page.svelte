<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import { format, startOfDay } from 'date-fns';
	import { getAllUsers } from '$lib/services/userService';
	import { getAllRetrospects } from '$lib/services/retrospectService';
	import type { DocumentData, Timestamp } from 'firebase/firestore';
	import { SvelteMap } from 'svelte/reactivity';

	Chart.register(...registerables);

	interface UserDoc extends DocumentData {
		uid: string;
		displayName: string;
		email: string;
		createdAt: Timestamp;
	}

	interface RetrospectDoc extends DocumentData {
		id: string;
		title: string;
		userId: string;
		createdAt: Timestamp;
	}

	let totalUsers = 0;
	let totalPosts = 0;
	let isLoading = true;

	let usersCanvas: HTMLCanvasElement;
	let postsCanvas: HTMLCanvasElement;
	let usersChart: Chart | undefined;
	let postsChart: Chart | undefined;

	async function fetchData() {
		isLoading = true;

		if (usersChart) {
			usersChart.destroy();
		}
		if (postsChart) {
			postsChart.destroy();
		}

		const [usersRes, retrospectsRes] = await Promise.all([getAllUsers(), getAllRetrospects()]);

		let usersByDay: Map<string, number> | undefined;
		if (usersRes.success && usersRes.users) {
			totalUsers = usersRes.users.length;
			usersByDay = groupDataByDay(usersRes.users as UserDoc[]);
		}

		let postsByDay: Map<string, number> | undefined;
		if (retrospectsRes.success && retrospectsRes.retrospects) {
			totalPosts = retrospectsRes.retrospects.length;
			postsByDay = groupDataByDay(retrospectsRes.retrospects as RetrospectDoc[]);
		}

		isLoading = false;
		await tick(); // Wait for the DOM to update

		if (usersByDay) {
			usersChart = renderChart(usersCanvas, '일일 가입자 수', usersByDay);
		}
		if (postsByDay) {
			postsChart = renderChart(postsCanvas, '일일 작성된 글 수', postsByDay);
		}
	}

	onMount(fetchData);

	function groupDataByDay(data: (UserDoc | RetrospectDoc)[]) {
		const grouped = new SvelteMap<string, number>();
		for (const item of data) {
			if (item.createdAt) {
				const day = format(startOfDay(item.createdAt.toDate()), 'yyyy-MM-dd');
				grouped.set(day, (grouped.get(day) || 0) + 1);
			}
		}
		return new SvelteMap([...grouped.entries()].sort());
	}

	function renderChart(canvas: HTMLCanvasElement, label: string, data: Map<string, number>) {
		if (!canvas) {
			return;
		}
		return new Chart(canvas, {
			type: 'bar',
			data: {
				labels: [...data.keys()],
				datasets: [
					{
						label: label,
						data: [...data.values()],
						backgroundColor: 'rgba(37, 99, 235, 0.6)',
						borderColor: 'rgba(37, 99, 235, 1)',
						borderWidth: 1
					}
				]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
						ticks: {
							stepSize: 1
						}
					}
				},
				responsive: true,
				maintainAspectRatio: false
			}
		});
	}
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
		<div class="rounded-lg border border-(--border-color) bg-white p-6 shadow-sm">
			<h2 class="text-lg font-medium text-(--text-secondary)">총 사용자 수</h2>
			<p class="mt-2 text-3xl font-bold text-(--text-primary)">{totalUsers} 명</p>
		</div>
		<div class="rounded-lg border border-(--border-color) bg-white p-6 shadow-sm">
			<h2 class="text-lg font-medium text-(--text-secondary)">총 회고 수</h2>
			<p class="mt-2 text-3xl font-bold text-(--text-primary)">{totalPosts} 개</p>
		</div>
	</div>

	<div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
		<div class="rounded-lg border border-(--border-color) bg-white p-6 shadow-sm">
			<h3 class="mb-4 text-lg font-semibold">일일 가입자 수</h3>
			<div class="h-64">
				<canvas bind:this={usersCanvas}></canvas>
			</div>
		</div>
		<div class="rounded-lg border border-(--border-color) bg-white p-6 shadow-sm">
			<h3 class="mb-4 text-lg font-semibold">일일 작성된 글 수</h3>
			<div class="h-64">
				<canvas bind:this={postsCanvas}></canvas>
			</div>
		</div>
	</div>
{/if}
