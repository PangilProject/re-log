import { Chart } from 'chart.js';

export function renderChart(
	canvas: HTMLCanvasElement,
	label: string,
	data: Map<string, number>
): Chart | undefined {
	if (!canvas) return undefined;

	return new Chart(canvas, {
		type: 'bar',
		data: {
			labels: [...data.keys()],
			datasets: [
				{
					label,
					data: [...data.values()],
					backgroundColor: 'rgba(37,99,235,0.6)',
					borderColor: 'rgba(37,99,235,1)',
					borderWidth: 1
				}
			]
		},
		options: {
			scales: {
				y: { beginAtZero: true }
			},
			responsive: true,
			maintainAspectRatio: false
		}
	});
}
