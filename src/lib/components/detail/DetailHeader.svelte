<script lang="ts">
	import { openConfirm } from '$lib/utils/confirm';
	import {
		successDeleteRetrospect,
		errorEmptyDocID,
		successCopyURL,
		errorCopyURL
	} from '$lib/utils/toast';
	import { page } from '$app/stores';
	import { deleteRetrospect } from '$lib/stores/list/listActions';
	import { goToModify } from '$lib/utils/navigation';
	import { openShareAlert } from '$lib/utils/alert';
	import { Pencil, Share2, Trash2 } from 'lucide-svelte';

	export let title: string;
	export let createdAt: any;
	export let isAuthenticated: boolean;
	export let shareMode: boolean;
	const docId = $page?.params?.id;

	async function handleDelete() {
		if (!(await openConfirm('회고를 삭제하시겠습니까?'))) {
			return;
		}
		successDeleteRetrospect();
		await deleteRetrospect(String(docId));
	}

	function handleUpdate() {
		if (docId) {
			goToModify(docId);
		} else {
			errorEmptyDocID();
		}
	}
	function handleShare() {
		const shareURL = 'https://re-log-920ae.web.app/share/' + docId;
		// const shareURL = 'localhost:5173/share/' + docId;
		navigator.clipboard
			.writeText(shareURL)
			.then(() => {
				if (docId) openShareAlert(docId);
			})
			.catch((err) => {
				errorCopyURL();
				console.error('복사 실패:', err);
			});
	}
</script>

<h2>{title}</h2>
<div class="items flex justify-center text-[0.9rem]">
	<div
		class="mt-3 mb-8 flex min-w-[180px] flex-row items-start justify-center gap-3"
		class:gap-3={isAuthenticated}
	>
		<p class="date">
			{createdAt ? new Date(createdAt.seconds * 1000).toLocaleDateString() : '작성일 없음'}
		</p>
		{#if isAuthenticated && !shareMode}
			<div class="flex items-center gap-2 text-sm">
				<button
					class="flex items-center gap-0.5 font-medium text-blue-600 hover:text-blue-400"
					onclick={handleUpdate}
				>
					<Pencil class="h-4 w-4" /> 수정
				</button>

				<button
					class="flex items-center gap-0.5 font-medium text-red-500 hover:text-red-400"
					onclick={handleDelete}
				>
					<Trash2 class="h-4 w-4" /> 삭제
				</button>

				<button
					class="flex items-center gap-0.5 font-medium text-gray-600 hover:text-gray-400"
					onclick={handleShare}
				>
					<Share2 class="h-4 w-4" /> 공유
				</button>
			</div>
		{/if}
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
		/* text-decoration-line: underline; */
		cursor: pointer;
	}
</style>
