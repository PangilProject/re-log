<script lang="ts">
	export let label: string;
	export let loading = false;
	export let onClick: () => void;
	export let variant: 'default' | 'google' = 'default';
</script>

<button
	on:click={onClick}
	disabled={loading}
	class={`
		flex w-full items-center justify-center gap-2 rounded-lg py-3 transition hover:cursor-pointer disabled:opacity-50
		${
			variant === 'google'
				? 'border border-(--border-color) bg-(--white) text-(--brand-secondary-dark) shadow-sm hover:bg-(--surface-light)'
				: 'bg-(--brand-primary) text-(--white) hover:bg-(--brand-primary-dark)'
		}
	`}
>
	{#if variant === 'google'}
		<img src="/google-logo.png" alt="google icon" class="h-5 w-5" />
	{/if}

	{loading ? `${label} 중...` : label}
</button>
