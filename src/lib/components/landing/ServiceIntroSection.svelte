<!-- src/lib/components/sections/ServiceIntroSection.svelte -->
<section class="bg-(--white) py-40">
	<div class="mx-auto max-w-[1050px] px-6">
		<h3 class="mb-20 text-center text-3xl font-bold text-(--text-primary)">
			Re:Log는 여러분의 성장을 기록하는 서비스입니다
		</h3>

		<!-- 1. 회고 작성 기능 -->
		<div class="mb-32 grid items-center gap-14 md:grid-cols-2">
			<div>
				<h4 class="mb-4 text-2xl font-bold text-(--brand-primary)">✍️ 쉽고 빠른 회고 작성</h4>
				<p class="text-lg leading-relaxed text-(--brand-secondary)">
					Re:Log는 “질문형 템플릿”을 기반으로 하루를 되돌아보는 데 필요한 구조를 제공합니다.
					<br /><br />
					마크다운 프리뷰를 함께 제공하여, 작성과 동시에 완성된 회고를 바로 확인할 수 있어 초보자도 부담
					없이 기록을 시작할 수 있습니다.
					<br /><br />
					감정을 선택하고, 하루 배움을 정리하며,
					<strong class="text-(--brand-primary-dark)">나만의 기록을 차곡차곡 쌓아보세요.</strong>
				</p>
			</div>
			<img
				src="/Landing-Image1.png"
				alt="Re:Log 회고 작성 화면"
				class="mb-12 rounded-3xl shadow-lg"
			/>
		</div>

		<!-- 2. 감정 태그 + 회고 목록 -->
		<div class="mb-32 grid items-center gap-14 md:grid-cols-2">
			<div>
				<h4 class="mb-4 text-2xl font-bold text-(--brand-primary)">🎨 감정과 하루의 시각화</h4>
				<p class="text-lg leading-relaxed text-(--brand-secondary)">
					하루의 감정은 단순한 기록 이상이며, <strong>성장 흐름을 이해하는 중요한 단서</strong
					>입니다.
					<br /><br />
					Re:Log는 감정 태그를 기반으로 회고를 분석하고, 리스트 페이지에서도 선택한 감정들을 직관적으로
					확인할 수 있도록 지원합니다.
					<br /><br />
					감정 기반 필터링, 회고 패턴 관찰 등 앞으로 확장될 기능을 통해 더욱 깊은 성찰을 돕습니다.
				</p>
			</div>

			<img
				src="/Landing-Image2.png"
				alt="Re:Log 회고 목록 화면"
				class="order-1 mb-12 rounded-3xl shadow-lg"
			/>
		</div>

		<!-- 3. 성장 기록 강조 CTA -->
		<div class="mt-80 rounded-[32px] bg-blue-50 p-12 text-center shadow-inner">
			<h4 class="mb-4 text-2xl font-bold text-blue-700">📈 나의 성장을 기록하고 되돌아보세요</h4>
			<p class="mx-auto max-w-[680px] text-lg leading-relaxed text-blue-800">
				여러분의 회고는 모두 안전하게 Firebase Auth 기반 계정에 저장되며, 언제든 다시 꺼내보고
				이어서 작성할 수 있습니다.
				<br /><br />
				<strong>지금 바로 Re:Log로 여러분의 성장 여정을 시작해보세요.</strong>
			</p>
		</div>
	</div>
</section>

<style>
	img {
		object-fit: cover;
	}
</style>
