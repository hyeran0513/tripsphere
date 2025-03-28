import { useEffect, useState } from 'react';
import { useRoomData } from '../../hooks/useProductData';
import useRoomSelectionStore from '../../stores/useRoomSelectionStore';
import ToggleOrderList from '../../components/order/checkout/ToggleOrderList';
import ToggleJson from '../../components/common/ToggleJson';
import Loading from '../../components/common/Loading';
import OrderPriceForm from '../../components/order/checkout/OrderPriceForm';

const Checkout = () => {
  const { reservationInfo } = useRoomSelectionStore();
  const [saveRoomId, setSaveRoomId] = useState(null);
  const { data, isLoading, error } = useRoomData(saveRoomId);

  useEffect(() => {
    if (reservationInfo) {
      const newRoomIds = reservationInfo.map((info) => {
        return info.room_id;
      });

      setSaveRoomId(newRoomIds);
    }
  }, [reservationInfo]);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-[1200px] mx-auto px-[20px] py-[40px] dark:text-gray-200">
      <ToggleJson>
        <p className="text-lg font-semibold">store에 저장된 값</p>
        {reservationInfo && (
          <pre className="text-sm">
            {JSON.stringify(reservationInfo, null, 2)}
          </pre>
        )}{' '}
        <br />
        <p className="text-lg font-semibold">
          store의 roomId를 이용해서 가져온 숙소 및 객실 값
        </p>
        {data && <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>}
      </ToggleJson>

      <div className="flex space-y-6 gap-10 py-[30px] max-lg:flex-col max-lg:items-center">
        {/* 주문 결제 정보 */}
        <div className="flex-10/12 max-lg:w-full">
          <div className="mb-5 px-4 sm:px-0">
            <h3 className="text-base/7 font-semibold">주문 결제</h3>
            <p className="mt-1 max-w-2xl text-sm/6 text-gray-500 dark:text-gray-400">
              결제 정보를 확인해 주세요.
            </p>
          </div>

          <div className="flex gap-10">
            {/* 주문 목록 */}
            <ToggleOrderList data={data} />

            {/* 최종 결제 금액 */}
            <OrderPriceForm data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
