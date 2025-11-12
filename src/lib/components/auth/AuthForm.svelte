<!-- src/lib/components/auth/AuthForm.svelte -->
<script lang="ts">
	import LoginButton from './LoginButton.svelte';

	export let type: 'login' | 'register' = 'login'; // 로그인/회원가입 구분
	export let fields: any; // 입력 상태 객체
	export let setFields: (name: string, value: string) => void;
	export let onSubmit: () => void;
	export let onGoogle: () => void;
	export let loading = false;
	export let error: string | null = null;
</script>

<div
	class="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-10 shadow-sm transition hover:shadow-md"
>
	<h2 class="mb-8 text-center text-3xl font-bold text-gray-800">
		{type === 'login' ? '로그인' : '회원가입'}
	</h2>

	{#if error}
		<p class="mb-4 text-center text-sm font-medium text-red-500">{error}</p>
	{/if}

	<div class="flex flex-col gap-4">
		{#if type === 'register'}
			<input
				type="text"
				placeholder="이름"
				value={fields.name}
				on:input={(e) => setFields('name', (e.target as HTMLInputElement).value)}
				class="rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
			/>
		{/if}

		<input
			type="email"
			placeholder="이메일"
			value={fields.email}
			on:input={(e) => setFields('email', (e.target as HTMLInputElement).value)}
			class="rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
		/>
		<input
			type="password"
			placeholder="비밀번호"
			value={fields.password}
			on:input={(e) => setFields('password', (e.target as HTMLInputElement).value)}
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					e.preventDefault();
					onSubmit();
				}
			}}
			class="rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
		/>

		{#if type === 'register'}
			<input
				type="password"
				placeholder="비밀번호 확인"
				value={fields.confirmPassword}
				on:input={(e) => setFields('confirmPassword', (e.target as HTMLInputElement).value)}
				on:keydown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault();
						onSubmit();
					}
				}}
				class="rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
			/>
		{/if}

		<LoginButton label={type === 'login' ? '로그인' : '회원가입'} onClick={onSubmit} />

		<LoginButton
			variant="google"
			label={type === 'login' ? 'Google로 로그인' : 'Google로 회원가입'}
			onClick={onGoogle}
		/>
	</div>

	<p class="mt-8 text-center text-sm text-gray-600">
		{#if type === 'login'}
			아직 회원이 아니신가요?
			<a href="/register" class="font-semibold text-blue-600 hover:underline">회원가입</a>
		{:else}
			이미 계정이 있으신가요?
			<a href="/login" class="font-semibold text-blue-600 hover:underline">로그인</a>
		{/if}
	</p>
</div>
