<script lang="ts">
	import { confirmStore } from '$lib/stores/ui/confirmStore';

	function handleConfirm(value: boolean) {
		confirmStore.update((s) => {
			s.isOpen = false;
			s.resolve(value);
			return s;
		});
	}
</script>

{#if $confirmStore.isOpen}
	<!-- ✅ 백드롭 -->
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
		<!-- ✅ 본문 카드 -->
		<div
			class="animate-fadeIn w-[90%] max-w-sm rounded-xl border border-gray-200 bg-white p-5 shadow-lg"
		>
			<p class="mb-5 text-center text-sm font-medium text-gray-800">
				{$confirmStore.message}
			</p>

			<div class="flex justify-center gap-3">
				<button
					on:click={() => handleConfirm(false)}
					class="rounded-md border px-4 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-100"
				>
					취소
				</button>

				<button
					on:click={() => handleConfirm(true)}
					class="rounded-md bg-blue-500 px-4 py-1.5 text-sm text-white transition-colors hover:bg-blue-600"
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
