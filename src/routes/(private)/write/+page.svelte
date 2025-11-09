<script lang="ts">
	import { renderMarkdown } from '$lib/markdown';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import EditorTitle from '$lib/components/write/EditorTitle.svelte';
	import RetrospectSection from '$lib/components/write/RetrospectSection.svelte';
	import { saveRetrospect } from '$lib/services/retrospectService';
	import { currentUser } from '$lib/stores/user';
	import { get } from 'svelte/store';

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

	async function handleSubmit() {
		if (!title.trim()) {
			alert('제목을 입력해주세요.');
			return;
		}

		const emptyFields = Object.entries(answers).filter(([_, v]) => !v.trim());
		if (emptyFields.length > 0) {
			const missing = emptyFields.map(([k]) => k).join(', ');
			if (!confirm(`${missing} 항목이 비어 있습니다. 그래도 저장할까요?`)) return;
		}

		const user = get(currentUser);
		if (!user) {
			alert('로그인이 필요합니다.');
			return;
		}

		const userId = user.uid;

		const { success, error, id } = await saveRetrospect({ title, answers }, userId);
		if (success && id) {
			alert('회고가 성공적으로 저장되었습니다!');
			await goto(`/detail/${id}`);
		} else {
			console.error(error);
			alert('저장 중 오류가 발생했습니다.');
		}
	}
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

	<div class="submit-box">
		<button on:click={handleSubmit}>💾 작성 완료</button>
	</div>
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
	.submit-box {
		display: flex;
		justify-content: center;
		margin-top: 1rem;
	}
	button {
		background: #0070f3;
		color: white;
		padding: 0.8rem 2rem;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		cursor: pointer;
		transition: 0.2s ease;
	}
	button:hover {
		background: #0059c9;
	}
</style>
