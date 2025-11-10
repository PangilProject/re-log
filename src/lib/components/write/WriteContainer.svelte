<script lang="ts">
	import { onMount } from 'svelte';
	import EditorTitle from './EditorTitle.svelte';
	import RetrospectSection from './RetrospectSection.svelte';
	import { RETROSPECT_SECTIONS } from '$lib/constants/retrospect_sections';
	import {
		title,
		answers,
		previews,
		updatePreview,
		initPreviews,
		submitRetrospect
	} from '$lib/stores/writeStore';

	onMount(initPreviews);
</script>

<div class="page-inner">
	<div class="write-card">
		<h2>✏️ 회고 작성</h2>

		<div class="title-box">
			<EditorTitle title={$title} onInput={(v) => title.set(v)} />
		</div>

		<div class="section-list">
			{#each RETROSPECT_SECTIONS as { key, label }}
				<RetrospectSection
					title={label}
					value={$answers[key]}
					html={$previews[key]}
					onInput={(v) => updatePreview(key, v)}
				/>
			{/each}
		</div>

		<div class="submit-box">
			<button on:click={submitRetrospect}>💾 작성 완료</button>
		</div>
	</div>
</div>

<style>
	.page-inner {
		max-width: 1000px;
		margin: 0 auto;
	}
	.write-card {
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 16px;
		padding: 2.5rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
	}
	h2 {
		font-size: 1.8rem;
		font-weight: 700;
		color: #1e3a8a;
		text-align: center;
		margin-bottom: 2rem;
	}
	.title-box {
		margin-bottom: 2.5rem;
	}
	.section-list {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.submit-box {
		margin-top: 3rem;
		display: flex;
		justify-content: center;
	}
	button {
		background-color: #2563eb;
		color: #fff;
		border: none;
		border-radius: 8px;
		padding: 0.8rem 2rem;
		font-weight: 600;
		cursor: pointer;
		transition: 0.2s ease;
	}
	button:hover {
		background-color: #1e40af;
	}
</style>
