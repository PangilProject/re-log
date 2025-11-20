<script lang="ts">
	import StartButton from '$lib/components/common/StartButton.svelte';
</script>

<section
	data-testid="hero-section"
	class="flex justify-center bg-linear-to-b from-(--landing-bg-start) to-(--white) px-4 py-32 pt-60 text-center"
>
	<div class="flex w-[1000px] flex-col px-4">
		<h2 class="mb-6 text-4xl font-bold text-(--text-primary)">당신의 성장을 기록하세요, re-log</h2>
		<p class="mx-auto max-w-2xl text-lg leading-relaxed text-(--brand-secondary)">
			re-log는 단순한 회고 서비스가 아닙니다. 매일의 배움과 도전을 기록하고, 감정과 생각을 정리하며 <b
				>자기 인식과 성장 루틴을 만들어가는 공간</b
			>입니다.
		</p>
		<div class="mt-10"><StartButton /></div>
	</div>
</section>
