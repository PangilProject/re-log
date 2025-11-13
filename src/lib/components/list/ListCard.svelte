<script lang="ts">
	import {
		isDeleteMode,
		selectedRetrospects,
		toggleSelect
	} from '$lib/stores/list/listSelectionStore';

	export let id: string;
	export let title: string;
	export let createdAt: { seconds: number } | null = null;

	// 현재 카드가 선택되었는지 여부
	$: isSelected = $selectedRetrospects.includes(id);

	function handleClick(e: MouseEvent) {
		// 삭제모드일 때는 상세 이동 막고 선택만 토글
		if ($isDeleteMode) {
			e.preventDefault();
			toggleSelect(id);
		}
	}
</script>

<li class="relative">
	<!-- ✅ 체크박스 (우상단 고정) -->
	{#if $isDeleteMode}
		<input
			type="checkbox"
			class="checked:[background-image:url('data:image/svg+xml,%3Csvg viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27white%27 stroke-width=%273%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpolyline points=%2720 6 9 17 4 12%27/%3E%3C/svg%3E')]
            absolute top-3 right-3 z-10 h-5 w-5 cursor-pointer appearance-none rounded-full border border-(--border-color) bg-(--white) transition-all duration-200 checked:border-blue-500 checked:bg-blue-500 checked:bg-size-[60%] checked:bg-center checked:bg-no-repeat hover:scale-110 focus:ring-0 focus:outline-none"
			checked={isSelected}
			on:change={() => toggleSelect(id)}
			title="회고 선택"
		/>
	{/if}

	<!-- 카드 본문 -->
	<a href={`/detail/${id}`} class="card {isSelected ? 'selected' : ''}" on:click={handleClick}>
		<h3>{title}</h3>
		<p class="date">
			{createdAt ? new Date(createdAt.seconds * 1000).toLocaleDateString() : '작성일 없음'}
		</p>
	</a>
</li>

<style>
	.card {
		display: block;
		border: 1px solid #e5e7eb;
		border-radius: 12px;
		background-color: #fff;
		padding: 1.5rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
		transition: 0.2s ease;
		position: relative;
	}

	.card:hover {
		transform: translateY(-3px);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
	}

	/* ✅ 선택된 상태 */
	.selected {
		border: 2px solid #3b82f6;
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
	}

	h3 {
		font-size: 1.2rem;
		font-weight: 600;
		color: #111827;
		margin-bottom: 0.4rem;
	}

	.date {
		font-size: 0.9rem;
		color: #6b7280;
	}
</style>
