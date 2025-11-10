<script lang="ts">
	export let onNew: () => void;
</script>

<div class="empty-card">
	<p>아직 작성된 회고가 없습니다. ✍️</p>
	<button on:click={onNew}>첫 회고 작성하기</button>
</div>

<style>
	.empty-card {
		text-align: center;
		padding: 4rem 2rem;
		background: white;
		border-radius: 16px;
		border: 1px solid #e5e7eb;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
	}

	p {
		font-size: 1rem;
		color: #4b5563;
		margin-bottom: 1rem;
	}

	button {
		background-color: #2563eb;
		color: #fff;
		border: none;
		padding: 0.8rem 1.6rem;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	button:hover {
		background-color: #1e40af;
	}
</style>
