// Daily retrospect keys
export const DAILY_RETROSPECT_KEYS = ['today', 'problem', 'learned', 'tomorrow', 'summary'] as const;

// KPT retrospect keys
export const KPT_RETROSPECT_KEYS = ['keep', 'problem', 'try'] as const;

// Combined keys for type safety
const combinedKeys = [...new Set([...DAILY_RETROSPECT_KEYS, ...KPT_RETROSPECT_KEYS])];
export const ALL_RETROSPECT_KEYS = combinedKeys as readonly string[];

// Union type for all possible keys
export type AnswerKey = (typeof ALL_RETROSPECT_KEYS)[number];
