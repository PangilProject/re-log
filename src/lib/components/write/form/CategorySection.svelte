<!-- src/lib/components/write/form/CategorySection.svelte -->
<script lang="ts">
	import { CATEGORIES } from '$lib/constants/categories';
	import { selectedCategories } from '$lib/stores/write/writeStore';
	import { toggleCategory } from '$lib/stores/write/writeActions';

	export let isDetailMode: boolean = false;
	export let detailCategories: string[] = [];

	$: categoriesToDisplay = isDetailMode ? detailCategories : $selectedCategories;
</script>

<div class="mb-10">
	<div class="flex items-center gap-3">
		<h3>📂 카테고리</h3>
	</div>
	<div class="mt-4 flex flex-wrap gap-3">
		{#each CATEGORIES as category (category.key)}
			{#if !isDetailMode || categoriesToDisplay.includes(category.key)}
				<button
					on:click={() => toggleCategory(category.key)}
					disabled={isDetailMode}
					style="--chip-color: #4f46e5;"
					class="
            emotion-chip
            {categoriesToDisplay.includes(category.key) ? 'active-chip' : ''}
            {isDetailMode && !categoriesToDisplay.includes(category.key) ? 'hidden' : ''}
            {isDetailMode ? 'cursorDefault' : ''}
          "
				>
					<span class="icon">{category.icon}</span>
					{category.label}
				</button>
			{/if}
		{/each}
		{#if detailCategories.length === 0 && isDetailMode}
			<p class="text-(--text-secondary)">선택된 카테고리가 없습니다.</p>
		{/if}
	</div>
</div>

<style>
	/* EmotionSection과 동일한 스타일을 사용합니다. */
	.emotion-chip {
		padding: 0.45rem 0.9rem;
		border-radius: 9999px;
		font-size: 0.95rem;
		font-weight: 600;
		border: 2px solid var(--chip-color);
		color: var(--chip-color);
		background: transparent;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.35rem;
		transition: all 0.18s ease;
	}
	.emotion-chip:hover {
		background-color: color-mix(in srgb, var(--chip-color) 18%, white);
	}
	.active-chip {
		background-color: var(--chip-color);
		color: white;
		border-color: var(--chip-color);
		transform: scale(1.05);
	}
	.icon {
		font-size: 1.1rem;
	}
	h3 {
		color: #2563eb; /* blue-900 */
		font-size: 1.1rem;
		font-weight: 600;
		margin: 0;
	}

	.hidden {
		display: none;
	}

	.cursorDefault {
		cursor: default !important;
	}

	/* 태블릿 이하 (768px) */
	@media (max-width: 768px) {
		.emotion-chip {
			font-size: 0.85rem;
			padding: 0.35rem 0.75rem;
			gap: 0.3rem;
		}
	}

	/* 중간 모바일 (480px 이하) */
	@media (max-width: 480px) {
		.emotion-chip {
			font-size: 0.78rem;
			padding: 0.28rem 0.6rem;
			gap: 0.25rem;
		}
	}

	/* 작은 모바일 (360px 이하) */
	@media (max-width: 360px) {
		.emotion-chip {
			font-size: 0.7rem;
			padding: 0.2rem 0.45rem;
			gap: 0.2rem;
		}
	}
</style>
