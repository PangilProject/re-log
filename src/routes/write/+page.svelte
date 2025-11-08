<script lang="ts">
	import { renderMarkdown } from '$lib/markdown';
	import { onMount } from 'svelte';
	import EditorTitle from '$lib/components/write/EditorTitle.svelte';
	import RetrospectSection from '$lib/components/write/RetrospectSection.svelte';

	let title = '';

	let answers = {
		today: '',
		problem: '',
		learned: '',
		tomorrow: '',
		summary: ''
	};

	let previews = {
		today: '',
		problem: '',
		learned: '',
		tomorrow: '',
		summary: ''
	};

	const questions: { key: keyof typeof answers; title: string }[] = [
		{ key: 'today', title: '1️⃣ 오늘 한 일' },
		{ key: 'problem', title: '2️⃣ 어려웠던 점' },
		{ key: 'learned', title: '3️⃣ 배운 점' },
		{ key: 'tomorrow', title: '4️⃣ 내일 할 일' },
		{ key: 'summary', title: '5️⃣ 총평' }
	];

	function updatePreview(key: keyof typeof answers, value: string) {
		answers[key] = value;
		previews[key] = renderMarkdown(value);
	}

	onMount(() => {
		Object.entries(answers).forEach(([key, value]) =>
			updatePreview(key as keyof typeof answers, value)
		);
	});
</script>

<div class="editor-container">
	<h2>✏️ 회고 작성</h2>
	<EditorTitle {title} onInput={(v: string) => (title = v)} />

	{#each questions as { key, title }}
		<RetrospectSection
			{title}
			value={answers[key]}
			html={previews[key]}
			onInput={(v) => updatePreview(key, v)}
		/>
	{/each}
</div>

<style>
	.editor-container {
		max-width: 800px;
		margin: 2rem auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	h2 {
		font-size: 1.6rem;
		font-weight: bold;
		margin-bottom: 0.5rem;
	}
</style>
