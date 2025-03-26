import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccomData } from '../../../hooks/useProductData';
import { fetchUserData } from '../../../services/userService';
import useAuthStore from '../../../stores/useAuthStore';
import NoData from '../../common/NoData';
import OrderSummary from './OrderSummary';

const OrderSummaryChart = ({ reservationData }) => {
  const navigate = useNavigate();
  console.log(JSON.stringify(reservationData));
  const [userInfo, setUserInfo] = useState(null);
  const { user } = useAuthStore();

  console.log('user : ', JSON.stringify(user));

  const { uid } = user;
  console.log('uid : ', uid);

  let isValid = true;

  reservationData.map((ele) => {
    const { data } = useAccomData(ele.accommodationId);
    if (data === undefined) isValid = false;
  });

  useEffect(() => {
    const userDataWait = async (a) => {
      const data = await fetchUserData(uid);
      // console.log('fetchUserData : ', JSON.stringify(data));
      setUserInfo(data);
    };
    userDataWait();

    // console.log(userInfo);

    console.log('uid : ', uid);
  }, []);

  // 상품페이지 -> 결제정보 -> 뒤로가기 -> 앞으로가기
  // 브라우저가 히스토리를 추적해서 이동하여 전달정보가 없는경우
  if (isValid === false)
    return <NoData text={'주문하기/예약하기 버튼을 이용해주세요'} />;

  return (
    <aside className="card-body">
      <OrderSummary
        orderInfo={reservationData}
        userPoint={userInfo.points}
      />

      <div className="card-actions justify-end">
        <button
          type="button"
          onClick={() => navigate('/orderconfirmation')}
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
          결제하기
        </button>
      </div>
    </aside>
  );
};

export default OrderSummaryChart;
