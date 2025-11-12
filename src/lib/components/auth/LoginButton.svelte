<script lang="ts">
	export let label: string;
	export let loading = false;
	export let onClick: () => void;

	// 기본 스타일(파란색) 또는 구글 스타일 선택
	export let variant: 'default' | 'google' = 'default';
</script>

<button
	on:click={onClick}
	disabled={loading}
	class={`
		flex w-full items-center justify-center gap-2 rounded-lg py-3 transition disabled:opacity-50
		${
			variant === 'google'
				? 'border border-[#dadce0] bg-white text-[#3c4043] shadow-sm hover:bg-gray-50'
				: 'bg-blue-600 text-white hover:bg-blue-700'
		}
	`}
>
	{#if variant === 'google'}
		<!-- 구글 아이콘 -->
		<img src="/google-logo.png" alt="google icon" class="h-5 w-5" />
	{/if}

	{loading ? `${label} 중...` : label}
</button>
