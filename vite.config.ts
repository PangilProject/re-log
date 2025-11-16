import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	test: {
		include: ['src/tests/vitest/**/*.test.ts'],
		exclude: ['src/tests/playwright/**'],
		environment: 'jsdom'
	}
});
