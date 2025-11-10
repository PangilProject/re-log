<script lang="ts">
	import { goToLogin } from '$lib/utils/navigation';
</script>

<button
	onclick={goToLogin}
	class="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
>
	시작하기
</button>
