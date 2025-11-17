<script lang="ts">
	import AuthForm from './AuthForm.svelte';
	import { handleLogin, handleGoogleAuth } from './AuthLogic';

	let fields = { email: '', password: '' };
	let error: string | null = null;
	let loading = false;

	function setFields(key: string, value: string) {
		fields = { ...fields, [key]: value };
	}
	function setError(msg: string | null) {
		error = msg;
	}
	function setLoading(state: boolean) {
		loading = state;
	}
</script>

<AuthForm
	type="login"
	{fields}
	{error}
	{loading}
	{setFields}
	onSubmit={() => handleLogin({ ...fields, setError, setLoading })}
	onGoogle={() => handleGoogleAuth(setError, setLoading)}
/>
