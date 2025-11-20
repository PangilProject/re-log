<script lang="ts">
	import { confirmStore } from '$lib/stores/ui/confirmStore';
	import { onMount } from 'svelte';

	function handleConfirm(value: boolean) {
		confirmStore.update((s) => {
			s.isOpen = false;
			s.resolve(value);
			return s;
		});
	}

	function handleGlobalKeydown(event: KeyboardEvent) {
		if (!$confirmStore.isOpen) return;

		if (event.key === 'Escape') {
			event.preventDefault();
			event.stopPropagation();
			handleConfirm(false);
		}
		if (event.key === 'Enter') {
			event.preventDefault();
			event.stopPropagation();
			handleConfirm(true);
		}
	}

	onMount(() => {
		document.addEventListener('keydown', handleGlobalKeydown);

		return () => {
			document.removeEventListener('keydown', handleGlobalKeydown);
		};
	});
</script>

{#if $confirmStore.isOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
		<div
			class="animate-fadeIn w-[90%] max-w-sm rounded-xl border border-(--border-muted) bg-(--white) p-5 shadow-lg"
		>
			<p class="mb-5 text-center text-sm font-medium text-(--text-primary)">
				{$confirmStore.message}
			</p>

			<div class="flex justify-center gap-3">
				<button
					on:click={() => handleConfirm(false)}
					class="rounded-md border px-4 py-1.5 text-sm text-(--brand-secondary-dark) transition-colors hover:cursor-pointer hover:bg-gray-100"
				>
					취소
				</button>

				<button
					on:click={() => handleConfirm(true)}
					class="rounded-md bg-blue-500 px-4 py-1.5 text-sm text-(--white) transition-colors hover:cursor-pointer hover:bg-(--brand-primary)"
				>
					확인
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-fadeIn {
		animation: fadeIn 0.2s ease-out;
	}
</style>
