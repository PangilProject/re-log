<script lang="ts">
	export let count: number;
	export let cardTitle: string;
	export let suffix: string = '';
</script>

<div class="rounded-lg border border-(--border-color) bg-white p-6 shadow-sm">
	<h2 class="text-lg font-medium text-(--text-secondary)">{cardTitle}</h2>
	<p class="mt-2 text-3xl font-bold text-(--text-primary)">
		{count}{suffix}
	</p>
</div>
