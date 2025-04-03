import { convertTimestampToDate } from '../../utils/format';
import { IoBedOutline } from 'react-icons/io5';
import CartAddButton from './CartAddButton';
import { BiCart } from 'react-icons/bi';
import DayUseModal from './DayUseModal';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useRoomSelectionStore from '../../stores/useRoomSelectionStore';
import useAuthStore from '../../stores/useAuthStore';

const RoomActions = ({ room, showToast }) => {
  const navigate = useNavigate();
  const [selectedRange, setSelectedRange] = useState([]);
  const [selectedRoomData, setSelectedRoomData] = useState(null);
  const { setReservationInfo } = useRoomSelectionStore();
  const { isAuthenticated } = useAuthStore();
  const [selectedType, setSelectedType] = useState(null);

  // 숙박 예약하기
  const handleReservationStay = (room) => {
    if (!isAuthenticated) {
      showToast('error', '로그인 후 예약을 진행하실 수 있습니다');
      return;
    }

    setReservationInfo([
      {
        type: 'stay',
        room_id: room?.roomId || room?.id,
      },
    ]);
    navigate('/checkout');
  };

  // 대실 예약 버튼 핸들러
  const handleDayUse = (roomData, type) => {
    if (type === 'cart') {
      setSelectedType('cart');
    } else {
      setSelectedType('');
    }
    document.getElementById('dayUse').showModal();
    setSelectedRoomData(roomData);
    setSelectedRange([]);
  };

  return (
    <div className="mt-6 flex items-center justify-between">
      {/* 남은 객실 */}
      <p className="flex items-center gap-1 text-sm font-semibold text-red-400">
        <IoBedOutline /> 남은 객실 {room.stock}개
      </p>

      <div className="flex items-center gap-2">
        {/* 숙박 예약 */}
        {room.stay_type === 'stay' && (
          <>
            {/* 장바구니 버튼 */}
            <CartAddButton
              productId={room.roomId || room.id}
              showToast={showToast}
              checkIn={convertTimestampToDate(room.check_in)}
              checkOut={convertTimestampToDate(room.check_out)}
              adultCount={room.capacity.adults}
              childrenCount={room.capacity.children}
              totalPrice={room.original_price * (1 - room.discount_rate)}
            />

            {/* 대실 예약 버튼 */}
            <button
              type="button"
              onClick={() => handleReservationStay(room)}
              className="h-[38px] text-indigo-600 hover:text-white border border-indigo-600 hover:bg-indigo-500 font-medium rounded-lg text-sm px-4 py-2 cursor-pointer">
              숙박 예약
            </button>
          </>
        )}

        {/* 대실 예약 */}
        {room.stay_type === 'day_use' && (
          <>
            {/* 장바구니 버튼 */}
            <button
              type="button"
              onClick={() => handleDayUse(room, 'cart')}
              className="cursor-pointer flex items-center justify-center w-[38px] h-[38px] text-gray-600 hover:text-white border border-gray-600 hover:bg-gray-500 rounded-lg">
              <BiCart className="text-lg" />
            </button>

            {/* 대실 예약 버튼 */}
            <button
              type="button"
              onClick={() => handleDayUse(room)}
              className="h-[38px] text-indigo-600 hover:text-white border border-indigo-600 hover:bg-indigo-500 font-medium rounded-lg text-sm px-4 py-2 cursor-pointer">
              대실 예약
            </button>
          </>
        )}
      </div>

      {/* 대실 예약 모달 */}
      <DayUseModal
        selectedType={selectedType}
        showToast={showToast}
        selectedRoomData={selectedRoomData}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
      />
    </div>
  );
};

export default RoomActions;
