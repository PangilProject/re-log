<script lang="ts">
	import { onMount } from 'svelte';
	import { getAllRetrospects } from '$lib/services/retrospectService';
	import { getAllUsers } from '$lib/services/userService';
	import type { RetrospectDocument } from '$lib/types/retrospect';
	import { formatDate } from '$lib/utils/formatDate';
	import ViewPostModal from '$lib/components/manage/ViewPostModal.svelte';
	import { openViewPostModal } from '$lib/stores/ui/viewPostModalStore';

	interface RetrospectWithAuthor extends RetrospectDocument {
		id: string;
		authorName?: string;
	}

	let retrospects: RetrospectWithAuthor[] = [];
	let isLoading = true;

	onMount(async () => {
		const [retrospectsRes, usersRes] = await Promise.all([
			getAllRetrospects(),
			getAllUsers()
		]);

		if (retrospectsRes.success && usersRes.success) {
			const userMap = new Map(usersRes.users?.map((user) => [user.uid, user.displayName]));
			retrospects = (retrospectsRes.retrospects as RetrospectWithAuthor[])?.map((r) => ({
				...r,
				authorName: userMap.get(r.userId) || '알 수 없음'
			}));
		} else {
			console.error('회고 또는 사용자 목록 조회 실패:', retrospectsRes.error || usersRes.error);
		}

		isLoading = false;
	});

	function handleRowClick(post: RetrospectWithAuthor) {
		openViewPostModal(post);
	}
</script>

{#if isLoading}
	<p>로딩 중...</p>
{:else if retrospects.length === 0}
	<div class="text-center text-(--text-secondary)">
		<p>작성된 회고가 없습니다.</p>
	</div>
{:else}
	<div class="overflow-x-auto rounded-lg border border-(--border-color) bg-white shadow-sm">
		<table class="min-w-full text-sm">
			<thead class="bg-(--surface-muted)">
				<tr>
					<th class="px-6 py-3 text-left font-semibold text-(--text-primary)">제목</th>
					<th class="px-6 py-3 text-left font-semibold text-(--text-primary)">작성자</th>
					<th class="px-6 py-3 text-left font-semibold text-(--text-primary)">작성일</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-(--border-muted)">
				{#each retrospects as retrospect}
					<tr
						class="cursor-pointer hover:bg-(--surface-light)"
						on:click={() => handleRowClick(retrospect)}
					>
						<td class="px-6 py-4 font-medium text-(--text-primary)">{retrospect.title}</td>
						<td class="px-6 py-4 text-(--text-secondary)">{retrospect.authorName}</td>
						<td class="px-6 py-4 text-(--text-secondary)">{formatDate(retrospect.createdAt)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<ViewPostModal />
