import { useEffect, useState } from 'react';

const OrderSummary = ({ orderInfo, commissionPercent, userPoint }) => {
  const [price, setPrice] = useState(0);
  const [commission, setCommission] = useState(0);

  useEffect(() => {
    let sum = 0;
    orderInfo.map((ele) => {
      sum += parseInt(ele.totalPrice);
    });
    setPrice(sum);
    setCommission(Math.ceil((sum * commissionPercent) / 100));
  }, []);

  return (
    <div className="dark:font-bold">
      <h2 className="card-title mb-2">최종 결제 금액</h2>

      <div className="flex justify-between py-2">
        <p>주문 금액</p>
        <p className="flex justify-end">{price}원</p>
      </div>
      {/* 일반적으로 수수료 금액을 표현하는게 아니라 각 상품의 정보들을 표시해주는데
  여기는 수수료가 아니라 상품 항목별 정보가 들어가는게 맞지않나 싶지만
  DB 설계에 커미션 내용이 있으니 커미션이 맞는듯.  */}
      <div className="flex justify-between py-2">
        <p>수수료</p>
        <p className="flex justify-end">{commission}원</p>
      </div>

      <div className="border-t border-gray-200">
        <div className="flex justify-between py-4">
          <p>주문 총액</p>
          <p className="flex justify-end">{price + commission}원</p>
        </div>

        <div className="flex justify-between py-4 text-red-600 dark:text-red-400">
          <p>사용 포인트</p>
          <p className="flex justify-end">{price + commission}원</p>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="flex justify-between py-4">
          <p>결제 후 잔여 포인트</p>
          <p className="flex justify-end">{userPoint - price + commission}원</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
