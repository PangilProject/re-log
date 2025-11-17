<script lang="ts">
	import AuthForm from './AuthForm.svelte';
	import { handleRegister, handleGoogleAuth } from './AuthLogic';

	let fields = { name: '', email: '', password: '', confirmPassword: '' };
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
	type="register"
	{fields}
	{error}
	{loading}
	{setFields}
	onSubmit={() => handleRegister({ ...fields, setError, setLoading })}
	onGoogle={() => handleGoogleAuth(setError, setLoading)}
/>
