import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccomData } from '../../../hooks/useProductData';
import { createUserOrder } from '../../../services/orderService';
import { usedPoints } from '../../../services/pointService';
import { fetchUserData } from '../../../services/userService';
import useAuthStore from '../../../stores/useAuthStore';
import Loading from '../../common/Loading';
import NoData from '../../common/NoData';
import OrderSummary from './OrderSummary';

const OrderSummaryChart = ({ reservationData }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [commissionPercentage, setCommissionPercentage] = useState(10);
  const [payPoint, setPayPoint] = useState(0);
  const { user } = useAuthStore();

  let isValid = true;

  const payment = (event) => {
    event.preventDefault();
    console.log('payPoint : ', payPoint);
    // 1. DB에서 불러온 유저의 포인트와 상품목록의 금액 합산을 비교
    if (user.points < payPoint) {
    } else {
      createUserOrder({
        userId: user.uid,
        usedPoints: payPoint,
      });
      usedPoints({ userId: user.uid, points: payPoint });
    }
    // 2-1. 비교결과 유저의 포인트가 적다면
    // 유저의 포인트는 처리하지 않고,
    // 결제 내역 (컬랙션 order)에 주문 취소 or 주문 실패로 남긴다

    // 2-2. 비교결과 상품 합계가 적다면
    // 유저의 포인트 감소시킨 쿼리 결과 반영후
    // 결제 내역 (컬랙션 order)을 생성한다.

    navigate('/orderconfirmation');
  };

  reservationData.map((ele) => {
    const { data } = useAccomData(ele.accommodationId);
    if (data === undefined) isValid = false;
  });

  useEffect(() => {
    console.log(user.uid);

    const userDataWait = async (uid) => {
      const data = await fetchUserData(uid);
      console.log(data);
      setUserInfo(data);
    };
    userDataWait(user.uid);
  }, []);

  // return 의 렌더링이 2번째. useEffect 렌더링이 3번째
  if (userInfo === null) return <Loading />;

  // 상품페이지 -> 결제정보 -> 뒤로가기 -> 앞으로가기
  // 브라우저가 히스토리를 추적해서 이동하여 전달정보가 없는경우
  if (isValid === false)
    return <NoData text={'주문하기/예약하기 버튼을 이용해주세요'} />;

  return (
    <aside className="card-body">
      <OrderSummary
        orderInfo={reservationData}
        commissionPercent={commissionPercentage}
        userPoint={userInfo.points}
        setPayPoint={setPayPoint}
      />

      <div className="card-actions justify-end">
        <button
          type="button"
          onClick={(e) => payment(e)}
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
          결제하기
        </button>
      </div>
    </aside>
  );
};

export default OrderSummaryChart;
