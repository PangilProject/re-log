<script lang="ts">
	import { goto } from '$app/navigation';

	function handleStart() {
		goto('/login');
	}
</script>

<!-- 전체 레이아웃 -->
<div class="flex min-h-screen flex-col">
	<!-- ✅ 고정 헤더 (높이 통일: h-16) -->
	<header
		class="fixed top-0 left-0 z-50 flex h-16 w-full items-center bg-white/80 shadow-sm backdrop-blur-md"
	>
		<div class="mx-auto flex w-full max-w-6xl items-center justify-between px-6">
			<a class="cursor-pointer text-2xl font-bold text-blue-600" href="/login"> Re:Log </a>
			<button
				onclick={handleStart}
				class="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
			>
				시작하기
			</button>
		</div>
	</header>

	<!-- ✅ 메인 콘텐츠 -->
	<main class="grow">
		<!-- 1️⃣ 오프닝 섹션 -->
		<section class="bg-linear-to-b from-blue-50 to-white px-4 py-32 pt-60 text-center">
			<h2 class="mb-6 text-4xl font-bold text-gray-800">당신의 성장을 기록하세요, Re:Log</h2>
			<p class="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
				Re:Log는 단순한 회고 서비스가 아닙니다. 매일의 배움과 도전을 기록하고, 감정과 생각을
				정리하며 <b>자기 인식과 성장 루틴을 만들어가는 공간</b>입니다.
			</p>
			<button
				onclick={handleStart}
				class="mt-10 rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
			>
				지금 시작하기
			</button>
		</section>

		<!-- 2️⃣ 서비스 소개 섹션 -->
		<section class="bg-white py-24">
			<div class="mx-auto max-w-6xl px-6">
				<h3 class="mb-12 text-center text-3xl font-bold text-gray-800">
					Re:Log는 이런 서비스입니다
				</h3>
				<div class="grid gap-10 md:grid-cols-3">
					<div class="rounded-2xl border p-8 shadow-sm transition hover:shadow-md">
						<h4 class="mb-3 text-xl font-semibold text-blue-600">간단한 회고 작성</h4>
						<p class="leading-relaxed text-gray-600">
							질문형 회고 템플릿으로 쉽게 하루를 돌아볼 수 있습니다. 마크다운 에디터로 직관적인
							글쓰기가 가능합니다.
						</p>
					</div>
					<div class="rounded-2xl border p-8 shadow-sm transition hover:shadow-md">
						<h4 class="mb-3 text-xl font-semibold text-blue-600">감정과 생각의 시각화</h4>
						<p class="leading-relaxed text-gray-600">
							단순한 기록이 아닌 감정 태그와 요약을 통해 당신의 하루를 시각적으로 되돌아볼 수
							있습니다.
						</p>
					</div>
					<div class="rounded-2xl border p-8 shadow-sm transition hover:shadow-md">
						<h4 class="mb-3 text-xl font-semibold text-blue-600">나만의 성장 기록</h4>
						<p class="leading-relaxed text-gray-600">
							Firebase Auth 기반의 개인 계정으로 자신의 회고를 안전하게 저장하고 언제든 다시 볼 수
							있습니다.
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- 3️⃣ 마무리 CTA -->
		<section class="bg-linear-to-b from-white to-blue-50 px-4 py-32 pt-60 text-center">
			<h3 class="mb-6 text-3xl font-bold text-gray-800">지금 당신의 첫 회고를 기록해보세요.</h3>
			<p class="mb-10 text-lg text-gray-600">
				기억은 흐려지지만, 기록은 성장으로 남습니다. Re:Log로 당신의 성장을 함께 만들어가요.
			</p>
			<button
				onclick={handleStart}
				class="rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
			>
				시작하기
			</button>
		</section>
	</main>

	<!-- ✅ 푸터 -->
	<footer class="bg-gray-900 py-8 text-gray-400">
		<div class="mx-auto max-w-6xl px-6 text-center">
			<p class="text-sm">© 2025 Re:Log. All rights reserved.</p>
			<p class="mt-2 text-xs">Developed by PangLab | Powered by SvelteKit & Firebase</p>
		</div>
	</footer>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
