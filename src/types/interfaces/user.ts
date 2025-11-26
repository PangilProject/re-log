import type { Timestamp } from 'firebase/firestore';

export interface UserDoc {
	uid: string;
	displayName: string;
	email: string;
	createdAt: Timestamp;
	updatedAt?: unknown;
}
