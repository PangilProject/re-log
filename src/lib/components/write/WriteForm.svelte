<script lang="ts">
	import TitleSection from './form/TitleSection.svelte';
	import RetrospectList from './form/RetrospectList.svelte';
	import SubmitButton from './form/SubmitButton.svelte';
</script>

<div class="write-card">
	<h2>✏️ 회고 작성</h2>

	<TitleSection />
	<RetrospectList />
	<SubmitButton />
</div>

<style>
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
</style>
