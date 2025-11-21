<!-- src/lib/components/write/form/CategorySection.svelte -->
<script lang="ts">
  import { CATEGORIES } from '$lib/constants/categories';

  // 지금은 UI만 구현하므로, 실제 선택된 값은 더미 데이터로 둡니다.
  const selectedCategories: string[] = ['tech']; // '기술'이 선택된 것처럼 보이게 함
</script>

<div class="mb-10">
  <div class="flex items-center gap-3">
    <h3>📂 카테고리</h3>
  </div>
  <div class="mt-4 flex flex-wrap gap-3">
    {#each CATEGORIES as category (category.key)}
      <button
        style="--chip-color: #4f46e5;"
        class="
          emotion-chip
          {selectedCategories.includes(category.key) ? 'active-chip' : ''}
        "
      >
        <span class="icon">{category.icon}</span>
        {category.label}
      </button>
    {/each}
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
    color: #4f46e5; /* indigo-700 */
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
  }
</style>
