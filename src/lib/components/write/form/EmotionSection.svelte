<!-- src/lib/components/write/EmotionSection.svelte -->
<script lang="ts">
	import { EMOTIONS } from '$lib/constants/emotions';
	import { clearAllEmotions, toggleEmotion } from '$lib/stores/write/writeActions';
	import { selectedEmotions } from '$lib/stores/write/writeStore';

	export let isDetailMode: boolean = false; // New prop
</script>

<div class="mb-10">
	<div class="flex items-center gap-3">
		<h3>🫥 오늘의 감정</h3>
		{#if !isDetailMode}
			<!-- Conditionally render "전체 취소" button -->
			<button
				on:click={clearAllEmotions}
				class="hover:text-(--brand-primary-dark text-sm text-(--brand-primary) hover:underline"
				>전체 취소</button
			>
		{/if}
	</div>
	<div class="mt-4 flex flex-wrap gap-3">
		{#each EMOTIONS as emotion}
			<button
				on:click={() => toggleEmotion(emotion.key)}
				disabled={isDetailMode}
				style="--chip-color: {emotion.color}"
				class="
					emotion-chip
					{$selectedEmotions.includes(emotion.key) ? 'active-chip' : ''}
          {isDetailMode && !$selectedEmotions.includes(emotion.key) ? 'hidden' : ''}
					{isDetailMode ? 'cursorDefault' : ''} 
				"
			>
				<span class="icon">{emotion.icon}</span>
				{emotion.label}
			</button>
		{/each}
	</div>
</div>

<style>
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
</style>
