import type { RetrospectAnswers, RetrospectAnswersKPT } from '@/types/retrospect';

export const RETROSPECT_SECTIONS: { label: string; key: keyof RetrospectAnswers }[] = [
	{ label: '1️⃣ 오늘 한 일', key: 'today' },
	{ label: '2️⃣ 어려웠던 점', key: 'problem' },
	{ label: '3️⃣ 배운 점', key: 'learned' },
	{ label: '4️⃣ 내일 할 일', key: 'tomorrow' },
	{ label: '5️⃣ 총평', key: 'summary' }
];

export const RETROSPECT_KPT_SECTIONS: { label: string; key: keyof RetrospectAnswersKPT }[] = [
	{ label: '유지할 점', key: 'keep' },
	{ label: '아쉬운 점', key: 'problem' },
	{ label: '시도할 점', key: 'try' }
];
