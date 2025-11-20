<script lang="ts">
	import { openConfirm } from '$lib/utils/confirm';
	import { goToList } from '$lib/utils/navigation';
	import { ArrowLeft } from 'lucide-svelte';

	export let isDetailMode: boolean = false;

	async function clickButton() {
		if (!isDetailMode) {
			if (!(await openConfirm('이동 시, 작성된 내용이 초기화됩니다.'))) {
				return;
			}
		}
		goToList();
	}
</script>

<button
	class="mb-4 flex cursor-pointer items-center justify-start gap-1 transition-all hover:scale-105 hover:opacity-50"
	on:click={() => clickButton()}
>
	<ArrowLeft size="18" />
	<p class="text-md font-bold">목록으로 돌아가기</p>
</button>
