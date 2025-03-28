import { useQuery } from '@tanstack/react-query';
import {
  fetchAccomData,
  getFilteredRoomData,
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
export const useRoomData = (roomIds) => {
  return useQuery({
    queryKey: ['rooms', roomIds],
    queryFn: () => getRoomData(roomIds),
    enabled: Array.isArray(roomIds) && roomIds.length > 0,
  });
};

// 필터링된 숙소 정보 쿼리
export const useFilteredRoomData = (accomId, filters) => {
  return useQuery({
    queryKey: ['filteredRoom', accomId, filters],
    queryFn: () => getFilteredRoomData(accomId, filters),
    enabled: !!accomId,
  });
};
