<script lang="ts">
	import { viewPostModalStore } from '$lib/stores/ui/viewPostModalStore';
	import { formatDate } from '$lib/utils/formatDate';
	import { RETROSPECT_KPT_SECTIONS, RETROSPECT_SECTIONS } from '$lib/constants/retrospect_sections';
	import type { RetrospectAnswers, RetrospectAnswersKPT } from '@/types/retrospect';
	import { onMount, onDestroy } from 'svelte';

	function closeModal() {
		viewPostModalStore.set({ isOpen: false, post: null });
	}

	function handleGlobalKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}

	onMount(() => {
		document.addEventListener('keydown', handleGlobalKeydown);
	});

	onDestroy(() => {
		document.removeEventListener('keydown', handleGlobalKeydown);
	});
</script>

{#if $viewPostModalStore.isOpen && $viewPostModalStore.post}
	{@const post = $viewPostModalStore.post}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
		role="presentation"
		on:click={closeModal}
	>
		<div
			class="animate-fadeIn border-border bg-background w-[90%] max-w-2xl rounded-xl border bg-white p-6 shadow-lg"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			tabindex="-1"
		>
			<h2 id="modal-title" class="text-text-primary mb-2 text-2xl font-bold">{post.title}</h2>
			<div class="text-text-secondary mb-6 flex items-center gap-4 text-sm">
				<span>{post.authorName}</span>
				<span>{formatDate(post.createdAt)}</span>
			</div>

			<div class="max-h-[60vh] overflow-y-auto pr-4">
				{#if post.type === 'kpt'}
					{@const answers = post.answers as RetrospectAnswersKPT}
					{#each RETROSPECT_KPT_SECTIONS as section}
						<div class="mb-4">
							<h3 class="text-text-primary text-lg font-semibold">{section.label}</h3>
							<p class="text-text-secondary whitespace-pre-wrap">{answers[section.key]}</p>
						</div>
					{/each}
				{:else}
					{@const answers = post.answers as RetrospectAnswers}
					{#each RETROSPECT_SECTIONS as section}
						<div class="mb-4">
							<h3 class="text-text-primary text-lg font-semibold">{section.label}</h3>
							<p class="text-text-secondary whitespace-pre-wrap">{answers[section.key]}</p>
						</div>
					{/each}
				{/if}
			</div>

			<div class="mt-6 flex justify-end">
				<button
					type="button"
					on:click={closeModal}
					class="text-brand-secondary-dark rounded-md border px-4 py-1.5 text-sm hover:bg-gray-100"
				>
					닫기
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
