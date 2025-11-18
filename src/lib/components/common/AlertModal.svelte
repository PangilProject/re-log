<script lang="ts">
	import { alertStore } from '$lib/stores/ui/alertStore';
	import { goto } from '$app/navigation';
	import { TOAST_MESSAGES } from '$lib/constants/toastMessages';

	function handleConfirm() {
		alertStore.update((s) => {
			s.isOpen = false;
			s.resolve();
			return s;
		});
	}

	function handleShareNavigation() {
		const url = $alertStore.url;
		if (url) {
			goto(url);
			handleConfirm(); // Close modal after navigation
		}
	}
</script>

{#if $alertStore.isOpen}
	<!-- ✅ 백드롭 -->
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
		<!-- ✅ 본문 카드 -->
		<div
			class="animate-fadeIn w-[90%] max-w-sm rounded-xl border border-(--border-muted) bg-(--white) p-5 shadow-lg"
		>
			<p class="mb-5 text-center text-sm font-medium text-(--text-primary)">
				{#if $alertStore.mode === 'share'}
					{TOAST_MESSAGES.COPY_SUCCESS}
				{:else}
					{$alertStore.message}
				{/if}
			</p>

			<div class="flex justify-center gap-3">
				{#if $alertStore.mode === 'share'}
					<button
						on:click={handleShareNavigation}
						class="rounded-md border border-blue-500 bg-transparent px-4 py-1.5 text-sm text-blue-500 transition-colors hover:bg-blue-50"
					>
						바로 이동하기
					</button>
				{/if}

				<button
					on:click={handleConfirm}
					class="rounded-md bg-blue-500 px-4 py-1.5 text-sm text-white transition-colors hover:bg-blue-600"
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
