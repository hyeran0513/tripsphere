import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addReview,
  fetchAllReviewData,
  getAverageRatings,
} from '../services/reviewService';

// 특정 숙소에 대한 리뷰 전체 내용 조회
export const useReviewData = (accomId) => {
  return useQuery({
    queryKey: ['review', accomId],
    queryFn: () => fetchAllReviewData(accomId),
    enabled: !!accomId,
  });
};

// 리뷰 추가
export const useAddReview = (showToast) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (review) => addReview(review),
    onSuccess: () => {
      showToast('success', '리뷰가 성공적으로 추가되었습니다.');

      queryClient.invalidateQueries(['review']);
      queryClient.invalidateQueries(['reviews']);
    },
    onError: (error) => {
      showToast('error', '리뷰 추가 중 오류가 발생했습니다.');
      console.error('리뷰 추가 중 오류 발생:', error.message);
    },
  });
};

// 평점 평균 조회
export const useGetAverageRatings = (accomId) => {
  return useQuery({
    queryKey: ['reviews', accomId],
    queryFn: () => getAverageRatings(accomId),
    enabled: !!accomId,
  });
};
