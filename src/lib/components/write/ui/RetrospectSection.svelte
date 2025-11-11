<script lang="ts">
	import { ArrowBigLeft, ArrowBigRight } from 'lucide-svelte';
	import EditorTextarea from './EditorTextarea.svelte';
	import MarkdownPreview from './MarkdownPreview.svelte';
	import { submitRetrospect } from '$lib/stores/write/writeActions';

	export let title: string;
	export let value: string;
	export let html: string;
	export let onInput: (v: string) => void;
	export let beforeTitle: string;
	export let nextTitle: string;
	export const isMobile = window.innerWidth < 640;
	export let index: number;

	function scrollToSection(id: string) {
		const el = document.getElementById(id);
		if (!el) return;

		const offset = 80; // 헤더 높이 고려
		const isMobile = window.innerWidth < 640; // sm 기준 (640px 이하)

		if (isMobile) {
			// ✅ 모바일(가로 스크롤)
			const container = document.querySelector('.section-list');
			if (container instanceof HTMLElement) {
				const left = el.offsetLeft - 50; // 약간의 마진 고려
				container.scrollTo({ left, behavior: 'smooth' });
			}
		} else {
			// ✅ 데스크탑(세로 스크롤)
			const top = el.getBoundingClientRect().top + window.scrollY - offset;
			window.scrollTo({ top, behavior: 'smooth' });
		}
	}
</script>

<section class="retrospect-section" id={title}>
	<div class="flex justify-between">
		<h3>{title}</h3>
		<div class="flex gap-2">
			{#if index > 0}
				<button
					class="flex items-center gap-2 rounded-md bg-[#1e3a8a] px-2 py-0.5 leading-none text-white hover:bg-[#4771e7]"
					on:click|preventDefault={() => scrollToSection(beforeTitle)}
					><ArrowBigLeft size="18" /></button
				>
			{/if}
			{#if nextTitle}
				<button
					class="flex items-center gap-2 rounded-md bg-[#1e3a8a] px-2 py-0.5 leading-none text-white hover:bg-[#4771e7]"
					on:click|preventDefault={() => scrollToSection(nextTitle)}
					><ArrowBigRight size="18" /></button
				>
			{/if}
			{#if !nextTitle && isMobile}
				<button
					class="flex items-center gap-2 rounded-md bg-[#1e3a8a] px-2 py-0.5 leading-none text-white hover:bg-[#4771e7]"
					on:click={submitRetrospect}>💾 작성 완료</button
				>
			{/if}
		</div>
	</div>

	<div class="editor-box">
		<!-- 왼쪽: 에디터 -->
		<div class="editor-input">
			<EditorTextarea raw={value} {onInput} />
		</div>

		<!-- 오른쪽: 미리보기 -->
		<div class="editor-preview">
			<MarkdownPreview {html} />
		</div>
	</div>
</section>

<style>
	.retrospect-section {
		min-width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2rem;
		transition:
			box-shadow 0.2s ease,
			transform 0.2s ease;
		margin-right: 20px;
	}

	h3 {
		color: #1e3a8a; /* blue-900 */
		font-size: 1.1rem;
		font-weight: 600;
		margin: 0;
	}

	.editor-box {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	@media (min-width: 768px) {
		.editor-box {
			grid-template-columns: 1fr 1fr;
		}
	}

	.editor-input,
	.editor-preview {
		overflow-y: auto;
		min-height: 250px;
		max-height: 400px;
	}
</style>
