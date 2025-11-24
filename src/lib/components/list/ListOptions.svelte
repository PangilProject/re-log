<script lang="ts">
	import { type Writable, get } from 'svelte/store';
	import Dropdown from '$lib/components/common/Dropdown.svelte';
	import DeleteCard from './DeleteCard.svelte';
	import { isDeleteMode } from '$lib/stores/list/listSelectionStore';
	import { resetCategories, selectedCategories } from '$lib/stores/list/listFilterStore';
	import { CATEGORIES } from '$lib/constants/categories';
	import { RefreshCw, Filter, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { allRetrospectsData, isAllRetrospectsLoading } from '$lib/stores/list/listStore';
	import { loadAllRetrospects } from '$lib/stores/list/listActions';

	export let searchQuery: Writable<string>;
	export let sortOrder: Writable<'asc' | 'desc'>;

	// 열기/닫기 상태
	let isOpen = false;

	const sortOptions = [
		{ label: '최신순', value: 'desc' },
		{ label: '오래된순', value: 'asc' }
	];

	function toggleCategory(key: string) {
		selectedCategories.update((prev) =>
			prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
		);
	}

    function handleSearchInputFocus() {
        if (get(allRetrospectsData).length === 0 && !get(isAllRetrospectsLoading)) {
            loadAllRetrospects();
        }
    }
</script>

<div class="flex flex-col">
	<!-- 카테고리 필터 토글 버튼 -->
	<div class="mb-2 flex flex-col items-start gap-2">
		<button
			on:click={() => (isOpen = !isOpen)}
			class="border-2px flex items-center
          gap-1 rounded-full border-2 border-(--border-color) bg-(--white) px-3
          py-1.5 text-sm
          font-medium
          text-(--text-secondary)
          transition-all duration-150
          hover:border-(--black)
          hover:bg-(--white)
          hover:text-(--black)
          active:scale-[0.97]
          
        "
		>
			<span class="text-[0.8rem]">카테고리</span>
			<svg
				class="h-4 w-4 text-(--text-secondary) transition-transform duration-150"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				style="transform: {isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</button>
		<!-- 펼쳐지는 카테고리 목록 -->
		{#if isOpen}
			<div class="flex flex-wrap items-center gap-2 rounded-md">
				<!-- 초기화 버튼 -->
				<button type="button" on:click={resetCategories} class="p-1">
					<RefreshCw size="18px" color="grey" class="cursor-pointer hover:opacity-70" />
				</button>
				<!-- 카테고리 칩 -->
				{#each CATEGORIES as category (category.key)}
					<button
						on:click={() => toggleCategory(category.key)}
						style="--chip-color: #4f46e5;"
						class="emotion-chip {$selectedCategories.includes(category.key) ? 'active-chip' : ''}"
					>
						# {category.label}
					</button>
				{/each}
			</div>
		{/if}
	</div>

	<!-- 검색 + 정렬 -->
	<div class="mb-6 flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
		<input
			type="text"
			placeholder="제목 혹은 내용으로 검색..."
			bind:value={$searchQuery}
			on:focus={handleSearchInputFocus}
			class="w-full rounded-md border-none px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none sm:w-[48.5%]"
		/>

		<div class="flex items-center">
			{#if !$isDeleteMode}
				<Dropdown label="정렬:" selected={sortOrder} options={sortOptions} />
			{/if}
			<DeleteCard />
		</div>
	</div>
</div>

<style>
	.emotion-chip {
		padding: 0.3rem 0.8rem;
		border-radius: 9999px;
		font-size: 0.8rem;
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
			font-size: 0.7rem;
			padding: 0.28rem 0.6rem;
			gap: 0.21rem;
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

	.emotion-chip:hover {
		background-color: color-mix(in srgb, var(--chip-color) 18%, white);
	}

	.active-chip {
		background-color: var(--chip-color);
		color: white;
		border-color: var(--chip-color);
		transform: scale(1.05);
	}
</style>
