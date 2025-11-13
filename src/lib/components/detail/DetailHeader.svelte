<script lang="ts">
	import { openConfirm } from '$lib/utils/confirm';
	import { successDeleteRetrospect, errorEmptyDocID } from '$lib/utils/toast';
	import { page } from '$app/stores';
	import { deleteRetrospect } from '$lib/stores/list/listActions';
	import { goToModify } from '$lib/utils/navigation';

	export let title: string;
	export let createdAt: any;

	async function handleDelete() {
		if (!(await openConfirm('회고를 삭제하시겠습니까?'))) {
			return;
		}
		const id = $page?.params?.id;
		successDeleteRetrospect();
		await deleteRetrospect(String(id));
	}

	function handleUpdate() {
		const docId = $page?.params?.id;
		if (docId) {
			goToModify(docId);
		} else {
			errorEmptyDocID();
		}
	}
</script>

<h2>{title}</h2>
<div class="items flex justify-center text-[0.9rem]">
	<div class="mt-3 mb-8 flex min-w-[180px] flex-row items-start justify-between">
		<p class="date">
			{createdAt ? new Date(createdAt.seconds * 1000).toLocaleDateString() : '작성일 없음'}
		</p>
		<div class="flex items-center gap-2">
			<button class="text-blue-500 hover:text-blue-300" onclick={handleUpdate}>수정</button>
			<button
				class="text-(--brand-accent) hover:text-(--brand-accent-light)"
				onclick={handleDelete}
			>
				삭제
			</button>
		</div>
	</div>
</div>

<style>
	h2 {
		font-size: 1.8rem;
		font-weight: 700;
		color: #1e3a8a;
		text-align: center;
		margin-bottom: 0.3rem;
	}
	.date {
		color: #6b7280;
	}
	button {
		text-decoration-line: underline;
	}
</style>
