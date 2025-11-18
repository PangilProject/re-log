<script lang="ts">
	import RetrospectSection from '../ui/RetrospectSection.svelte';
	import { RETROSPECT_SECTIONS } from '$lib/constants/retrospect_sections';
	import { answers, previews } from '$lib/stores/write/writeStore';
	import { updatePreview } from '$lib/stores/write/writeActions';
	import type { AnswerKey } from '$lib/constants/retrospectKeys';

	export let mode: 'write' | 'modify' = 'write';
</script>

<div class="section-list">
	{#each RETROSPECT_SECTIONS as section, i}
		{@const key = section.key as AnswerKey}
		<RetrospectSection
			title={section.label}
			value={$answers[key]}
			html={$previews[key]}
			beforeTitle={RETROSPECT_SECTIONS[i - 1]?.label}
			nextTitle={RETROSPECT_SECTIONS[i + 1]?.label}
			index={i}
			onInput={(value: string) => updatePreview(key, value)}
			{mode}
		/>
	{/each}
</div>

<style>
	.section-list {
		@media (width <= 40rem) {
			display: flex;
			flex-direction: row;
			overflow-x: scroll;
			width: 100%;
		}
	}
</style>
