<script lang="ts">
	import StartButton from '$lib/components/common/StartButton.svelte';
</script>

<section
	class="flex w-full justify-center bg-linear-to-b from-(--white) to-(--landing-bg-start) px-4 py-32 pt-60 text-center"
>
	<div class="flex w-[1000px] flex-col px-4 pb-40">
		<h3 class="mb-6 text-3xl font-bold text-(--text-primary)">
			지금 당신의 첫 회고를 기록해보세요.
		</h3>
		<p class="mb-10 text-lg text-(--brand-secondary)">
			기억은 흐려지지만, 기록은 성장으로 남습니다. re-log로 당신의 성장을 함께 만들어가요.
		</p>
		<div>
			<StartButton />
		</div>
	</div>
</section>
