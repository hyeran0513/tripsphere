import { useQuery } from '@tanstack/react-query';
import { getPoints } from '../services/pointService';

// 포인트 내역 조회
export const usePointData = (userId) => {
  return useQuery({
    queryKey: ['points'],
    queryFn: () => getPoints(userId),
    enabled: !!userId,
  });
};
