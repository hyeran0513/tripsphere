import { useEffect, useState } from 'react';
import { FcApproval, FcCancel, FcClock, FcQuestions } from 'react-icons/fc';
// import { useOrderDataID } from '../../../hooks/useOrderData';
import { orderQuery } from '../../../services/orderService';
import Loading from '../../common/Loading';
import OrderList from '../OrderList';
// import OrderList from '../OrderList';

// 주문 정보 아이디만 입력받음
const OrderState = ({ orderInfo }) => {
  let State;
  let message;

  const [orderResult, setOrderResult] = useState(null);

  console.log('전달받은 주문정보 OrderConfirmState -OrderState: ', orderInfo);
  // const { data, isLoading, error } = useOrderDataID(orderInfo[0]);

  // 주문 아이디로 주문 결과를 DB 조회 결과 저장
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      try {
        if (!orderInfo || orderInfo.length === 0) {
          console.log('전달받은 주문정보 없음 : ', orderInfo);
          return;
        }
        const tmp = await orderQuery(orderInfo.orderId);
        setData(tmp);
      } catch (error) {
        console.error('Error fetching order:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderInfo]);

  useEffect(() => {}, [isLoading, error]);

  useEffect(() => {}, [data]);

  // const hasPending = data.some((order) => order.payment_status === 'pending');
  // const hasCanceled = orderInfo.some((order) => order.payment_status === 'canceled');
  // const allCompleted = data.every((order) => order.payment_status === 'completed');

  const hasPending = false;
  const hasCanceled = data?.some((ele) => ele.payment_status == 'canceled');
  const allCompleted = data?.every((ele) => ele.payment_status == 'completed');

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
  if (isLoading) return <Loading />;
  if (!data) return <Loading />;
  else if (error) return <>{error.message}</>;

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <State size={50} />

      <h1 className="text-4xl font-semibold tracking-tight">{message}</h1>

      {orderInfo ? (
        <OrderList
          orderDetailInfo={data}
          orderList={orderInfo}
        />
      ) : (
        '주문정보 없음'
      )}
    </div>
  );
};

export default OrderState;
