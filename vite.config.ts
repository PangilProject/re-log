import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	resolve: {
		conditions: ['browser']
	},
	test: {
		include: ['src/tests/vitest/**/*.test.ts'],
		exclude: ['src/tests/playwright/**'],
		environment: 'jsdom',
		setupFiles: ['./setupTest.ts'],
		globals: true
	}
});
