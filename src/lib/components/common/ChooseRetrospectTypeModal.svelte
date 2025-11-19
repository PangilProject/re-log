<script lang="ts">
	import { goto } from '$app/navigation';
	import { chooseRetrospectTypeStore } from '$lib/stores/ui/chooseRetrospectTypeStore';
	import toast from 'svelte-5-french-toast';

	function handleConfirm(value: boolean) {
		chooseRetrospectTypeStore.update((s) => {
			s.isOpen = false;
			s.resolve(value);
			return s;
		});
	}

	export let retrospectTtype = [
		{
			name: 'KPT 회고',
			primaryColor: '#2563eb', // 파란색 (기본 회고 느낌)
			secondaryColor: '#dbeafe', // 연한 파랑 배경
			icon: '🌐',
			link: '/write/kpt'
		},
		{
			name: 'Daily 회고',
			primaryColor: '#16a34a', // 초록색 (실행 중심)
			secondaryColor: '#dcfce7', // 연한 초록 배경
			icon: '🧩',
			link: '/write/daily'
		},
		{
			name: '커스텀 회고',
			primaryColor: '#f97316', // 주황색 (창의적 느낌)
			secondaryColor: '#ffedd5', // 연한 주황 배경
			icon: '🧶',
			link: '/write/custom'
		}
	];

	function selectType(type: string, link: string) {
		if (type === '커스텀 회고') {
			toast('준비중', { icon: '⚙️' });
		} else {
			handleConfirm(true);
			goto(link);
		}
	}
</script>

{#if $chooseRetrospectTypeStore.isOpen}
	<!-- ✅ 백드롭 -->
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
		<!-- ✅ 본문 카드 -->
		<div
			class="animate-fadeIn w-full max-w-sm rounded-xl border border-(--border-muted) bg-(--white) p-5 shadow-lg"
		>
			<div class="flex w-full justify-between gap-2">
				{#each retrospectTtype as item}
					<button
						class="w-1/3 rounded-xl border-2 px-3 py-4 font-semibold shadow-md
              transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
						style="
              background-color: {item.secondaryColor};
              color: {item.primaryColor};
              border-color: {item.primaryColor};
              box-shadow: 0 4px 10px color-mix(in srgb, {item.primaryColor} 20%, transparent);
            "
						on:click={() => selectType(item.name, item.link)}
					>
						<div class="flex h-20 w-full flex-col justify-between">
							<p class="flex w-full justify-end text-4xl drop-shadow-sm">{item.icon}</p>
							<p class="flex w-full justify-start text-base font-bold tracking-tight">
								{item.name}
							</p>
						</div>
					</button>
				{/each}
			</div>

			<div class="mt-6 flex justify-center gap-3">
				<button
					on:click={() => handleConfirm(false)}
					class="rounded-md border px-4 py-1.5 text-sm text-(--brand-secondary-dark) transition-colors hover:cursor-pointer hover:bg-gray-100"
				>
					닫기
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-fadeIn {
		animation: fadeIn 0.2s ease-out;
	}
</style>
