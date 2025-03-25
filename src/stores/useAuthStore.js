import { signOut } from 'firebase/auth';
import { create } from 'zustand';
import { auth } from '../firebase/firebaseConfig';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,

  initializeAuth: () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      set({ isAuthenticated: true, user: JSON.parse(storedUser) });
    }
  },

  login: (userData) => {
    set({ isAuthenticated: true, user: userData });
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
