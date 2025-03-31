import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  cancelUserOrder,
  checkout,
  getOrderData,
  getOrdersByOrderIds,
  getOrdersByRoomIds,
} from '../services/orderService';

// 주문 취소 (UI)
export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelUserOrder,
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries(['orders', userId]);
    },
    onError: (error) => {
      console.error('오류: ' + error.message);
    },
  });
};

// 주문 내역 조회
export const useOrderData = (userId) => {
  return useQuery({
    queryKey: ['orders', userId],
    queryFn: () => getOrderData(userId),
    enabled: !!userId,
  });
};

// 결제하기
export const useCheckout = (userId, data, showToast) => {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn: (orderItem) => checkout(orderItem, userId),
    mutationFn: (orderItem) => {
      const orderId = checkout(orderItem, userId);
      return orderId;
    },
    onSuccess: () => {
      data.forEach((item) => {
        queryClient.invalidateQueries(['orders', item.roomId]);
      });
      showToast('success', '주문 목록에 항목을 추가했습니다.');
    },
    onError: () => {
      showToast('error', '주문 목록에 항목 추가가 실패했습니다.');
    },
  });
};

// 결제완료된 주문 데이터 조회
export const useOrdersDataByRoomId = (roomIds) => {
  return useQuery({
    queryKey: ['orders', roomIds],
    queryFn: () => getOrdersByRoomIds(roomIds),
    enabled: !!roomIds && roomIds.length > 0,
  });
};

// 전달받은 주문 ID 로 주문데이터 조회.
// 결과페이지 출력용
export const useOrdersDataByOrderId = (orderIds) => {
  return useQuery({
    queryKey: ['orders', orderIds],
    queryFn: () => getOrdersByOrderIds(orderIds),
    enabled: !!orderIds && orderIds.length > 0,
  });
};
