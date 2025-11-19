<script lang="ts">
	import { onDestroy } from 'svelte';
	import WriteForm from './WriteForm.svelte';
	import { saveDraft } from '$lib/services/retrospectService';
	import { get } from 'svelte/store';
	import { answers, retrospectType, selectedEmotions, title } from '$lib/stores/write/writeStore';
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
			selectedEmotions: get(selectedEmotions)
		};

		// Don't save if there is no title and no content
		const hasContent =
			dataToSave.title.trim() !== '' ||
			Object.values(dataToSave.answers).some((v) => (v as string).trim() !== '');

		if (!hasContent) {
			return;
		}

		await saveDraft(user.uid, dataToSave);
	}

	// Auto-save draft only in write mode
	$: if (mode === 'write') {
		const combined = [$title, $answers, $selectedEmotions];
		debounce(handleSaveDraft, 3000);
	}

	// Clear the timeout when the component is destroyed
	onDestroy(() => {
		clearTimeout(timeoutId);
	});
</script>

<BackToListSection />
<WriteForm {mode} />

{#if mode === 'write'}
	<DraftButton onClick={handleSaveDraft} />
{/if}
