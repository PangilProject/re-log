// src/lib/markdown.ts
import { browser } from '$app/environment';
import MarkdownIt from 'markdown-it';
import taskLists from 'markdown-it-task-lists';
import { highlight } from './prism';

const md = new MarkdownIt({
	html: true,
	linkify: true,
	typographer: true,
	highlight: browser ? highlight : undefined
}).use(taskLists);

// --- Renderer Wrapper to fix classes ---
// markdown-it의 기본 fence(코드블록) 렌더러를 가져옵니다.
const defaultFenceRenderer = md.renderer.rules.fence!;

// 기본 렌더러를 래핑하여 클래스 구조를 수정하는 새 렌더러를 정의합니다.
md.renderer.rules.fence = (tokens, idx, options, env, self) => {
	const token = tokens[idx];
	const lang = token.info ? token.info.trim() : '';
	// 기본 렌더러를 호출하여 원본 HTML을 생성합니다.
	const rendered = defaultFenceRenderer(tokens, idx, options, env, self);

	if (lang) {
		// 기본 렌더러가 생성한 <code class="language-xxx"> 에서 클래스를 제거하고,
		const withClassRemoved = rendered.replace(/<code class="language-(\w+)"/, '<code');
		// <pre> 태그에 language-xxx 와 line-numbers 클래스를 추가합니다.
		return withClassRemoved.replace(/<pre>/, `<pre class="language-${lang} line-numbers"`);
	}

	// 언어 정보가 없는 코드블록은 language-none 클래스를 추가합니다.
	return rendered.replace(/<pre>/, '<pre class="language-none"');
};

/**
 * 마크다운 문자열을 HTML로 변환하는 함수
 * @param markdown 변환할 마크다운 문자열
 * @returns 변환된 HTML 문자열
 */
export function renderMarkdown(markdown: string): string {
	return md.render(markdown);
}