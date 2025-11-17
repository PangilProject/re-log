<script lang="ts">
	import { viewPostModalStore } from '$lib/stores/ui/viewPostModalStore';
	import { formatDate } from '$lib/utils/formatDate';

	function closeModal() {
		viewPostModalStore.set({ isOpen: false, post: null });
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}
</script>

{#if $viewPostModalStore.isOpen && $viewPostModalStore.post}
	{@const post = $viewPostModalStore.post}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
		role="button"
		tabindex="0"
		on:click={closeModal}
		on:keydown={handleKeydown}
	>
		<div
			class="animate-fadeIn w-[90%] max-w-2xl rounded-xl border border-(--border-muted) bg-white p-6 shadow-lg"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			on:click|stopPropagation
		>
			<h2 id="modal-title" class="mb-2 text-2xl font-bold text-(--text-primary)">{post.title}</h2>
			<div class="mb-6 flex items-center gap-4 text-sm text-(--text-secondary)">
				<span>{post.authorName}</span>
				<span>{formatDate(post.createdAt)}</span>
			</div>

			<div class="max-h-[60vh] overflow-y-auto pr-4">
				<div class="mb-4">
					<h3 class="text-lg font-semibold text-(--text-primary)">오늘의 회고</h3>
					<p class="text-(--text-secondary)">{post.answers.today}</p>
				</div>
				<div class="mb-4">
					<h3 class="text-lg font-semibold text-(--text-primary)">문제점 / 개선점</h3>
					<p class="text-(--text-secondary)">{post.answers.problem}</p>
				</div>
				<div class="mb-4">
					<h3 class="text-lg font-semibold text-(--text-primary)">새롭게 배운 점</h3>
					<p class="text-(--text-secondary)">{post.answers.learned}</p>
				</div>
				<div class="mb-4">
					<h3 class="text-lg font-semibold text-(--text-primary)">내일의 목표</h3>
					<p class="text-(--text-secondary)">{post.answers.tomorrow}</p>
				</div>
				<div class="mb-4">
					<h3 class="text-lg font-semibold text-(--text-primary)">한 줄 요약</h3>
					<p class="text-(--text-secondary)">{post.answers.summary}</p>
				</div>
			</div>

			<div class="mt-6 flex justify-end">
				<button
					on:click={closeModal}
					class="rounded-md border px-4 py-1.5 text-sm text-(--brand-secondary-dark) hover:bg-gray-100"
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
