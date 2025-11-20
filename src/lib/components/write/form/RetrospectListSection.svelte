<script lang="ts">
	import RetrospectSection from '../ui/RetrospectSection.svelte';
	import { RETROSPECT_KPT_SECTIONS, RETROSPECT_SECTIONS } from '$lib/constants/retrospect_sections';
	import { answers, previews, retrospectType } from '$lib/stores/write/writeStore';
	import { updatePreview } from '$lib/stores/write/writeActions';
	import RetrospectKPTSection from '../ui/RetrospectKPTSection.svelte';
	import type { RetrospectAnswers, RetrospectAnswersKPT } from '@/types/retrospect';

	export let mode: 'write' | 'modify' = 'write';
</script>

<div class="section-list">
	{#if $retrospectType === 'daily'}
		{@const dailyAnswers = $answers as RetrospectAnswers}
		{@const dailyPreviews = $previews as Record<keyof RetrospectAnswers, string>}
		{#each RETROSPECT_SECTIONS as section, i (section.key)}
			{@const key = section.key}
			<RetrospectSection
				title={section.label}
				value={dailyAnswers[key]}
				html={dailyPreviews[key]}
				beforeTitle={RETROSPECT_SECTIONS[i - 1]?.label}
				nextTitle={RETROSPECT_SECTIONS[i + 1]?.label}
				index={i}
				onInput={(value: string) => updatePreview(key, value)}
				{mode}
			/>
		{/each}
	{:else if $retrospectType === 'kpt'}
		{@const kptAnswers = $answers as RetrospectAnswersKPT}
		{#each RETROSPECT_KPT_SECTIONS as section, i (section.key)}
			{@const key = section.key}
			<RetrospectKPTSection
				title={section.label}
				value={kptAnswers[key]}
				beforeTitle={RETROSPECT_KPT_SECTIONS[i - 1]?.label}
				nextTitle={RETROSPECT_KPT_SECTIONS[i + 1]?.label}
				index={i}
				onInput={(value: string) => updatePreview(key, value)}
				{mode}
			/>
		{/each}
	{/if}
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
