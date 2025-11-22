<script lang="ts">
	import { CATEGORIES } from '$lib/constants/categories';
	import { EMOTIONS } from '$lib/constants/emotions';
	import {
		isDeleteMode,
		selectedRetrospects,
		toggleSelect
	} from '$lib/stores/list/listSelectionStore';
	import type {
		RetrospectDocument,
		RetrospectAnswers,
		RetrospectAnswersKPT
	} from '@/types/retrospect';
	import EmotionSection from '../write/form/EmotionSection.svelte';
	import CategorySection from '../write/form/CategorySection.svelte'; // Import CategorySection
	import DetailHeader from './DetailHeader.svelte';
	import DetailSection from './DetailSection.svelte';
	import { RETROSPECT_KPT_SECTIONS, RETROSPECT_SECTIONS } from '$lib/constants/retrospect_sections';

	export let data: RetrospectDocument;
	export let isAuthenticated: boolean;
	export let shareMode: boolean = false;

	$: answers = data.answers;
</script>

<div class="detail-card">
	<DetailHeader
		title={data.title}
		createdAt={data.createdAt ?? null}
		{isAuthenticated}
		{shareMode}
	/>
	<CategorySection isDetailMode={true} detailCategories={data.categories || []} />
	<EmotionSection isDetailMode={true} />

	{#if data.type === 'kpt'}
		{@const kptAnswers = answers as RetrospectAnswersKPT}
		{#each RETROSPECT_KPT_SECTIONS as section (section.key)}
			<DetailSection title={section.label} content={kptAnswers[section.key] || ''} />
		{/each}
	{:else}
		{@const dailyAnswers = answers as RetrospectAnswers}
		{#each RETROSPECT_SECTIONS as section (section.key)}
			<DetailSection title={section.label} content={dailyAnswers[section.key] || ''} />
		{/each}
	{/if}

	{#if isAuthenticated}
		<div class="back-box">
			<a href="/list">← 목록으로 돌아가기</a>
		</div>
	{/if}
</div>

<style>
	.detail-card {
		background: #ffffff;
		border: 1px solid #e5e7eb;
		border-radius: 16px;
		padding: 2.5rem;
		@media (width < 40rem) {
			padding: 1rem;
		}
		box-shadow:
			0 4px 6px -1px rgb(0 0 0 / 0.1),
			0 2px 4px -2px rgb(0 0 0 / 0.1);
	}
	.back-box {
		text-align: center;
		margin-top: 2rem;
	}
	a {
		display: inline-block;
		background-color: #2563eb;
		color: #fff;
		font-weight: 600;
		padding: 0.6rem 1.2rem;
		border-radius: 8px;
		text-decoration: none;
		transition: 0.2s ease;
	}
	a:hover {
		background-color: #1e40af;
	}
	.category-chip {
		--chip-color: #4f46e5;
		padding: 0.25rem 0.55rem;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 600;
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		user-select: none;
		white-space: nowrap;
		border: 2px solid var(--chip-color);
		color: var(--chip-color);
		background-color: color-mix(in srgb, var(--chip-color) 14%, white);
	}
</style>
