<script lang="ts">
	import toast from 'svelte-5-french-toast';

	export let onClick: () => Promise<void>;

	async function handleClick() {
		await onClick();
		toast.success('임시저장 되었습니다.');
	}
</script>

<button
	on:click={handleClick}
	class="fixed right-8 bottom-8 z-50 flex h-14 items-center gap-2 rounded-full bg-(--brand-secondary-dark) px-4 text-(--white) shadow-lg transition-transform hover:scale-110 hover:bg-(--text-primary)"
	aria-label="임시저장"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
		/>
	</svg>

	<span class="text-sm font-medium">임시 저장</span>
</button>
