<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';

	// ✅ Props
	export let label: string = '';
	export let options: { label: string; value: string }[] = [];
	export let selected: Writable<string>;

	let isOpen = writable(false);

	const toggleOpen = () => isOpen.update((v) => !v);
	const selectOption = (value: string) => {
		selected.set(value);
		isOpen.set(false);
	};

	let dropdownRef: HTMLDivElement | null = null;
	onMount(() => {
		function handleClickOutside(e: MouseEvent) {
			if (!dropdownRef) return;

			// 드롭다운 외부 클릭하면 닫기
			if (!$isOpen) return;
			if (!dropdownRef.contains(e.target as Node)) {
				isOpen.set(false);
			}
		}

		function handleEscape(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				isOpen.set(false);
			}
		}

		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
		};
	});
</script>

<div class="relative flex items-center text-left" bind:this={dropdownRef}>
	{#if label}
		<label class="mr-2 text-sm text-(--brand-secondary)" for="button">{label}</label>
	{/if}

	<!-- 버튼 -->
	<button
		id="button"
		type="button"
		class="flex items-center justify-between gap-1 rounded-md border px-3 py-1 text-sm font-medium text-(--brand-secondary-dark) shadow-sm hover:cursor-pointer hover:bg-(--surface-light) focus:ring-2 focus:ring-blue-400"
		on:click={toggleOpen}
	>
		{#if $selected}
			{options.find((o) => o.value === $selected)?.label ?? '선택'}
		{:else}
			선택
		{/if}

		<svg
			class="h-4 w-4 text-(--text-secondary) transition-transform duration-150"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			style="transform: {$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>

	<!-- 드롭다운 메뉴 -->
	{#if $isOpen}
		<div
			class="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md border bg-(--white) shadow-lg ring-1 ring-black/5"
		>
			{#each options as opt}
				<button
					class="block w-full px-4 py-2 text-left text-sm hover:cursor-pointer hover:rounded-md hover:bg-gray-100"
					on:click={() => selectOption(opt.value)}
				>
					{opt.label}
				</button>
			{/each}
		</div>
	{/if}
</div>
