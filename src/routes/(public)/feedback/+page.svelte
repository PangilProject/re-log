<script lang="ts">
	import { saveFeedback } from '$lib/services/feedbackService';
	import toast from 'svelte-5-french-toast';
	import { Loader2 } from 'lucide-svelte';

	let email = '';
	let message = '';
	let isSubmitting = false;

	async function handleSubmit() {
		if (!message.trim()) {
			toast.error('피드백 내용을 입력해주세요.');
			return;
		}

		isSubmitting = true;
		try {
			const { success } = await saveFeedback({
				email: email.trim(),
				message: message.trim()
			});

			if (success) {
				toast.success('소중한 의견 감사합니다!');
				email = '';
				message = '';
			} else {
				toast.error('오류가 발생했습니다. 다시 시도해주세요.');
			}
		} catch (error) {
			toast.error('오류가 발생했습니다. 다시 시도해주세요.');
			console.error('피드백 제출 오류:', error);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="feedback-container">
	<h1 class="feedback-title">피드백 남기기</h1>
	<p class="feedback-subtitle">
		re-log 서비스에 대한 여러분의 소중한 의견을 남겨주세요.
		<br />
		버그 리포트, 기능 제안 등 어떤 의견이든 환영합니다.
	</p>

	<form on:submit|preventDefault={handleSubmit} class="feedback-form">
		<div class="form-group">
			<label for="email">이메일 (선택 사항)</label>
			<input
				type="email"
				id="email"
				bind:value={email}
				placeholder="답변을 원하시면 이메일을 남겨주세요."
			/>
		</div>
		<div class="form-group">
			<label for="message">의견 내용</label>
			<textarea
				id="message"
				bind:value={message}
				rows="6"
				placeholder="여기에 의견을 작성해주세요."
				required
			/>
		</div>
		<button type="submit" disabled={isSubmitting}>
			{#if isSubmitting}
				<Loader2 class="animate-spin" />
				보내는 중...
			{:else}
				피드백 보내기
			{/if}
		</button>
	</form>
</div>

<style>
	.feedback-container {
		max-width: 700px;
		margin: 2rem auto;
		padding: 2rem;
		background-color: #ffffff;
		border-radius: 16px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}
	.feedback-title {
		font-size: 2rem;
		font-weight: 700;
		color: #1e3a8a;
		text-align: center;
		margin-bottom: 0.5rem;
	}
	.feedback-subtitle {
		text-align: center;
		color: #4b5563;
		margin-bottom: 2.5rem;
		line-height: 1.6;
	}
	.feedback-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.form-group {
		display: flex;
		flex-direction: column;
	}
	label {
		margin-bottom: 0.5rem;
		font-weight: 600;
		color: #374151;
	}
	input,
	textarea {
		width: 100%;
		padding: 0.75rem 1rem;
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		font-size: 1rem;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
	}
	input:focus,
	textarea:focus {
		outline: none;
		border-color: #2563eb;
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
	}
	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		background-color: #2563eb;
		color: white;
		padding: 0.8rem 1.5rem;
		border-radius: 0.5rem;
		font-weight: 600;
		font-size: 1rem;
		border: none;
		cursor: pointer;
		transition: background-color 0.2s;
	}
	button:hover {
		background-color: #1e40af;
	}
	button:disabled {
		background-color: #9ca3af;
		cursor: not-allowed;
	}
</style>
