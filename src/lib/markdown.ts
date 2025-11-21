import { browser } from '$app/environment';
import MarkdownIt from 'markdown-it';
import taskLists from 'markdown-it-task-lists';
import { highlight } from './prism';
import DOMPurify from 'dompurify';

const md = new MarkdownIt({
	html: true,
	linkify: true,
	typographer: true,
	highlight: browser ? highlight : undefined
}).use(taskLists);

const defaultFenceRenderer = md.renderer.rules.fence!;

md.renderer.rules.fence = (tokens, idx, options, env, self) => {
	const token = tokens[idx];
	const lang = token.info ? token.info.trim() : '';
	const rendered = defaultFenceRenderer(tokens, idx, options, env, self);

	if (lang) {
		const withClassRemoved = rendered.replace(/<code class="language-(\w+)"/, '<code');
		return withClassRemoved.replace(/<pre>/, `<pre class="language-${lang} line-numbers"`);
	}

	return rendered.replace(/<pre>/, '<pre class="language-none"');
};

/**
 * 마크다운 문자열을 HTML로 변환하는 함수
 * @param markdown 변환할 마크다운 문자열
 * @returns 변환된 HTML 문자열
 */
export function renderMarkdown(markdown: string): string {
	const renderedHtml = md.render(markdown);
	if (browser) {
		return DOMPurify.sanitize(renderedHtml);
	}
	return renderedHtml;
}
