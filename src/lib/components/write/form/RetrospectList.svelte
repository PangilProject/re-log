<script lang="ts">
	import RetrospectSection from '../RetrospectSection.svelte';
	import { RETROSPECT_SECTIONS } from '$lib/constants/retrospect_sections';
	import { answers, previews } from '$lib/stores/write/writeStore';
	import { updatePreview } from '$lib/stores/write/writeActions';
	import type { AnswerKey } from '$lib/constants/retrospectKeys';
</script>

<div class="section-list">
	{#each RETROSPECT_SECTIONS as section}
		{@const key = section.key as AnswerKey}
		<RetrospectSection
			title={section.label}
			value={$answers[key]}
			html={$previews[key]}
			onInput={(value: string) => updatePreview(key, value)}
		/>
	{/each}
</div>
