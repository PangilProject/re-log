<script lang="ts">
	import { onDestroy } from 'svelte';
	import WriteForm from './WriteForm.svelte';
	import { saveDraft } from '$lib/services/retrospectService';
	import { get } from 'svelte/store';
	import {
		answers,
		retrospectType,
		selectedCategories,
		selectedEmotions,
		title
	} from '$lib/stores/write/writeStore';
	import { currentUser } from '$lib/stores/user';
	import DraftButton from './DraftButton.svelte';
	import BackToListSection from '../common/BackToListSection.svelte';

	export let mode: 'write' | 'modify' = 'write';

	let timeoutId: NodeJS.Timeout;
	function debounce(func: () => void, delay: number) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(func, delay);
	}

	async function handleSaveDraft() {
		const user = get(currentUser);
		if (!user) return;

		const dataToSave = {
			type: get(retrospectType),
			title: get(title),
			answers: get(answers),
			selectedEmotions: get(selectedEmotions),
			categories: get(selectedCategories)
		};

		const hasContent =
			dataToSave.title.trim() !== '' ||
			Object.values(dataToSave.answers).some((v) => (v as string).trim() !== '');

		if (!hasContent) {
			return;
		}

		await saveDraft(user.uid, dataToSave);
	}

	$: if (mode === 'write') {
		$title;
		$answers;
		$selectedEmotions;
		$selectedCategories;
		debounce(handleSaveDraft, 3000);
	}

	onDestroy(() => {
		clearTimeout(timeoutId);
	});
</script>

<BackToListSection />
<WriteForm {mode} />

{#if mode === 'write'}
	<DraftButton onClick={handleSaveDraft} />
{/if}
