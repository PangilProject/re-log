// src/lib/prism.ts
import prism from 'prismjs';

// --- 사용할 언어 등록 ---
// core와 함께 기본적으로 포함되는 언어들: markup, css, clike, javascript
// 필요한 언어를 아래처럼 직접 import하여 Prism에 등록합니다.
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-sql.js';
import 'prismjs/components/prism-diff.js';
import 'prismjs/components/prism-java.js';
import 'prismjs/components/prism-c.js';

/**
 * Prism.js를 사용해 코드를 하이라이트하는 함수
 * @param code 하이라이트할 코드 문자열
 * @param lang 코드의 프로그래밍 언어
 * @returns 하이라이트된 HTML 문자열 (<code> 태그의 내용물)
 */
export function highlight(code: string, lang: string): string {
	const language = lang.toLowerCase();

	// Prism에 해당 언어가 등록되어 있는지 확인
	if (prism.languages[language]) {
		try {
			return prism.highlight(code, prism.languages[language], language);
		} catch (e) {
			console.error(`Error highlighting language: ${language}`, e);
		}
	}

	// 등록되지 않은 언어는 이스케이프 처리만 함
	return escapeHtml(code);
}

// 간단한 HTML 이스케이프 함수
function escapeHtml(code: string): string {
	return code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}