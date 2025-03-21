import { FcApproval, FcCancel, FcClock, FcQuestions } from 'react-icons/fc';
import OrderList from '../OrderList';

const OrderState = ({ orderInfo }) => {
  let State;
  let message;

  const hasPending = orderInfo.some(
    (order) => order.payment_status === 'pending',
  );
  const hasCanceled = orderInfo.some(
    (order) => order.payment_status === 'canceled',
  );
  const allCompleted = orderInfo.every(
    (order) => order.payment_status === 'completed',
  );

  if (hasPending) {
    State = FcClock;
    message = '결제 대기중입니다.';
  } else if (hasCanceled) {
    State = FcCancel;
    message = '결제가 취소 되었습니다.';
  } else if (allCompleted) {
    State = FcApproval;
    message = '결제가 완료되었습니다.';
  } else {
    State = FcQuestions;
    message = '정보를 확인할 수 없습니다.';
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <State size={50} />

      <h1 className="text-4xl font-semibold tracking-tight">{message}</h1>

      <OrderList orderInfo={orderInfo} />
    </div>
  );
};

export default OrderState;
