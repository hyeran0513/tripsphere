import { useEffect, useState } from 'react';
import Loading from '../../components/common/Loading';
import OrderPriceForm from '../../components/order/checkout/OrderPriceForm';
import ToggleOrderList from '../../components/order/checkout/ToggleOrderList';
import { useRoomData } from '../../hooks/useProductData';
import useCheckoutStore from '../../stores/useCheckoutStore';
import useRoomSelectionStore from '../../stores/useRoomSelectionStore';

const Checkout = () => {
  const { reservationInfo, clearReservationInfo } = useRoomSelectionStore();
  const [rooms, setRooms] = useState(null);
  const { data, isLoading, error } = useRoomData(rooms);
  const { roomIds, setRoomIds } = useCheckoutStore();

  useEffect(() => {
    console.log('reservationInfo : ', reservationInfo);
    let newRoomIds;
    // ???
    // 기존소스코드에서 이어쓰고 테스트하다 오류나서
    // 전부 다시 확인해보는데
    // 예약정보인 reservationInfo에서 예약정보를 통채로 넘겨야하는데
    // 객실 아이디만 추려서 사용함.
    // 훅에서 가져오는 정보가 객실 정보를 가져오고있었네
    // 심지어 useEffect 로 rooms가 변경됐을때를 따로 감지 안해서
    // useRoomData가 제대로 동작하지도 않았을듯
    if (!reservationInfo || reservationInfo?.length === 0) {
      console.log('수신한 데이터 없음');
      if (roomIds) {
        console.log('저장된 데이터 있음 : ', roomIds);
        newRoomIds = roomIds;
      } else {
        console.log('수신한 데이터, 저장된 데이터도 암것도 없음 ');
        return;
      }
    } else {
      console.log('수신한 데이터 있음. 수신 데이터 저장');
      newRoomIds = reservationInfo.map((info) => {
        console.log('info : ', info);
        return info.room_id;
      });
      setRoomIds(newRoomIds);
    }

    console.log('newRoomIds : ', newRoomIds);
    // 다른 컴포넌트로 데이터 전달시 사용
    // 새로고침시 사용
    setRooms(newRoomIds);
    setRoomIds(newRoomIds);
  }, [reservationInfo]);

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
            <ToggleOrderList data={data} />

            {/* 최종 결제 금액 */}
            <OrderPriceForm
              data={data}
              reservationInfo={roomIds}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
