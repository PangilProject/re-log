<script lang="ts">
	export let mode: 'write' | 'modify' = 'write';
	import { onMount } from 'svelte';
	import WriteForm from './WriteForm.svelte';
	import PageContainer from '$lib/components/layout/PageContainer.svelte';
	import { hydrateWriteStore, resetWriteStore, title, answers } from '$lib/stores/write/writeStore';
	import { page } from '$app/stores';
	import { getRetrospectById, getDraft, saveDraft } from '$lib/services/retrospectService';
	import { currentUser } from '$lib/stores/user';
	import { get } from 'svelte/store';
	import { openConfirm } from '$lib/utils/confirm';

	let isLoading = true;

	let timeoutId: NodeJS.Timeout;
	function debounce(func: () => void, delay: number) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(func, delay);
	}

	async function autosave() {
		const user = get(currentUser);
		if (!user) return;

		const draftData = {
			title: get(title),
			answers: get(answers)
		};

		if (!draftData.title && Object.values(draftData.answers).every((v) => !v)) {
			return;
		}

		await saveDraft(user.uid, draftData);
		console.log('임시저장 완료');
	}

	onMount(async () => {
		const docId = $page?.params?.id;
		const user = get(currentUser);

		if (mode === 'write') {
			resetWriteStore();
			if (user) {
				const { success, data } = await getDraft(user.uid);
				if (success && data) {
					const userChoice = await openConfirm('임시저장된 글이 있습니다. 불러오시겠습니까?');
					if (userChoice) {
						hydrateWriteStore(data);
					}
				}
			}
		} else if (mode === 'modify' && docId) {
			const { success, data, error } = await getRetrospectById(docId);
			if (success && data) {
				hydrateWriteStore(data);
			} else {
				console.error('문서 불러오기 실패:', error);
			}
		}
		isLoading = false;
	});

	$: if (mode === 'write') {
		const combined = [$title, $answers];
		debounce(autosave, 3000);
	}
</script>

<PageContainer {isLoading} errorMessage={null}>
	<WriteForm {mode} />
</PageContainer>
