// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';
import { browser } from '$app/environment';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export let analytics: Analytics | null = null;

if (browser) {
	isSupported().then((supported) => {
		if (supported) {
			analytics = getAnalytics(app);
		}
	});
}
// db 관련 기능
export const db = getFirestore(app);
// 계정 관련 기능
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
