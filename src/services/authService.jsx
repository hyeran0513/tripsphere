import { auth, db } from '../firebase/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { validateForm } from '../utils/validation';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

// 이메일 & 비밀번호 회원가입
export const signupUser = async ({ email, password, showToast }) => {
  // Firebase에 새 사용자 생성
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  // 이메일 인증 링크 전송
  await sendEmailVerification(userCredential.user);

  // 이메일 인증 링크 확인 토스트 메시지
  showToast('warning', '이메일 인증 링크를 확인하세요!');

  return userCredential.user;
};

// 유저 정보 저장
export const saveUserInfo = async ({ username, nickname, phone }) => {
  const user = auth.currentUser;

  if (!user) {
    console.log('사용자가 없습니다.');
    return;
  }

  // Firebase 사용자 프로필 업데이트
  await updateProfile(user, { displayName: username });

  // Firebase의 users 테이블에 데이터 저장
  await setDoc(doc(db, 'users', user.uid), {
    email: user.email,
    createAt: serverTimestamp(),
    username,
    nickname,
    phone,
    profile_image: '',
    wishlist: [],
    orders: [],
    cart: [],
    points: 0,
  });

  return user;
};

// 로그인
export const signInUser = async ({ email, password, dispatch }) => {
  // 폼 유효성 검사
  const errors = validateForm({ email, password }, 'signin');
  if (Object.keys(errors).length > 0) {
    dispatch({ type: 'SET_ERRORS', payload: errors });
    return;
  }

  // Firebase 로그인 요청
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );

  return userCredential.user;
};

// 비밀번호 재설정
export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

// 이메일 인증되지 않은 유저 삭제
export const deleteUnverifiedUser = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user && !user.emailVerified) {
    try {
      await user.delete();
    } catch (error) {
      console.error('유저 삭제 실패:', error.message);
    }
  }
};
