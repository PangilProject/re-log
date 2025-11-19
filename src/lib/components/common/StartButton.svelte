<script lang="ts">
	import { goToLogin } from '$lib/utils/navigation';
</script>

<button
	onclick={goToLogin}
	class="rounded-lg bg-(--brand-primary) px-4 py-2 font-semibold text-(--white) transition hover:cursor-pointer hover:bg-(--brand-primary-dark)"
>
	시작하기
</button>
