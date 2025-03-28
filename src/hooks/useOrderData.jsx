import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  cancelUserOrder,
  checkout,
  fetchUserOrders,
  getOrderData,
  orderQuery,
} from '../services/orderService';

// 주문내역 조회 (기존)
export const useUserOrders = (userId) => {
  return useQuery({
    queryKey: ['orders', userId],
    queryFn: () => fetchUserOrders(userId),
    enabled: !!userId,
  });
};

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

// 주문아이디로 내역 조회
export const useOrderDataGetByOrderID = (orderID) => {
  console.log('orderID : ', orderID);
  if (orderID === undefined || !orderID || orderID.length < 1) return [];

  console.log('orderID length : ', orderID.length);
  console.log('Array.isArray(orderID) :', Array.isArray(orderID));
  return useQueries(
    Array.isArray(orderID)
      ? orderID.map((id) => ({
          queryKey: ['orders', id],
          queryFn: () => orderQuery(id),
          enabled: !!id,
        }))
      : [],
  );
};

// 결제하기
export const useCheckout = (userId, showToast) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderItem) => checkout(orderItem),
    onSuccess: () => {
      queryClient.invalidateQueries(['orders', userId]);
      showToast('success', '주문 목록에 항목을 추가했습니다.');
    },
    onError: () => {
      showToast('error', '주문 목록에 항목 추가가 실패했습니다.');
    },
  });
};
