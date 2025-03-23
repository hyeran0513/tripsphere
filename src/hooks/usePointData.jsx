import { useMutation, useQuery } from '@tanstack/react-query';
import { addPoints, getPoints } from '../services/pointService';

// 포인트 내역 조회
export const usePointData = (userId) => {
  return useQuery({
    queryKey: ['points'],
    queryFn: () => getPoints(userId),
    enabled: !!userId,
  });
};

// 포인트 추가 및 포인트 내역 추가
export const useAddPoints = (userId) => {
  return useMutation({
    mutationKey: ['addPoint'],
    mutationFn: (points) => addPoints(userId, points),
    enabled: !!userId,
  });
};
