import { useQuery } from '@tanstack/react-query';
import {
  fetchAccomData,
  getRoomData,
  getRoomOfAccomData,
} from '../services/productService.';

// 숙소 정보 조회
export const useAccomData = (accomId) => {
  return useQuery({
    queryKey: ['accommodation', accomId],
    queryFn: () => fetchAccomData(accomId),
    enabled: !!accomId,
  });
};

// 숙소 내 객실 정보조회
export const useRoomOfAccomData = (accomId) => {
  return useQuery({
    queryKey: ['rooms', accomId],
    queryFn: () => getRoomOfAccomData(accomId),
    enabled: !!accomId,
  });
};

// 객실 정보 조회
export const useRoomData = (roomId) => {
  return useQuery({
    queryKey: ['room', roomId],
    queryFn: () => getRoomData(roomId),
    enabled: !!roomId,
  });
};
