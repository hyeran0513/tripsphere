import { useMutation, useQuery } from '@tanstack/react-query';
import useAuthStore from '../stores/useAuthStore';
import {
  editUserData,
  fetchUserData,
  verifyPassword,
} from '../services/userService';

// 사용자 정보 조회
export const useUserData = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['user', user?.uid],
    queryFn: () => fetchUserData(user?.uid),
    enabled: !!user?.uid,
  });
};

// 사용자 정보 수정
export const useEditUserData = (showModal) => {
  const { user, login } = useAuthStore();

  return useMutation({
    mutationFn: (updatedData) => editUserData(user?.uid, updatedData),
    onSuccess: async () => {
      const updatedUser = await fetchUserData(user.uid);
      login({ ...user, ...updatedUser });

      showModal('success', '', '유저 정보가 수정되었습니다.');
    },
    onError: (error) => {
      showModal('error', '', '유저 정보 수정이 실패했습니다.');
      console.error('유저 정보 수정 실패: ', error);
    },
  });
};

// 본인 인증
export const useVerifyPassword = () => {
  return useMutation({
    mutationFn: (password) => verifyPassword(password),
    onSuccess: () => {
      console.log('본인 인증 성공했습니다.');
    },
    onError: (error) => {
      console.error('본인 인증 실패했습니다.', error.message);
    },
  });
};
