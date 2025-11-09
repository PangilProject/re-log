import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { auth, db, provider } from '$lib/firebase';

/**
 * 이메일로 회원가입하는 기능
 *
 * @param name
 * @param email
 * @param password
 * @returns
 */
export async function registerWithEmail(name: string, email: string, password: string) {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;

		await updateProfile(user, { displayName: name });

		await setDoc(doc(db, 'users', user.uid), {
			uid: user.uid,
			displayName: name,
			email: user.email,
			createdAt: serverTimestamp()
		});

		return { success: true, user };
	} catch (error) {
		console.error('회원가입 오류:', error);
		return { success: false, error };
	}
}

/**
 * 이메일로 로그인하는 기능
 * @param email
 * @param password
 * @returns
 */
export async function loginWithEmail(email: string, password: string) {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		return { success: true, user: userCredential.user };
	} catch (error) {
		console.error('로그인 오류:', error);
		return { success: false, error };
	}
}

/**
 * 구글 계정으로 로그인하는 기능
 * @returns
 */
export async function loginWithGoogle() {
	try {
		const result = await signInWithPopup(auth, provider);
		const user = result.user;

		const userRef = doc(db, 'users', user.uid);
		const docSnap = await getDoc(userRef);

		if (!docSnap.exists()) {
			await setDoc(userRef, {
				uid: user.uid,
				displayName: user.displayName,
				email: user.email,
				createdAt: serverTimestamp()
			});
		}

		return { success: true, user };
	} catch (error) {
		console.error('구글 로그인 오류:', error);
		return { success: false, error };
	}
}
