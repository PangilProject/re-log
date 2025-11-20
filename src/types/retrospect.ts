export type RetrospectAnswers = {
	today: string;
	problem: string;
	learned: string;
	tomorrow: string;
	summary: string;
};

export interface RetrospectDocument {
	type: 'daily' | 'kpt';
	title: string;
	answers: RetrospectAnswers | RetrospectAnswersKPT;
	userId: string;
	createdAt?: any;
	updatedAt?: any;
	selectedEmotions: string[];
}

export interface RetrospectPayload {
	type: 'daily' | 'kpt';
	title: string;
	answers: RetrospectAnswers | RetrospectAnswersKPT;
	selectedEmotions: string[];
}

export type RetrospectAnswersKPT = {
	keep: string;
	problem: string;
	try: string;
};
