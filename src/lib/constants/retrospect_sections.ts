import type { RetrospectAnswers } from '@/types/retrospect';

export const RETROSPECT_SECTIONS: { label: string; key: keyof RetrospectAnswers }[] = [
	{ label: '1️⃣ 오늘 한 일', key: 'today' },
	{ label: '2️⃣ 어려웠던 점', key: 'problem' },
	{ label: '3️⃣ 배운 점', key: 'learned' },
	{ label: '4️⃣ 내일 할 일', key: 'tomorrow' },
	{ label: '5️⃣ 총평', key: 'summary' }
];
