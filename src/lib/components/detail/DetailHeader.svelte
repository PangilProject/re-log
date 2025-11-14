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

	export let title: string;
	export let createdAt: any;
	export let isAuthenticated: boolean;
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
				successCopyURL();
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
		class="mt-3 mb-8 flex min-w-[180px] flex-row items-start"
		class:justify-between={isAuthenticated}
		class:justify-center={!isAuthenticated}
	>
		<p class="date">
			{createdAt ? new Date(createdAt.seconds * 1000).toLocaleDateString() : '작성일 없음'}
		</p>
		{#if isAuthenticated}
			<div class="flex items-center gap-2">
				<button class="text-blue-500 hover:text-blue-300" onclick={handleUpdate}>수정</button>
				<button
					class="text-(--brand-accent) hover:text-(--brand-accent-light)"
					onclick={handleDelete}
				>
					삭제
				</button>
				<button class="text-(--brand-secondary) hover:text-(--border-color)" onclick={handleShare}
					>공유</button
				>
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
		text-decoration-line: underline;
	}
</style>
