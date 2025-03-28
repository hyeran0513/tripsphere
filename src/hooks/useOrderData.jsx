import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  cancelUserOrder,
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
  return useQueries({
    queryKey: ['orders', orderID],
    queryFn: () => orderQuery(orderID),
    enabled: !!orderID,
  });
};
