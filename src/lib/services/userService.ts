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
	reauthenticateWithPopup
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
 * 사용자 프로필 업데이트 (이름 변경 등)
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
 * 회원 탈퇴 (Auth + Firestore 동시 삭제)
 * @param user - Firebase User 객체
 */
export async function deleteUserAccount(user: any, password?: string) {
	try {
		const userId = user.uid;

		// 1️⃣ Firestore - retrospectives 컬렉션의 해당 사용자 문서 삭제
		const retrospectivesRef = collection(db, 'retrospectives');
		const q = query(retrospectivesRef, where('userId', '==', userId));
		const querySnapshot = await getDocs(q);

		const deletePromises = querySnapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
		await Promise.all(deletePromises);

		// 2️⃣ Firestore - users 컬렉션 문서 삭제
		await deleteDoc(doc(db, 'users', userId));

		// 3️⃣ Auth - 계정 삭제 전 재인증
		const providerId = user.providerData[0]?.providerId;

		if (providerId === 'password') {
			// 이메일/비밀번호 계정인 경우
			if (!password) {
				throw new Error('비밀번호가 필요합니다.');
			}
			const credential = EmailAuthProvider.credential(user.email, password);
			await reauthenticateWithCredential(user, credential);
		} else if (providerId === 'google.com') {
			// 구글 로그인 계정인 경우
			const googleProvider = new GoogleAuthProvider();
			await reauthenticateWithPopup(user, googleProvider);
		}

		// 4️⃣ Firebase Auth 사용자 삭제
		await deleteUser(user);

		return { success: true };
	} catch (error: any) {
		console.error('회원 탈퇴 오류:', error);
		if (error.code === 'auth/requires-recent-login') {
			alert('계정을 삭제하려면 다시 로그인해야 합니다.');
		} else {
			alert('회원 탈퇴 중 문제가 발생했습니다.');
		}
		return { success: false, error };
	}
}
