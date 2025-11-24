import {
	browserLocalPersistence,
	setPersistence,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
	signOut,
	deleteUser,
	EmailAuthProvider,
	reauthenticateWithCredential,
	GoogleAuthProvider,
	reauthenticateWithPopup,
	type User
} from 'firebase/auth';
import {
	doc,
	setDoc,
	serverTimestamp,
	getDoc,
	deleteDoc,
	collection,
	query,
	where,
	getDocs
} from 'firebase/firestore';
import { auth, db, provider } from '$lib/firebase';
import {
	customGoodBye,
	errorCancelledPopup,
	errorDeleteAccount,
	errorInvalidPassword,
	errorMismatchUser,
	errorNeedReLogin
} from '$lib/utils/toast';
import type { FirebaseError } from 'firebase/app';

/**
 * 이메일로 회원가입하는 기능
 * Firebase Authentication을 통해 계정을 생성하고,
 * Firestore에 사용자 정보(users 컬렉션)를 저장하며
 * displayName까지 함께 설정한다.
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
 * 이메일과 비밀번호로 로그인하는 기능
 * Firebase Auth의 email/password 방식으로 로그인하며
 * 로그인 상태를 local persistence로 유지한다.
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
 * Google OAuth 팝업을 통해 인증하고,
 * Firestore users 문서가 없으면 신규 사용자로 등록한다.
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
 * 현재 인증된 Firebase Auth 사용자를 로그아웃한다.
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
 * 사용자 프로필 업데이트 기능
 * Firebase Auth의 사용자 정보(displayName, photoURL 등)를 수정하고
 * Firestore의 users 컬렉션에도 동일하게 최신 데이터로 업데이트한다.
 */

export async function updateUserProfile(
	user: User,
	newProfile: { displayName?: string; photoURL?: string }
) {
	try {
		await updateProfile(user, newProfile);

		const userRef = doc(db, 'users', user.uid);
		await setDoc(userRef, { ...newProfile, updatedAt: serverTimestamp() }, { merge: true });

		return { success: true };
	} catch (error) {
		console.error('프로필 업데이트 오류:', error);
		return { success: false, error };
	}
}

export async function updateUserDocument(
	uid: string,
	newProfile: { displayName?: string; photoURL?: string }
) {
	try {
		const userRef = doc(db, 'users', uid);
		await setDoc(userRef, { ...newProfile, updatedAt: serverTimestamp() }, { merge: true });

		return { success: true };
	} catch (error) {
		console.error('프로필 문서 업데이트 오류:', error);
		return { success: false, error };
	}
}

/**
 * 회원 탈퇴 기능
 * - 비밀번호/구글 계정 방식에 따라 재인증을 수행하고
 * - 해당 사용자의 회고(retrospectives) 문서를 모두 삭제하고
 * - Firestore의 users 문서를 삭제한 뒤
 * - Firebase Auth 계정 자체를 삭제한다.
 * 오류 상황에 따라 다양한 토스트 메시지를 출력한다.
 */

export async function deleteUserAccount(user: User, password?: string) {
	try {
		const userId = user.uid;
		const providerId = user.providerData[0]?.providerId;

		if (providerId === 'password') {
			if (!password) {
				throw new Error('비밀번호가 필요합니다.');
			}
			const email = user.email;
			if (email) {
				const credential = EmailAuthProvider.credential(user.email, password);
				await reauthenticateWithCredential(user, credential);
			}
		} else if (providerId === 'google.com') {
			const googleProvider = new GoogleAuthProvider();
			await reauthenticateWithPopup(user, googleProvider);
		}

		const retrospectivesRef = collection(db, 'retrospectives');
		const q = query(retrospectivesRef, where('userId', '==', userId));
		const querySnapshot = await getDocs(q);

		const deletePromises = querySnapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
		await Promise.all(deletePromises);

		await deleteDoc(doc(db, 'users', userId));

		await deleteUser(user);

		customGoodBye();
		return { success: true };
	} catch (error: unknown) {
		console.error('회원 탈퇴 오류:', error);

		const firebaseError = error as FirebaseError;

		if (firebaseError.code === 'auth/requires-recent-login') {
			errorNeedReLogin();
		} else if (firebaseError.code === 'auth/invalid-credential') {
			errorInvalidPassword();
		} else if (
			firebaseError.code === 'auth/cancelled-popup-request' ||
			firebaseError.code === 'auth/popup-closed-by-user'
		) {
			errorCancelledPopup();
		} else if (firebaseError.code === 'auth/user-mismatch') {
			errorMismatchUser();
		} else {
			errorDeleteAccount();
		}

		return { success: false, error: firebaseError };
	}
}

/**
 * 모든 사용자 목록을 가져오는 기능
 * Firestore users 컬렉션의 모든 문서를 조회하여
 * 사용자 데이터를 배열 형태로 반환한다.
 */
export async function getAllUsers() {
	try {
		const usersCollection = collection(db, 'users');
		const userSnapshot = await getDocs(usersCollection);
		const userList = userSnapshot.docs.map((doc) => doc.data());
		return { success: true, users: userList };
	} catch (error) {
		console.error('사용자 목록 조회 오류:', error);
		return { success: false, error };
	}
}
