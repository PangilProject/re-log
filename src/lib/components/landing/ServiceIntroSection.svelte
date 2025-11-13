<!-- src/lib/components/sections/ServiceIntroSection.svelte -->
<section class="bg-(--white) py-24">
	<div class="mx-auto max-w-6xl px-6">
		<h3 class="mb-12 text-center text-3xl font-bold text-(--text-primary)">
			Re:Log는 이런 서비스입니다
		</h3>
		<div class="grid gap-10 md:grid-cols-3">
			<div class="rounded-2xl border p-8 shadow-sm transition hover:shadow-md">
				<h4 class="mb-3 text-xl font-semibold text-(--brand-primary)">간단한 회고 작성</h4>
				<p class="leading-relaxed text-(--brand-secondary)">
					질문형 회고 템플릿으로 쉽게 하루를 돌아볼 수 있습니다. 마크다운 에디터로 직관적인 글쓰기가
					가능합니다.
				</p>
			</div>
			<div class="rounded-2xl border p-8 shadow-sm transition hover:shadow-md">
				<h4 class="mb-3 text-xl font-semibold text-(--brand-primary)">감정과 생각의 시각화</h4>
				<p class="leading-relaxed text-(--brand-secondary)">
					감정 태그와 요약을 통해 하루를 시각적으로 되돌아볼 수 있습니다.
				</p>
			</div>
			<div class="rounded-2xl border p-8 shadow-sm transition hover:shadow-md">
				<h4 class="mb-3 text-xl font-semibold text-(--brand-primary)">나만의 성장 기록</h4>
				<p class="leading-relaxed text-(--brand-secondary)">
					Firebase Auth 기반 계정으로 회고를 안전하게 저장하고 언제든 다시 볼 수 있습니다.
				</p>
			</div>
		</div>
	</div>
</section>
