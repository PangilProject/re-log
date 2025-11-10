<script lang="ts">
	export let title: string;
	export let createdAt: any;
</script>

<h2>{title}</h2>
<p class="date">
	{createdAt ? new Date(createdAt.seconds * 1000).toLocaleDateString() : '작성일 없음'}
</p>

<style>
	h2 {
		font-size: 1.8rem;
		font-weight: 700;
		color: #1e3a8a;
		text-align: center;
		margin-bottom: 0.3rem;
	}
	.date {
		text-align: center;
		color: #6b7280;
		font-size: 0.9rem;
		margin-bottom: 2rem;
	}
</style>
