<!-- src/lib/components/common/PromptModal.svelte -->
<script lang="ts">
	import { promptStore } from '$lib/stores/ui/promptStore';
	import { onMount } from 'svelte';
	let inputValue = '';

	function handleConfirm(value: boolean) {
		promptStore.update((s) => {
			s.isOpen = false;
			s.resolve(value ? inputValue : null);
			return s;
		});
		inputValue = '';
	}

	function handleGlobalKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			handleConfirm(false);
		}
		if (event.key === 'Enter') {
			handleConfirm(true);
		}
	}

	let storeValue;

	onMount(() => {
		const unsubscribe = promptStore.subscribe((v) => {
			storeValue = v;
		});

		document.addEventListener('keydown', handleGlobalKeydown);

		return () => {
			document.removeEventListener('keydown', handleGlobalKeydown);
			unsubscribe();
		};
	});
</script>

{#if $promptStore.isOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
		<div
			class="animate-fadeIn w-[90%] max-w-sm rounded-xl border border-(--border-muted) bg-(--white) p-5 shadow-lg"
		>
			<p class="mb-4 text-center text-sm font-medium text-(--text-primary)">
				{$promptStore.message}
			</p>

			<input
				type="password"
				bind:value={inputValue}
				on:keydown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault();
						handleConfirm(true);
					}
				}}
				placeholder={$promptStore.placeholder ?? '내용을 입력하세요'}
				class="mb-5 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
			/>

			<div class="flex justify-center gap-3">
				<button
					on:click={() => handleConfirm(false)}
					class="rounded-md border px-4 py-1.5 text-sm text-(--brand-secondary-dark) hover:cursor-pointer hover:bg-gray-100"
				>
					취소
				</button>
				<button
					on:click={() => handleConfirm(true)}
					class="rounded-md bg-blue-500 px-4 py-1.5 text-sm text-(--white) hover:cursor-pointer hover:bg-(--brand-primary)"
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
			transform: translateY(10px);
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
