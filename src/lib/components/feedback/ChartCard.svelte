<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Chart, registerables } from 'chart.js';

	// 반드시 필요! (없으면 차트가 절대 안 보임)
	Chart.register(...registerables);

	export let cardTitle: string;
	export let data: Map<string, number>;

	let canvas: HTMLCanvasElement;
	let chart: Chart | undefined;

	function render() {
		if (!canvas) return;

		const labels = [...data.keys()];
		const values = [...data.values()];

		if (chart) chart.destroy();

		chart = new Chart(canvas, {
			type: 'bar',
			data: {
				labels,
				datasets: [
					{
						label: cardTitle,
						data: values,
						backgroundColor: 'rgba(37, 99, 235, 0.6)',
						borderColor: 'rgba(37, 99, 235, 1)',
						borderWidth: 1
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: { beginAtZero: true }
				}
			}
		});
	}

	onMount(() => {
		if (data) render();
	});

	$: if (canvas && data) {
		render();
	}

	onDestroy(() => {
		if (chart) chart.destroy();
	});
</script>

<div class="rounded-lg border border-(--border-color) bg-white p-6 shadow-sm">
	<h3 class="mb-4 text-lg font-semibold">{cardTitle}</h3>
	<div class="h-64">
		<canvas bind:this={canvas}></canvas>
	</div>
</div>
