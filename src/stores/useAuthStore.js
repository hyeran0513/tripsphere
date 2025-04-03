import { signOut } from 'firebase/auth';
import { create } from 'zustand';
import { auth } from '../firebase/firebaseConfig';
import { fetchUserData } from '../services/userService';

const useAuthStore = create((set, get) => ({
  isAuthenticated: false,
  user: null,
  unsubscribeAuthListener: null,

  // Firebase 인증 상태 초기화
  initializeAuth: () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        set({ isAuthenticated: true, user });
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        set({ isAuthenticated: false, user: null });
        localStorage.removeItem('user');
      }
    });
  },

  // 로그인
  login: (userData) => {
    set({ isAuthenticated: true, user: userData });
    localStorage.setItem('user', JSON.stringify(userData));
  },

  // 로그아웃
  logout: async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      set({ isAuthenticated: false, user: null });
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  },

  // 인증 상태 변경 리스너 구독 액션
  subscribeAuthChanges: () => {
    // 기존 리스너가 있다면 해제
    const { unsubscribeAuthListener } = get();
    if (unsubscribeAuthListener) {
      unsubscribeAuthListener();
    }

    // 새 리스너 등록
    const newUnsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // 로그인 상태
        set({ isAuthenticated: true, user });
        localStorage.setItem('user', JSON.stringify(user));

        // 사용자 프로필 정보
        const profile = await fetchUserData(user.uid);
        set((state) => ({ user: { ...state.user, ...profile } }));
      } else {
        // 로그아웃 상태
        set({ isAuthenticated: false, user: null });
        localStorage.removeItem('user');
      }
    });

    set({ unsubscribeAuthListener: newUnsubscribe });
  },

  // 리스너 해제 액션 (앱 종료 또는 필요 시 호출)
  cleanupAuthListener: () => {
    const { unsubscribeAuthListener } = get();
    if (unsubscribeAuthListener) {
      unsubscribeAuthListener();
      set({ unsubscribeAuthListener: null });
    }
  },
}));

export default useAuthStore;
