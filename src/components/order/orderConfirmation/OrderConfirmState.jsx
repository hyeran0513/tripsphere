import { useEffect, useState } from 'react';
import { FcApproval, FcCancel, FcClock, FcQuestions } from 'react-icons/fc';

import { useLocation, useNavigate } from 'react-router-dom';
import { useOrdersDataByOrderId } from '../../../hooks/useOrderData';
import useCheckoutStore from '../../../stores/useCheckoutStore';
import useOrderStore from '../../../stores/useOrderStore';
import useRoomSelectionStore from '../../../stores/useRoomSelectionStore';
import OrderCard from './OrderCard';

const OrderState = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 페이지 경로 감지

  const {
    reservationInfo: tmpReserveInfo,
    clearReservationInfo: resetTmpReserveInfo,
  } = useRoomSelectionStore();

  const {
    roomIds,
    setRoomIds,
    resetRoomIds,
    reservationInfo,
    clearReservationInfo,
  } = useCheckoutStore();

  const { orderIds, setOrderIds, resetOrderIds } = useOrderStore();

  // 페이지 이동 감지 후 상태 초기화
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      console.log('페이지 이동 감지: ', location.pathname);

      // 특정 페이지로 이동할 때만 상태 초기화
      if (location.pathname !== '/orderstate') {
        console.log(
          `감지 : location.pathname !== '/orderstate' : `,
          location.pathname !== '/orderstate',
        );
        // resetOrderIds();
        // resetRoomIds();
        // clearReservationInfo();
      }
    };

    return () => {
      handleBeforeUnload(); // 언마운트 시 실행
    };
  }, [location]);

  // 첫 렌더링시 store 초기화.
  useEffect(() => {
    return () => {
      console.log('언마운트 동작');

      // 개발환경에서 strict로 인한 언마운트 동작
      // resetOrderIds();
      // clearReservationInfo();
      // resetRoomIds();
      // resetTmpReserveInfo();
    };
  }, []);

  const [tmp, setTmp] = useState(null);

  const { data: orders, isLoading, isError } = useOrdersDataByOrderId(tmp);

  useEffect(() => {
    console.log('orderIds : ', orderIds);
    setTmp(orderIds);
  }, [orderIds]);

  useEffect(() => {
    console.log('tmp : ', tmp);
  }, [tmp]);

  useEffect(() => {
    console.log('orders : ', orders);
  }, [orders]);

  useEffect(() => {
    console.log(
      'orders : ',
      orders,
      'isLoading, isError :',
      isLoading,
      isError,
    );
  }, [isLoading, isError]);

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
    <div className="flex flex-col justify-center items-center gap-4">
      <Icon size={50} />

      <h1 className="text-4xl font-semibold tracking-tight">{message}</h1>

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

export default OrderState;
