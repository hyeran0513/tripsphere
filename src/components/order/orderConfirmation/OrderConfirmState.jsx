import { useEffect, useState } from 'react';
import { FcApproval, FcCancel, FcClock, FcQuestions } from 'react-icons/fc';
// import { useOrderDataID } from '../../../hooks/useOrderData';
import { orderQuery } from '../../../services/orderService';
import Loading from '../../common/Loading';
// import OrderList from '../OrderList';

// 주문 정보 아이디만 입력받음
const OrderState = ({ orderInfo }) => {
  let State;
  let message;

  console.log('OrderState Order : ', orderInfo);

  const [orderResult, setOrderResult] = useState(null);

  // const { data, isLoading, error } = useOrderDataID(orderInfo[0]);

  // 주문 아이디로 주문 결과를 DB 조회 결과 저장
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      console.log('in fetchOrder async');
      try {
        console.log('in fetchOrder async try');
        if (!orderInfo || orderInfo.length === 0) {
          console.log('전달받은 매개변수 orderInfo 길이가 없거나, 아예 없음');
          return;
        }
        const tmp = await orderQuery(orderInfo);
        console.log('OrderState data : ', tmp);
        setData(tmp);
      } catch (error) {
        console.error('Error fetching order:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    console.log('fetchOrder() before');
    fetchOrder();
    console.log('fetchOrder() after');
  }, [orderInfo]);

  useEffect(() => {}, [isLoading, error]);

  useEffect(() => {
    console.log('data is changed');
    console.log('data : ', data);
  }, [data]);

  const orderStatusCheck = ({ array, status }) => {
    console.log('array : ', array);
    if (array === null) {
      console.log('array 정보가 없음 : ', array);
      return { flag: null, everySame: null };
    }
    let equals = 0;
    // status와 같은 정보가 있는지 확인
    let flag = false;

    for (let ele in array) {
      if (ele.payment_status === status) {
        flag = true;
        equals++;
      }
    }
    // 항목의 모든 요소의 결제 상태가 status와 동일함
    let everySame = equals === array.length ? true : false;
    return { flag, everySame };
  };

  // const hasPending = data.some((order) => order.payment_status === 'pending');
  // const hasCanceled = orderInfo.some((order) => order.payment_status === 'canceled');
  // const allCompleted = data.every((order) => order.payment_status === 'completed');

  const hasPending = false;
  const { flag: canceledFlag, everySame: allCanceled } = orderStatusCheck({
    array: data,
    status: 'canceled',
  });
  const hasCanceled = canceledFlag ? true : false;
  const { flag: completedFlag, everySame: isAllCompleted } = orderStatusCheck({
    array: data,
    status: 'completed',
  });
  const allCompleted = completedFlag ? (isAllCompleted ? true : false) : false;

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

      {/* {data ? <OrderList orderList={data} /> : ''} */}
    </div>
  );
};

export default OrderState;
