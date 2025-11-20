import type { Timestamp } from 'firebase/firestore';

export function formatDate(timestamp: Timestamp | null | undefined) {
	if (!timestamp) return '';
	const date = timestamp.toDate();
	return new Intl.DateTimeFormat('ko-KR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timeZone: 'UTC',
		hour12: false
	}).format(date);
}
