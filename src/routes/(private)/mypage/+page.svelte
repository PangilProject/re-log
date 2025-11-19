<script lang="ts">
	import { onMount } from 'svelte';
	import { currentUser } from '$lib/stores/user';
	import { updateUserProfile, deleteUserAccount } from '$lib/services/userService';
	import { goto } from '$app/navigation';
	import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import { Loader2 } from 'lucide-svelte';
	import { openConfirm } from '$lib/utils/confirm';
	import { openPrompt } from '$lib/utils/prompt';
	import {
		errorEmptyName,
		errorEmptyPassword,
		errorModifyProfile,
		successModifyProfile
	} from '$lib/utils/toast';

	let name = '';
	let originalName = '';
	let email = '';
	let loading = true;
	let editing = false;
	let isSaving = false;

	// Firestore의 users 컬렉션에서 사용자 정보 불러오기
	onMount(async () => {
		const user = $currentUser;
		if (!user) return goto('/login');

		email = user.email ?? '';

		const userDoc = await getDoc(doc(db, 'users', user.uid));
		if (userDoc.exists()) {
			name = userDoc.data().displayName ?? '';
			originalName = name;
		}
		loading = false;
	});

	async function handleUpdate() {
		if (!name.trim()) {
			errorEmptyName();
			return;
		}
		const user = $currentUser;
		if (!user) return;

		isSaving = true;
		try {
			await updateDoc(doc(db, 'users', user.uid), { displayName: name });
			await updateUserProfile(user, { displayName: name });
			currentUser.set({
				...user,
				displayName: name
			});
			successModifyProfile();
			originalName = name;
			editing = false;
		} catch (error) {
			errorModifyProfile();
			console.error('업데이트 오류:', error);
		} finally {
			isSaving = false;
		}
	}

	async function handleCancel() {
		if (!(await openConfirm('수정 내용을 취소하시겠어요?'))) {
			return;
		}
		name = originalName;
		editing = false;
	}

	async function handleDelete() {
		const user = $currentUser;
		if (!user) return;

		if (!(await openConfirm('정말 탈퇴하시겠습니까? 모든 데이터가 삭제됩니다.'))) {
			return;
		}

		// 이메일 로그인인 경우 비밀번호 요청
		let password;
		if (user.providerData[0]?.providerId === 'password') {
			password = await openPrompt('계정 삭제를 위해 비밀번호를 입력해주세요.', '비밀번호 입력');
			if (!password) {
				errorEmptyPassword();
				return;
			}
		}

		const { success, error } = await deleteUserAccount(user, password);

		if (success) {
			goto('/');
		}
	}
</script>

<main class="mypage-container">
	{#if loading}
		<p class="mt-10 text-center text-(--text-secondary)">불러오는 중...</p>
	{:else}
		<section class="mypage-card">
			<h2 class="mb-6 text-center text-2xl font-bold text-(--brand-primary-dark)">마이페이지</h2>

			<div class="flex flex-col gap-4">
				<div>
					<label class="mb-1 block text-sm text-(--brand-secondary)" for="email">이메일</label>
					<input
						id="eamil"
						type="email"
						value={email}
						disabled
						class="w-full cursor-not-allowed rounded-lg border border-(--border-color) bg-gray-100 px-4 py-2"
					/>
				</div>

				<div>
					<label class="mb-1 block text-sm text-(--brand-secondary)" for="name">이름</label>
					<input
						id="name"
						type="text"
						bind:value={name}
						disabled={!editing}
						class="w-full rounded-lg border border-(--border-color) px-4 py-2 focus:border-blue-500 focus:outline-none"
					/>
				</div>

				<div class="mt-6 flex justify-end gap-3">
					{#if editing}
						<button
							on:click={handleUpdate}
							class="flex items-center justify-center gap-2 rounded-lg bg-(--brand-primary) px-4 py-2 font-semibold text-(--white) hover:bg-(--brand-primary-dark) disabled:bg-(--brand-primary-dark) disabled:opacity-50"
							disabled={isSaving || name === originalName}
						>
							{#if isSaving}
								<Loader2 class="h-5 w-5 animate-spin" />
							{:else}
								저장
							{/if}
						</button>
						<button
							on:click={handleCancel}
							class="rounded-lg border border-(--border-color) px-4 py-2 font-semibold hover:bg-gray-100"
						>
							취소
						</button>
					{:else}
						<button
							on:click={() => (editing = true)}
							class="rounded-lg bg-(--brand-primary) px-4 py-2 font-semibold text-(--white) hover:bg-(--brand-primary-dark)"
						>
							수정
						</button>
					{/if}

					<button
						on:click={handleDelete}
						class="rounded-lg bg-(--brand-accent) px-4 py-2 font-semibold text-(--white) hover:bg-(--brand-accent-dark)"
						class:hidden={editing}
					>
						회원 탈퇴
					</button>
				</div>
			</div>
		</section>
	{/if}
</main>

<style>
	.mypage-container {
		max-width: 600px;
		margin: 6rem auto;
		padding: 2rem;
	}

	.mypage-card {
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 16px;
		padding: 2rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
	}

	input:focus {
		border: none;
	}
</style>
