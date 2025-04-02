import { useEffect, useState } from 'react';
import { FcApproval, FcCancel, FcClock, FcQuestions } from 'react-icons/fc';
import { useOrdersDataByOrderId } from '../../hooks/useOrderData';
import useCheckoutStore from '../../stores/useCheckoutStore';
import useOrderStore from '../../stores/useOrderStore';
import useRoomSelectionStore from '../../stores/useRoomSelectionStore';
import OrderCard from './OrderCard';

const OrderConfirmState = () => {
  const {
    reservationInfo: tmpReserveInfo,
    clearReservationInfo: resetTmpReserveInfo,
  } = useRoomSelectionStore();

  const { resetRoomIds, clearReservationInfo } = useCheckoutStore();

  const { orderIds, resetOrderIds } = useOrderStore();

  useEffect(() => {
    if (import.meta.env.MODE !== 'development') {
      return () => {
        resetOrderIds();
        clearReservationInfo();
        resetRoomIds();
        resetTmpReserveInfo();
      };
    }
  }, []);

  const [tmp, setTmp] = useState(null);

  const { data: orders, isLoading, isError } = useOrdersDataByOrderId(tmp);

  useEffect(() => {
    setTmp(orderIds);
  }, [orderIds]);

  useEffect(() => {}, [tmp]);

  useEffect(() => {}, [orders]);

  if (isLoading) {
    return <>주문정보 로딩 중...</>;
  }
  if (isError) {
    return <>{isError.message}</>;
  }

  // 주문 상태 조회
  const getOrderStatus = () => {
    if (orders?.some((room) => room.payment_status === 'pending')) {
      return { Icon: FcClock, message: '결제 대기중입니다.' };
    }

    if (orders?.some((room) => room.payment_status === 'canceled')) {
      return { Icon: FcCancel, message: '결제가 취소 되었습니다.' };
    }

    if (orders?.every((room) => room.payment_status === 'completed')) {
      return { Icon: FcApproval, message: '결제가 완료되었습니다.' };
    }

    return { Icon: FcQuestions, message: '정보를 확인할 수 없습니다.' };
  };

  const { Icon, message } = getOrderStatus();

  return (
    <div className="w-[600px] flex flex-col justify-center items-center gap-4">
      <Icon size={50} />

      <h3 className="text-4xl font-semibold tracking-tight">{message}</h3>

      {orders?.map((item, index) => (
        <OrderCard
          key={item.id || index}
          data={item}
          index={index}
        />
      ))}
    </div>
  );
};

export default OrderConfirmState;
