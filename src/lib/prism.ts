import prism from 'prismjs';

import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-sql.js';
import 'prismjs/components/prism-diff.js';
import 'prismjs/components/prism-java.js';
import 'prismjs/components/prism-c.js';

export function highlight(code: string, lang: string): string {
	const language = lang.toLowerCase();

	if (prism.languages[language]) {
		try {
			return prism.highlight(code, prism.languages[language], language);
		} catch (e) {
			console.error(`Error highlighting language: ${language}`, e);
		}
	}

	return escapeHtml(code);
}

function escapeHtml(code: string): string {
	return code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
