import {
	browserLocalPersistence,
	setPersistence,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
	signOut,
	deleteUser
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc, deleteDoc } from 'firebase/firestore';
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
		await setPersistence(auth, browserLocalPersistence);

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
		await setPersistence(auth, browserLocalPersistence);

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

/**
 * 로그아웃 기능
 */
export async function logout() {
	try {
		await signOut(auth);
		return { success: true };
	} catch (error) {
		console.error('로그아웃 오류:', error);
		return { success: false, error };
	}
}

/**
 * 🔧 사용자 프로필 업데이트 (이름 변경 등)
 * @param user - Firebase User 객체
 * @param newProfile - { displayName?: string, photoURL?: string }
 */
export async function updateUserProfile(
	user: any,
	newProfile: { displayName?: string; photoURL?: string }
) {
	try {
		await updateProfile(user, newProfile);

		// Firestore의 users 문서도 동기화
		const userRef = doc(db, 'users', user.uid);
		await setDoc(userRef, { ...newProfile, updatedAt: serverTimestamp() }, { merge: true });

		return { success: true };
	} catch (error) {
		console.error('프로필 업데이트 오류:', error);
		return { success: false, error };
	}
}

/**
 * 🧨 회원 탈퇴 (Auth + Firestore 동시 삭제)
 * @param user - Firebase User 객체
 */
export async function deleteUserAccount(user: any) {
	try {
		// Firestore 사용자 문서 삭제
		await deleteDoc(doc(db, 'users', user.uid));

		// Firebase Auth 사용자 삭제
		await deleteUser(user);

		return { success: true };
	} catch (error) {
		console.error('회원 탈퇴 오류:', error);
		return { success: false, error };
	}
}
