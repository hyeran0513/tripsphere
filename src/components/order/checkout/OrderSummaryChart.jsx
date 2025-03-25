const OrderSummaryChart = (reservationData) => {
  let isValid = true;
  reservationData.map((ele) => {
    const { data } = useAccomData(ele.accommodationId);
    if (data === undefined) isValid = false;
  });

  // 상품페이지 -> 결제정보 -> 뒤로가기 -> 앞으로가기
  // 히스토리만 추적하다, 전달정보가 없는경우
  if (data === undefined)
    return <NoData text={'주문하기/예약하기 버튼을 클릭해주세요'} />;

  return (
    <form className="card-body">
      <OrderSummary orderInfo={reservationData} />

      <div className="card-actions justify-end">
        <button
          type="button"
          onClick={() => navigate('/orderconfirmation')}
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
          결제하기
        </button>
      </div>
    </form>
  );
};

export default OrderSummaryChart;
