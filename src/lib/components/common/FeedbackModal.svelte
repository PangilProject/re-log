<script lang="ts">
	import { feedbackModalStore, openFeedbackModal } from '$lib/stores/ui/feedbackModalStore';
	import { saveFeedback } from '$lib/services/feedbackService';
	import toast from 'svelte-5-french-toast';
	import { Loader2, X } from 'lucide-svelte';
	import { onMount, onDestroy } from 'svelte';

	let email = '';
	let message = '';
	let isSubmitting = false;

	async function handleSubmit() {
		if ($feedbackModalStore.mode === 'view') return;

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
				closeModal();
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

	function closeModal() {
		feedbackModalStore.set({ isOpen: false, mode: 'write', feedback: null });
		email = '';
		message = '';
	}

	function handleGlobalKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}

	onMount(() => {
		document.addEventListener('keydown', handleGlobalKeydown);

		return () => {
			document.removeEventListener('keydown', handleGlobalKeydown);
		};
	});

	$: if (
		$feedbackModalStore.isOpen &&
		$feedbackModalStore.mode === 'view' &&
		$feedbackModalStore.feedback
	) {
		email = $feedbackModalStore.feedback.email || '';
		message = $feedbackModalStore.feedback.message || '';
	}
</script>

{#if $feedbackModalStore.isOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
		role="presentation"
		on:click={closeModal}
	>
		<div class="animate-fadeIn w-[90%] max-w-lg rounded-xl border bg-white p-6 shadow-lg">
			<div class="flex items-start justify-between">
				<div>
					<h2 class="text-xl font-bold text-gray-800">
						{#if $feedbackModalStore.mode === 'view'}
							피드백 확인
						{:else}
							피드백 남기기
						{/if}
					</h2>
					<p class="mt-1 text-sm text-gray-500">
						{#if $feedbackModalStore.mode === 'write'}
							서비스 개선을 위한 소중한 의견을 공유해주세요.
						{/if}
					</p>
				</div>
				<button on:click={closeModal} class="text-gray-400 hover:text-gray-600">
					<X />
				</button>
			</div>

			<form on:submit|preventDefault={handleSubmit} class="feedback-form mt-6">
				<div class="form-group">
					<label for="email">이메일</label>
					<input
						type="email"
						id="email"
						bind:value={email}
						placeholder="답변을 원하시면 이메일을 남겨주세요."
						disabled={$feedbackModalStore.mode === 'view'}
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
						disabled={$feedbackModalStore.mode === 'view'}
						class="resize-none"
					></textarea>
				</div>
				{#if $feedbackModalStore.mode === 'write'}
					<button type="submit" disabled={isSubmitting} class="submit-btn">
						{#if isSubmitting}
							<Loader2 class="animate-spin" />
							보내는 중...
						{:else}
							피드백 보내기
						{/if}
					</button>
				{/if}
			</form>
		</div>
	</div>
{/if}

<style>
	.feedback-form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}
	.form-group {
		display: flex;
		flex-direction: column;
	}
	label {
		margin-bottom: 0.5rem;
		font-weight: 600;
		font-size: 0.875rem;
		color: #374151;
	}
	input,
	textarea {
		width: 100%;
		padding: 0.65rem 0.9rem;
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		font-size: 0.95rem;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
	}
	input:disabled,
	textarea:disabled {
		background-color: #f3f4f6;
		cursor: not-allowed;
	}
	input:focus,
	textarea:focus {
		outline: none;
		border-color: #2563eb;
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
	}
	.submit-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		background-color: #2563eb;
		color: white;
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		font-weight: 600;
		font-size: 1rem;
		border: none;
		cursor: pointer;
		transition: background-color 0.2s;
		margin-top: 0.5rem;
	}
	.submit-btn:hover {
		background-color: #1e40af;
	}
	.submit-btn:disabled {
		background-color: #9ca3af;
		cursor: not-allowed;
	}

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
