<script lang="ts">
	import { openWriteFeedbackModal } from '$lib/stores/ui/feedbackModalStore';

	const githubUrl = 'https://github.com/PangilProject/re-log';
	const svelteUrl = 'https://svelte.dev';
</script>

<footer class="bg-white/80 py-10 text-gray-500">
	<div class="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
		<div class="flex flex-wrap items-center justify-center gap-4 text-sm">
			<button on:click={() => openWriteFeedbackModal()} class="footer-link">피드백 남기기</button>
			<span class="divider">·</span>

			<a href={githubUrl} target="_blank" rel="noopener noreferrer" class="footer-link"> GitHub </a>
			<span class="divider">·</span>

			<a href={svelteUrl} target="_blank" rel="noopener noreferrer" class="footer-link">
				Svelte 공식 문서
			</a>
		</div>

		<p class="text-xs">© 2025 re-log. All rights reserved.</p>
	</div>
</footer>

<style>
	.footer-link {
		color: inherit;
		transition: opacity 0.15s ease;
	}
	.footer-link:hover {
		opacity: 0.7;
		text-decoration: underline;
	}

	.divider {
		color: #d1d5db;
	}
</style>
