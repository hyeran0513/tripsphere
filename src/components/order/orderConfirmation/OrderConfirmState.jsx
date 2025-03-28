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
  const [orderIds, setOrderIds] = useState([]);
  const [data, setData] = useState(null);
  console.log('전달받은 주문정보 OrderConfirmState -OrderState: ', orderInfo);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        console.log('orderInfo : ', orderInfo);
        console.log('orderInfo type :', typeof orderInfo);

        const tmp = [];
        orderInfo.map((ele) => tmp.push(ele.orderId));

        console.log('tmp :', tmp);
        console.log('tmp type :', typeof tmp);
        setOrderIds(tmp);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [orderInfo]);

  useEffect(() => {
    const start = async () => {
      const test = await orderQuery(orderIds);
      setData(test);
    };
    start();
  }, [orderIds]);
  // const { data, isLoading, error } = useOrderDataGetByOrderID([...orderIds]);

  useEffect(() => {}, [orderIds]);
  // useEffect(() => {}, [isLoading, error]);

  useEffect(() => {}, [data]);

  // const hasPending = data.some((order) => order.payment_status === 'pending');
  // const hasCanceled = orderInfo.some((order) => order.payment_status === 'canceled');
  // const allCompleted = data.every((order) => order.payment_status === 'completed');

  if (!data || data === null) return <Loading />;

  if (data?.length === 0) return <Loading />;
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

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <State size={50} />

      <h1 className="text-4xl font-semibold tracking-tight">{message}</h1>

      {/* {isLoading && <Loading />} */}
      {/* {error && <>{error.message}</>} */}
      {orderInfo ? <OrderList orderInfo={data} /> : '주문정보 없음'}
    </div>
  );
};

export default OrderState;
