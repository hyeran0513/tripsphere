import { useEffect, useState } from 'react';
import { fetchUserData } from '../../../services/userService';
import useAuthStore from '../../../stores/useAuthStore';

const OrderSummary = ({ orderInfo }) => {
  const [price, setPrice] = useState(0);
  const [commision, setCommision] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const { user } = useAuthStore();

  const { email, uid, token } = user;

  useEffect(() => {
    let sum = 0;
    orderInfo.map((ele) => {
      sum += parseInt(ele.totalPrice);
    });
    setPrice(sum);
    setCommision(Math.ceil(sum / 10));

    console.log('userInfo : ', JSON.stringify(userInfo));
    console.log(JSON.stringify(setUserInfo(fetchUserData(uid))));
    console.log(userDataWait(uid));
  }, []);

  const userDataWait = async (a) => {
    return await fetchUserData(uid);
  };

  return (
    <div className="dark:font-bold">
      <h2 className="card-title mb-2">최종 결제 금액</h2>

      <div className="flex justify-between py-2">
        <p>주문 금액</p>
        <p className="flex justify-end">{price}원</p>
      </div>

      <div className="flex justify-between py-2">
        <p>수수료</p>
        <p className="flex justify-end">{commision}원</p>
      </div>

      <div className="border-t border-gray-200">
        <div className="flex justify-between py-4">
          <p>주문 총액</p>
          <p className="flex justify-end">{price + commision}원</p>
        </div>

        <div className="flex justify-between py-4 text-red-600 dark:text-red-400">
          <p>사용 포인트</p>
          <p className="flex justify-end">{price + commision}원</p>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="flex justify-between py-4">
          <p>결제 후 잔여 포인트</p>
          <p className="flex justify-end">{price + commision}원</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
