const OrderSummary = (
  //[orderInfo]
  orderInfo,
) => {
  let price = 0;
  console.log(orderInfo);
  // const sum = orderInfo.map((ele) => price + parseInt(ele.final_price));
  const sum = orderInfo.final_price;
  const commision = Math.ceil(sum / 10);

  return (
    <div className="dark:font-bold">
      <h2 className="card-title mb-2">최종 결제 금액</h2>

      <div className="flex justify-between py-2">
        <p>주문 금액</p>
        {/* <p className="flex justify-end">100000 원</p> */}
        <p className="flex justify-end">{sum} 원</p>
      </div>

      <div className="flex justify-between py-2">
        <p>수수료</p>
        <p className="flex justify-end">{commision}원</p>
      </div>

      <div className="border-t border-gray-200">
        <div className="flex justify-between py-4">
          <p>주문 총액</p>
          <p className="flex justify-end">{sum + commision}원</p>
        </div>

        <div className="flex justify-between py-4 text-red-600 dark:text-red-400">
          <p>사용 포인트</p>
          <p className="flex justify-end">{sum + commision}원</p>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="flex justify-between py-4">
          <p>잔여 포인트</p>
          <p className="flex justify-end">{sum + commision}원</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
