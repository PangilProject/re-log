<script lang="ts">
	export let mode: 'write' | 'modify' = 'write';
	import { onMount } from 'svelte';
	import WriteForm from './WriteForm.svelte';
	import PageContainer from '$lib/components/layout/PageContainer.svelte';
	import {
		hydrateWriteStore,
		resetWriteStore,
		title,
		answers,
		selectedEmotions
	} from '$lib/stores/write/writeStore';
	import { page } from '$app/stores';
	import { getRetrospectById, getDraft, saveDraft } from '$lib/services/retrospectService';
	import { currentUser } from '$lib/stores/user';
	import { get } from 'svelte/store';
	import { openConfirm } from '$lib/utils/confirm';
	import DraftButton from './DraftButton.svelte';
	import { setSelectedEmotions } from '$lib/stores/write/writeActions'; // Import setSelectedEmotions
	import BackToListSection from '../common/BackToListSection.svelte';

	let isLoading = true;

	let timeoutId: NodeJS.Timeout;
	function debounce(func: () => void, delay: number) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(func, delay);
	}

	async function handleSaveDraft() {
		const user = get(currentUser);
		if (!user) return;

		const draftData = {
			title: get(title),
			answers: get(answers),
			selectedEmotions: get(selectedEmotions)
		};

		if (!draftData.title && Object.values(draftData.answers).every((v) => !v)) {
			return;
		}

		await saveDraft(user.uid, draftData);
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
						if (data.selectedEmotions) {
							setSelectedEmotions(data.selectedEmotions);
						}
					}
				}
			}
		} else if (mode === 'modify' && docId) {
			const { success, data, error } = await getRetrospectById(docId);
			if (success && data) {
				hydrateWriteStore(data);
				if (data.selectedEmotions) {
					setSelectedEmotions(data.selectedEmotions);
				}
			} else {
				console.error('문서 불러오기 실패:', error);
			}
		}
		isLoading = false;
	});

	$: if (mode === 'write') {
		const combined = [$title, $answers];
		debounce(handleSaveDraft, 3000);
	}
</script>

<PageContainer {isLoading} errorMessage={null}>
	<BackToListSection />
	<WriteForm {mode} />
</PageContainer>

{#if mode === 'write'}
	<DraftButton onClick={handleSaveDraft} />
{/if}
