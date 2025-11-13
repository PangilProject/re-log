<!-- src/lib/components/layout/Header.svelte -->
<script lang="ts">
	import StartButton from '$lib/components/common/StartButton.svelte';
</script>

<header
	class="fixed top-0 left-0 z-50 flex h-16 w-full items-center bg-(--white)/80 shadow-sm backdrop-blur-md"
>
	<div class="mx-auto flex w-full max-w-6xl items-center justify-between px-6">
		<a class="cursor-pointer text-2xl font-bold text-(--brand-primary)" href="/login">Re:Log</a>
		<StartButton />
	</div>
</header>
