<script lang="ts">
	import AuthPageLayout from '$lib/components/layout/AuthPageLayout.svelte';
	import { goto } from '$app/navigation';
	import { loginWithEmail } from '$lib/services/userService';
	import { getErrorMessage } from '$lib/utils/firebaseError';
	import { sendPasswordResetEmail } from 'firebase/auth'; // Firebase Auth function
	import { auth } from '$lib/firebase';
	import { goToLogin } from '$lib/utils/navigation';
	import toast from 'svelte-5-french-toast';

	let email = '';
	let loading = false;
	let errorMessage: string | null = null;
	let successMessage: string | null = null;

	async function handleSubmit() {
		loading = true;
		errorMessage = null;
		successMessage = null;

		try {
			await sendPasswordResetEmail(auth, email);
			successMessage = '비밀번호 재설정 이메일이 발송되었습니다. 받은편지함을 확인해주세요.';
			toast.success(successMessage);
			// Optionally, redirect to login after a short delay
			setTimeout(() => {
				goToLogin();
			}, 3000);
		} catch (err) {
			errorMessage = getErrorMessage(err);
			toast.error(errorMessage);
			console.error('Password reset error:', err);
		} finally {
			loading = false;
		}
	}
</script>

<AuthPageLayout>
	<div
		class="animate-fadeIn w-full max-w-md rounded-xl border border-(--border-muted) bg-(--white) p-8 shadow-lg"
	>
		<h2 class="mb-6 text-center text-2xl font-bold text-(--brand-primary)">비밀번호 재설정</h2>

		<p class="mb-6 text-center text-sm text-(--text-secondary)">
			가입 시 사용한 이메일 주소를 입력해주세요. <br />비밀번호 재설정 링크를 보내드립니다.
		</p>

		<form on:submit|preventDefault={handleSubmit}>
			<div class="mb-4">
				<label for="email" class="mb-2 block text-sm font-semibold text-(--text-primary)"
					>이메일 주소</label
				>
				<input
					type="email"
					id="email"
					bind:value={email}
					required
					class="w-full rounded-md border border-(--border-color) px-4 py-2 focus:border-blue-500 focus:outline-none"
					placeholder="example@email.com"
				/>
			</div>

			{#if errorMessage}
				<p class="mb-4 text-center text-sm text-red-500">{errorMessage}</p>
			{/if}
			{#if successMessage}
				<p class="mb-4 text-center text-sm text-green-500">{successMessage}</p>
			{/if}

			<button
				type="submit"
				disabled={loading}
				class="w-full rounded-lg bg-(--brand-primary) py-2 font-semibold text-(--white) transition hover:bg-(--brand-primary-dark) disabled:cursor-not-allowed disabled:opacity-50"
			>
				{#if loading}
					이메일 발송 중...
				{:else}
					비밀번호 재설정 이메일 보내기
				{/if}
			</button>
		</form>

		<div class="mt-6 text-center">
			<button on:click={goToLogin} class="text-sm text-(--brand-secondary) hover:underline"
				>로그인 페이지로 돌아가기</button
			>
		</div>
	</div>
</AuthPageLayout>

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
