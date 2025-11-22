<script lang="ts">
	import { onMount } from 'svelte';
	import type { FeedbackPayload } from '$lib/services/feedbackService';
	import { getFeedbacks } from '$lib/services/feedbackService';
	import { openFeedbackModal } from '$lib/stores/ui/feedbackModalStore';
	import { formatDate } from '$lib/utils/formatDate';
	import type { Timestamp } from 'firebase/firestore';

	interface Feedback extends FeedbackPayload {
		id: string;
		createdAt: Timestamp;
	}

	let feedbacks: Feedback[] = [];
	let isLoading = true;

	onMount(async () => {
		const { success, feedbacks: data } = await getFeedbacks();
		if (success && data) {
			feedbacks = data as Feedback[];
		}
		isLoading = false;
	});

	function handleViewFeedback(feedback: Feedback) {
		openFeedbackModal(feedback, 'view');
	}
</script>

<div class="space-y-4">
	<h1 class="text-2xl font-bold">수신된 피드백</h1>

	{#if isLoading}
		<p>피드백을 불러오는 중...</p>
	{:else if feedbacks.length === 0}
		<p>수신된 피드백이 없습니다.</p>
	{:else}
		<div class="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
			<table class="min-w-full text-sm">
				<thead class="bg-gray-50">
					<tr>
						<th class="px-6 py-3 text-left font-semibold text-gray-600">작성일</th>
						<th class="px-6 py-3 text-left font-semibold text-gray-600">이메일</th>
						<th class="px-6 py-3 text-left font-semibold text-gray-600">내용</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200">
					{#each feedbacks as feedback (feedback.id)}
						<tr class="cursor-pointer hover:bg-gray-50" on:click={() => handleViewFeedback(feedback)}>
							<td class="whitespace-nowrap px-6 py-4 text-gray-500">
								{formatDate(feedback.createdAt)}
							</td>
							<td class="whitespace-nowrap px-6 py-4 text-gray-800">{feedback.email || '-'}</td>
							<td class="max-w-md truncate px-6 py-4 text-gray-800">{feedback.message}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
