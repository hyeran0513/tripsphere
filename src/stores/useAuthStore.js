import { signOut } from 'firebase/auth';
import { create } from 'zustand';
import { auth } from '../firebase/firebaseConfig';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,

  initializeAuth: () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // 인증된 유저가 있으면 상태 업데이트
        set({ isAuthenticated: true, user: user });
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        // 인증된 유저가 없으면 상태 초기화
        set({ isAuthenticated: false, user: null });
        localStorage.removeItem('user');
      }
    });
  },

  login: (userData) => {
    set({ isAuthenticated: true, user: userData });
    localStorage.setItem('user', JSON.stringify(userData));
  },

  logout: async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      set({ isAuthenticated: false, user: null });
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  },
}));

export default useAuthStore;
