<script lang="ts">
	import { onMount } from 'svelte';
	import { getFeedbacks } from '$lib/services/feedbackService';
	import type { GetFeedbackPayload } from '@/types/interfaces/feedback';
	import FeedbackRow from '$lib/components/feedback/FeedbackRow.svelte';

	let feedbacks: GetFeedbackPayload[] = [];
	let isLoading = true;

	// 관리자 페이지에서는 클라이언트 렌더링 시점에만 피드백 목록을 가져옵니다.
	// (SSR 시 Firestore 접근을 하지 않기 위해 onMount에서 비동기 호출 수행)
	onMount(async () => {
		const { success, feedbacks: data } = await getFeedbacks();
		if (success && data) {
			feedbacks = data as GetFeedbackPayload[];
		}
		isLoading = false;
	});
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
						<FeedbackRow {feedback}></FeedbackRow>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
