<script lang="ts">
	export let id: string;
	export let title: string;
	export let createdAt: { seconds: number } | null = null;
</script>

<li>
	<a href={`/detail/${id}`} class="card">
		<h3>{title}</h3>
		<p class="date">
			{createdAt ? new Date(createdAt.seconds * 1000).toLocaleDateString() : '작성일 없음'}
		</p>
	</a>
</li>

<style>
	.card {
		display: block;
		border: 1px solid #e5e7eb;
		border-radius: 12px;
		background-color: #fff;
		padding: 1.5rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
		transition: 0.2s ease;
	}

	.card:hover {
		transform: translateY(-3px);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
	}

	h3 {
		font-size: 1.2rem;
		font-weight: 600;
		color: #111827;
		margin-bottom: 0.4rem;
	}

	.date {
		font-size: 0.9rem;
		color: #6b7280;
	}
</style>
