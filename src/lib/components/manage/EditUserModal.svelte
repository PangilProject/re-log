<script lang="ts">
	import { editUserModalStore } from '$lib/stores/ui/editUserModalStore';
	import { updateUserProfile } from '$lib/services/userService';
	import toast from 'svelte-5-french-toast';

	let displayName = '';
	let user = $editUserModalStore.user;

	$: {
		if ($editUserModalStore.user) {
			displayName = $editUserModalStore.user.displayName || '';
			user = $editUserModalStore.user;
		}
	}

	function closeModal() {
		editUserModalStore.update((s) => ({ ...s, isOpen: false }));
	}

	async function handleSave() {
		if (!user) return;

		const { success, error } = await updateUserProfile(user, { displayName });

		if (success) {
			toast.success('사용자 정보가 수정되었습니다.');
			editUserModalStore.update((s) => {
				s.resolve({ ...user, displayName });
				return s;
			});
			closeModal();
		} else {
			toast.error('사용자 정보 수정에 실패했습니다.');
			console.error(error);
		}
	}
</script>

{#if $editUserModalStore.isOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
		<div
			class="animate-fadeIn w-[90%] max-w-sm rounded-xl border border-(--border-muted) bg-(--white) p-5 shadow-lg"
		>
			<h2 class="mb-4 text-center text-lg font-semibold text-(--text-primary)">사용자 정보 수정</h2>

			<div class="mb-4">
				<label for="displayName" class="mb-1 block text-sm font-medium text-(--text-secondary)"
					>이름</label
				>
				<input
					type="text"
					id="displayName"
					bind:value={displayName}
					class="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
				/>
			</div>

			<div class="flex justify-center gap-3">
				<button
					on:click={closeModal}
					class="rounded-md border px-4 py-1.5 text-sm text-(--brand-secondary-dark) hover:bg-gray-100"
				>
					취소
				</button>
				<button
					on:click={handleSave}
					class="rounded-md bg-blue-500 px-4 py-1.5 text-sm text-(--white) hover:bg-(--brand-primary)"
				>
					저장
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
