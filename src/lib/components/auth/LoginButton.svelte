<!-- src/lib/components/common/LoadingButton.svelte -->
<script lang="ts">
	export let label: string;
	export let loading = false;
	export let color = 'bg-blue-600 hover:bg-blue-700';
	export let onClick: () => void;
</script>

<button
	onclick={onClick}
	disabled={loading}
	class={`rounded-lg ${color} py-3 font-semibold text-white transition disabled:opacity-50`}
>
	{loading ? `${label} 중...` : label}
</button>
