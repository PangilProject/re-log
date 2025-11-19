<script lang="ts">
	import { page } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';
	import { get } from 'svelte/store';
	import { currentUser } from '$lib/stores/user';
	import { getDraft } from '$lib/services/retrospectService';
	import {
		hydrateWriteStore,
		resetWriteStore,
		retrospectType
	} from '$lib/stores/write/writeStore';
	import { setSelectedEmotions } from '$lib/stores/write/writeActions';
	import { openConfirm } from '$lib/utils/confirm';
	import WriteContainer from '$lib/components/write/WriteContainer.svelte';
	import type { PageData } from './$types';
	import PageContainer from '$lib/components/layout/PageContainer.svelte'; // Import PageContainer

	export let data: PageData;
	const { type } = data; // Get type from load function

	let isLoading = true;
	let errorMessage: string | null = null;

	onMount(async () => {
		isLoading = true;

		// 1. Set retrospect type in store
		retrospectType.set(type);

		// 2. Reset store to clear old data
		resetWriteStore();

		// 3. Check for relevant draft
		const user = get(currentUser);
		if (user) {
			try {
				const { success, data: draftData } = await getDraft(user.uid);

				// 4. If draft exists AND its type matches the current page type, ask to load it
				if (success && draftData && draftData.type === type) {
					const typeName = type === 'kpt' ? 'KPT' : '일일';
					const userChoice = await openConfirm(
						`'${typeName} 회고'의 임시저장된 글이 있습니다. 불러오시겠습니까?`
					);
					if (userChoice) {
						hydrateWriteStore(draftData);
						if (draftData.selectedEmotions) {
							setSelectedEmotions(draftData.selectedEmotions);
						}
					}
				}
			} catch (error) {
				console.error('Error loading draft:', error);
				errorMessage = '임시저장된 글을 불러오는 중 오류가 발생했습니다.';
			}
		}

		isLoading = false;
	});

	onDestroy(() => {
		resetWriteStore();
		retrospectType.set('daily');
	});
</script>

<svelte:head>
	<title>회고 작성 - {type === 'kpt' ? 'KPT' : '일일'}</title>
</svelte:head>

<PageContainer {isLoading} {errorMessage}>
	<WriteContainer mode="write" />
</PageContainer>
