export const RETROSPECT_KEYS = ['today', 'problem', 'learned', 'tomorrow', 'summary'] as const;

export type AnswerKey = (typeof RETROSPECT_KEYS)[number];
