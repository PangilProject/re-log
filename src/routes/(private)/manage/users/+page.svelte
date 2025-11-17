<script lang="ts">
	import { onMount } from 'svelte';
	import { getAllUsers } from '$lib/services/userService';
	import EditUserModal from '$lib/components/manage/EditUserModal.svelte';
	import { openEditUserModal } from '$lib/stores/ui/editUserModalStore';
	import { openConfirm } from '$lib/utils/confirm';
	import type { DocumentData } from 'firebase/firestore';
	import toast from 'svelte-5-french-toast';

	interface UserDoc extends DocumentData {
		uid: string;
		displayName: string;
		email: string;
	}

	let users: UserDoc[] = [];
	let isLoading = true;

	async function fetchUsers() {
		const { success, users: fetchedUsers, error } = await getAllUsers();
		if (success && fetchedUsers) {
			users = fetchedUsers as UserDoc[];
		} else {
			console.error('사용자 목록 조회 실패:', error);
		}
		isLoading = false;
	}

	onMount(fetchUsers);

	async function handleEdit(user: UserDoc) {
		const updatedUser = await openEditUserModal(user as any);
		if (updatedUser) {
			await fetchUsers();
		}
	}

	async function handleDelete(user: UserDoc) {
		const confirmed = await openConfirm(`${user.displayName} 사용자를 정말 삭제하시겠습니까?`);
		if (confirmed) {
			toast.error('다른 사용자 삭제 기능은 현재 지원되지 않습니다.');
		}
	}
</script>

{#if isLoading}
	<p>로딩 중...</p>
{:else if users.length === 0}
	<div class="text-center text-(--text-secondary)">
		<p>사용자가 없습니다.</p>
	</div>
{:else}
	<div class="overflow-x-auto rounded-lg border border-(--border-color) bg-white shadow-sm">
		<table class="min-w-full text-sm">
			<thead class="bg-(--surface-muted)">
				<tr>
					<th class="px-6 py-3 text-left font-semibold text-(--text-primary)">UID</th>
					<th class="px-6 py-3 text-left font-semibold text-(--text-primary)">이름</th>
					<th class="px-6 py-3 text-left font-semibold text-(--text-primary)">이메일</th>
					<th class="px-6 py-3 text-left font-semibold text-(--text-primary)">작업</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-(--border-muted)">
				{#each users as user}
					<tr class="hover:bg-(--surface-light)">
						<td class="px-6 py-4 text-(--text-secondary)">{user.uid}</td>
						<td class="px-6 py-4 font-medium text-(--text-primary)">{user.displayName}</td>
						<td class="px-6 py-4 text-(--text-secondary)">{user.email}</td>
						<td class="px-6 py-4">
							<div class="flex gap-2">
								<button
									on:click={() => handleEdit(user)}
									class="text-sm font-medium text-blue-600 hover:underline"
								>
									수정
								</button>
								<button
									on:click={() => handleDelete(user)}
									class="text-sm font-medium text-red-600 hover:underline"
								>
									삭제
								</button>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<EditUserModal />
