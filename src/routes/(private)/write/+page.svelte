<script lang="ts">
	import { renderMarkdown } from '$lib/markdown';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import EditorTitle from '$lib/components/write/EditorTitle.svelte';
	import RetrospectSection from '$lib/components/write/RetrospectSection.svelte';
	import { saveRetrospect } from '$lib/services/retrospectService';
	import { currentUser } from '$lib/stores/user';
	import { get } from 'svelte/store';
	import { RETROSPECT_SECTIONS } from '$lib/constants/retrospect_sections';

	type AnswerKey = 'today' | 'problem' | 'learned' | 'tomorrow' | 'summary';

	let title = '';

	let answers: Record<AnswerKey, string> = {
		today: '',
		problem: '',
		learned: '',
		tomorrow: '',
		summary: ''
	};

	let previews: Record<AnswerKey, string> = {
		today: '',
		problem: '',
		learned: '',
		tomorrow: '',
		summary: ''
	};

	function updatePreview(key: AnswerKey, value: string) {
		answers[key] = value;
		previews[key] = renderMarkdown(value);
	}

	onMount(() => {
		Object.entries(answers).forEach(([key, value]) => updatePreview(key as AnswerKey, value));
	});

	async function handleSubmit() {
		if (!title.trim()) {
			alert('제목을 입력해주세요.');
			return;
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

<div class="page-container">
	<div class="page-inner">
		<div class="write-card">
			<h2>✏️ 회고 작성</h2>

			<div class="title-box">
				<EditorTitle {title} onInput={(v) => (title = v)} />
			</div>

			<div class="section-list">
				{#each RETROSPECT_SECTIONS as { key, label }}
					<RetrospectSection
						title={label}
						value={answers[key]}
						html={previews[key]}
						onInput={(v) => updatePreview(key, v)}
					/>
				{/each}
			</div>

			<div class="submit-box">
				<button on:click={handleSubmit}>💾 작성 완료</button>
			</div>
		</div>
	</div>
</div>

<style>
	.page-container {
		min-height: 100vh;
		background: linear-gradient(to bottom, #eff6ff, #ffffff);
		padding: 6rem 1rem 4rem;
	}

	.page-inner {
		max-width: 1000px;
		margin: 0 auto;
	}

	.write-card {
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 16px;
		padding: 2.5rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
	}

	h2 {
		font-size: 1.8rem;
		font-weight: 700;
		color: #1e3a8a;
		text-align: center;
		margin-bottom: 2rem;
	}

	.title-box {
		margin-bottom: 2.5rem;
	}

	.section-list {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.submit-box {
		margin-top: 3rem;
		display: flex;
		justify-content: center;
	}

	button {
		background-color: #2563eb;
		color: #fff;
		border: none;
		border-radius: 8px;
		padding: 0.8rem 2rem;
		font-weight: 600;
		cursor: pointer;
		transition: 0.2s ease;
	}

	button:hover {
		background-color: #1e40af;
	}
</style>
