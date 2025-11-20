export const DAILY_RETROSPECT_KEYS = [
	'today',
	'problem',
	'learned',
	'tomorrow',
	'summary'
] as const;

export const KPT_RETROSPECT_KEYS = ['keep', 'problem', 'try'] as const;

const combinedKeys = [...new Set([...DAILY_RETROSPECT_KEYS, ...KPT_RETROSPECT_KEYS])];
export const ALL_RETROSPECT_KEYS = combinedKeys as readonly string[];

export type AnswerKey = (typeof ALL_RETROSPECT_KEYS)[number];
