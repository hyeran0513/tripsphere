import OrderCard from './OrderCard';
import { FcApproval, FcCancel, FcClock, FcQuestions } from 'react-icons/fc';
import { useOrdersDataByRoomId } from '../../../hooks/useOrderData';

const OrderState = ({ orderList }) => {
  const roomIds = orderList.map((room) => room.roomId);
  const { data: orders, isLoading, isError } = useOrdersDataByRoomId(roomIds);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생!</div>;

  // 주문 상태 조회
  const getOrderStatus = () => {
    if (orders.some((room) => room.payment_status === 'pending')) {
      return { Icon: FcClock, message: '결제 대기중입니다.' };
    }

    if (orders.some((room) => room.payment_status === 'canceled')) {
      return { Icon: FcCancel, message: '결제가 취소 되었습니다.' };
    }

    if (orders.every((room) => room.payment_status === 'completed')) {
      return { Icon: FcApproval, message: '결제가 완료되었습니다.' };
    }

    return { Icon: FcQuestions, message: '정보를 확인할 수 없습니다.' };
  };

  const { Icon, message } = getOrderStatus();

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Icon size={50} />

      <h1 className="text-4xl font-semibold tracking-tight">{message}</h1>

      {orders.map((item, index) => (
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
