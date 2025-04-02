import { useEffect, useState } from 'react';
import Loading from '../../components/Molecules/Loading';
import OrderPriceForm from '../../components/Organisms/OrderPriceForm';
import ToggleOrderList from '../../components/Organisms/ToggleOrderList';
import { useRoomData } from '../../hooks/useProductData';
import useCheckoutStore from '../../stores/useCheckoutStore';
import useRoomSelectionStore from '../../stores/useRoomSelectionStore';

const Checkout = () => {
  const { reservationInfo } = useRoomSelectionStore();
  const [rooms, setRooms] = useState(null);
  const { data, isLoading, error } = useRoomData(rooms);
  const {
    roomIds,
    setRoomIds,
    reservationInfo: savedReserveInfo,
    setReservationInfo: setSavedReserveInfo,
  } = useCheckoutStore();

  useEffect(() => {
    if (reservationInfo?.length > 0) {
      const newRoomIds = reservationInfo.map((info) => info.room_id);
      setSavedReserveInfo(reservationInfo);
      if (JSON.stringify(newRoomIds) !== JSON.stringify(roomIds)) {
        setRoomIds(newRoomIds);
      }
      setRooms(newRoomIds);
    } else if (roomIds?.length > 0) {
      setRooms(roomIds);
    }
  }, [reservationInfo]);

  useEffect(() => {}, [rooms]);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-[1200px] mx-auto px-[20px] py-[40px] dark:text-gray-200">
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
            <ToggleOrderList
              data={data}
              reservationInfo={
                reservationInfo ? reservationInfo : savedReserveInfo
              }
            />

            {/* 최종 결제 금액 */}
            <OrderPriceForm
              data={data}
              roomIds={roomIds}
              reservationInfo={
                reservationInfo ? reservationInfo : savedReserveInfo
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
