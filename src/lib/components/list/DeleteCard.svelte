<script lang="ts">
	import { get } from 'svelte/store';
	import {
		isDeleteMode,
		toggleDeleteMode,
		selectedRetrospects,
		clearSelection
	} from '$lib/stores/list/listSelectionStore';
	import { deleteRetrospects } from '$lib/stores/list/listActions';
	import { Trash } from 'lucide-svelte';
	import { successDeleteRetrospect, errorChoiceToast } from '$lib/utils/toast';
	import { openConfirm } from '$lib/utils/confirm';

	let isDeleting = false;

	async function handleDelete() {
		const ids = get(selectedRetrospects);
		if (ids.length === 0) {
			errorChoiceToast();
			return;
		}

		if (!(await openConfirm(`${ids.length}개의 회고를 삭제하시겠습니까?`))) {
			return;
		}

		successDeleteRetrospect();
		isDeleting = true;
		await deleteRetrospects(ids);
		clearSelection();
		isDeleting = false;
		toggleDeleteMode(); // 삭제 후 모드 해제
	}
</script>

<!-- ✅ 삭제 모드 아닐 때 -->
{#if !$isDeleteMode}
	<button
		on:click={toggleDeleteMode}
		class="ml-3 rounded-md bg-(--brand-accent) px-3 py-1 text-sm text-(--white) shadow-sm hover:bg-(--brand-accent-dark)"
	>
		<Trash size="16" class="my-1" />
	</button>
{:else}
	<!-- ✅ 삭제 모드일 때 -->
	<div class="flex items-center gap-2">
		<button
			on:click={handleDelete}
			disabled={isDeleting}
			class="ml-2 rounded-md bg-(--brand-accent) px-3 py-1 text-sm text-(--white) shadow-sm hover:bg-(--brand-accent-dark) disabled:opacity-50"
		>
			{isDeleting ? '삭제 중...' : '선택 삭제'}
		</button>

		<button
			on:click={toggleDeleteMode}
			class="rounded-md border px-3 py-1 text-sm text-(--brand-secondary) hover:bg-gray-100"
		>
			취소
		</button>
	</div>
{/if}
