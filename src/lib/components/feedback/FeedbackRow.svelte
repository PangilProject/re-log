<script lang="ts">
	import { openViewFeedbackModal } from '$lib/stores/ui/feedbackModalStore';
	import { formatDate } from '$lib/utils/formatDate';
	import type { GetFeedbackPayload } from '@/types/interfaces/feedback';

	export let feedback: GetFeedbackPayload;

	/**
	 * 피드백 목록에서 특정 피드백 행을 클릭하면 호출됩니다.
	 * 선택된 피드백 데이터를 기반으로 '피드백 조회 모달(FeedbackModal)'을 여는 핸들러입니다.
	 *
	 * @param feedback 클릭된 피드백의 전체 데이터(GetFeedbackPayload)
	 */
	function handleViewFeedback(feedback: GetFeedbackPayload) {
		openViewFeedbackModal(feedback);
	}
</script>

<tr class="cursor-pointer hover:bg-gray-50" on:click={() => handleViewFeedback(feedback)}>
	<td class="px-6 py-4 whitespace-nowrap text-gray-500">
		{formatDate(feedback.createdAt)}
	</td>
	<td class="px-6 py-4 whitespace-nowrap text-gray-800">{feedback.email || '-'}</td>
	<td class="max-w-md truncate px-6 py-4 text-gray-800">{feedback.message}</td>
</tr>
