import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  checkFavorite,
  controlFavorite,
  getFavoriteAccomm,
} from '../services/favoriteService';

// 찜 버튼 제어
export const useControlFavorite = (showToast) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accommodationId) => controlFavorite(accommodationId),
    onSuccess: (data, variables) => {
      if (data === 'add') {
        showToast('success', '찜 목록에 추가되었습니다.');
      }
      if (data === 'remove') {
        showToast('warning', '찜 목록에서 제거되었습니다.');
      }

      // favorite 데이터를 무효화하여 최신 데이터를 다시 조회
      queryClient.invalidateQueries(['favorite', variables]);
    },
    onError: (error) => {
      showToast('error', '찜 목록에 항목 추가 오류');
      console.error('찜 목록에 항목 추가 오류:', error.message);
    },
  });
};

// 찜 선택 여부
export const useCheckFavorite = (accommodationId) => {
  return useQuery({
    queryKey: ['favorite', accommodationId],
    queryFn: () => checkFavorite(accommodationId),
    enabled: !!accommodationId,
  });
};

// 찜 목록 숙소 정보 조회
export const useFavoriteAccommData = (userId) => {
  return useQuery({
    queryKey: ['favorite', userId],
    queryFn: () => getFavoriteAccomm(),
    enabled: !!userId,
  });
};
