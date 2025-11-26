import type { Timestamp } from 'firebase/firestore';

export interface RetrospectDoc {
	id: string;
	title: string;
	userId: string;
	createdAt: Timestamp;
}
