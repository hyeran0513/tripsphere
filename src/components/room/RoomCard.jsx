import React, { useState } from 'react';
import {
  convertTimestampToDate,
  formatNumber,
  formatTimeStampTime,
  getTimeDiff,
} from '../../utils/format';
import { useNavigate } from 'react-router-dom';
import { IoBedOutline } from 'react-icons/io5';
import { BiChevronRight } from 'react-icons/bi';
import Modal from '../common/Modal';
import CartButton from '../detail/reservation/CartButton';
import ToastMessage from '../common/ToastMessage';
import { BiCart } from 'react-icons/bi';
import { serverTimestamp } from 'firebase/firestore';
import { useAddCarts } from '../../hooks/useCartData';
import useAuthStore from '../../stores/useAuthStore';
import useRoomSelectionStore from '../../stores/useRoomSelectionStore';
import ServiceList from '../common/ServiceList';

const RoomCard = ({ room, index }) => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [selectedRange, setSelectedRange] = useState([]);
  const [selectedRoomData, setSelectedRoomData] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const { user } = useAuthStore();
  const { setReservationInfo } = useRoomSelectionStore();

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  // firebase에 장바구니 추가
  const { mutate } = useAddCarts(user?.uid, showToast);

  // 장바구니 추가
  const handleAddToCart = (type, duration, selectedTime) => {
    mutate({
      user_id: user?.uid,
      room_id: selectedRoomData.roomId,
      created_at: serverTimestamp(),
      type,
      duration,
      selectedTime,
    });

    document.getElementById('dayUse').close();
  };

  // 11:00 - 19:00 생성
  const items = Array.from({ length: 17 }, (_, index) => {
    const hour = 11 + Math.floor(index / 2);
    const minute = index % 2 === 0 ? '00' : '30';
    const label = `${hour.toString().padStart(2, '0')}:${minute}`;
    const id = `radio-${hour.toString().padStart(2, '0')}${minute}`;
    return { id, label };
  });

  // hh:mm 분으로 변환
  const timeLabelToMinutes = (label) => {
    const [h, m] = label.split(':');
    return parseInt(h) * 60 + parseInt(m);
  };

  // 타임 선택 시 실행
  const handleChange = (startLabel) => {
    const startIndex = items.findIndex((item) => item.label === startLabel);
    const startMinutes = timeLabelToMinutes(items[startIndex].label);
    const durationMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + durationMinutes;

    const newSelectedRange = items
      .filter((item) => {
        const time = timeLabelToMinutes(item.label);
        return time >= startMinutes && time <= endMinutes;
      })
      .map((item) => item.label);

    setSelectedRange(newSelectedRange);
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

  // 대실 시간 구하기
  const { hours, minutes } = getTimeDiff(
    selectedRoomData?.check_in,
    selectedRoomData?.check_out,
  );

  return (
    <>
      <div
        key={index}
        className={`p-6 ${index > 0 && 'border-t border-gray-200'}`}>
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-gray-700 dark:text-white">
            {room.stay_type === 'stay' ? '숙박' : '대실'}
          </h4>

          {/* 객실 상세 정보 보기 */}
          <button
            className="flex items-center text-xs font-semibold cursor-pointer"
            onClick={() =>
              document.getElementById(`room${index}_${room.roomId}`).showModal()
            }>
            상세보기 <BiChevronRight className="text-lg" />
          </button>

          {/* 객실 상세 정보 */}
          <Modal
            buttonTitle={room.name}
            modalId={`room${index}_${room.roomId}`}
            title={room.name}
            hideButton={true}>
            <div className="py-4">{room.description}</div>
            <ServiceList services={room.services} />
          </Modal>
        </div>

        {/* 체크인 체크아웃 */}
        <p className="mt-1 text-xs text-gray-500 dark:text-white">
          체크인: {formatTimeStampTime(room.check_in)} ~ 체크아웃:{' '}
          {formatTimeStampTime(room.check_out)}
        </p>

        <div className="mt-4 flex flex-col items-end">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {room.discount_rate * 100}%
            </span>
            <span className="line-through text-sm text-gray-300 dark:text-white">
              {formatNumber(room.original_price)}원
            </span>
          </div>

          <div className="font-semibold text-lg text-gray-90 dark:text-white0">
            {formatNumber(room.original_price * (1 - room.discount_rate))}원
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          {/* 남은 객실 개수 */}
          <p className="flex items-center gap-1 text-sm font-semibold text-red-400">
            <IoBedOutline /> 남은 객실 {room.stock}개
          </p>

          <div className="flex items-center gap-2">
            {/* 숙박 예약일 경우 */}
            {room.stay_type === 'stay' && (
              <>
                <CartButton
                  productId={room.roomId}
                  showToast={showToast}
                  checkIn={convertTimestampToDate(room.check_in)}
                  checkOut={convertTimestampToDate(room.check_out)}
                  adultCount={room.capacity.adults}
                  childrenCount={room.capacity.children}
                  totalPrice={room.original_price * (1 - room.discount_rate)}
                />

                <button
                  type="button"
                  onClick={() => {
                    setReservationInfo([
                      {
                        type: 'stay',
                        room_id: room.roomId,
                      },
                    ]);
                    navigate('/checkout');
                  }}
                  className="h-[38px] text-indigo-600 hover:text-white border border-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 dark:focus:ring-indigo-800 cursor-pointer">
                  숙박 예약
                </button>
              </>
            )}

            {/* 대실 예약일 경우 */}
            {room.stay_type === 'day_use' && (
              <>
                <button
                  type="button"
                  onClick={() => handleDayUse(room, 'cart')}
                  className="flex items-center justify-center w-[38px] h-[38px] text-gray-600 hover:text-white border border-gray-600 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm text-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-500 dark:focus:ring-gray-800 cursor-pointer">
                  <BiCart className="text-lg" />
                </button>

                <button
                  type="button"
                  className="h-[38px] text-indigo-600 hover:text-white border border-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 dark:focus:ring-indigo-800 cursor-pointer"
                  onClick={() => handleDayUse(room)}>
                  대실 예약
                </button>

                <Modal
                  hideButton={true}
                  modalId="dayUse"
                  title="대실시간 선택">
                  <span className="block mb-4">
                    대실: {`${hours}시간 ${minutes}분`}
                  </span>

                  <ul className="mb-8 grid grid-cols-6 w-full gap-2">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className={`flex items-center justify-center text-center rounded-lg border border-gray-300 ${
                          selectedRange.includes(item.label)
                            ? 'bg-indigo-100 border-indigo-600 text-indigo-600 font-semibold dark:bg-base-200'
                            : ''
                        }`}
                        onClick={() => handleChange(item.label)}>
                        <div className="flex items-center w-full">
                          <input
                            id={item.id}
                            type="radio"
                            value={item.label}
                            name="list-radio"
                            className="hidden"
                            checked={selectedRange.includes(item.label)}
                            onChange={() => {}}
                          />
                          <label
                            htmlFor={item.id}
                            className="w-full py-3 text-sm font-medium dark:text-gray-300 cursor-pointer">
                            {item.label}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {selectedType === 'cart' ? (
                    <button
                      aria-label="장바구니"
                      type="button"
                      onClick={() =>
                        handleAddToCart(
                          'day_use',
                          { hours, minutes },
                          selectedRange,
                        )
                      }
                      className="w-full cursor-pointer flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-3.5 py-3.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      장바구니
                    </button>
                  ) : (
                    <button
                      aria-label="예약하기"
                      type="button"
                      onClick={() => {
                        setReservationInfo([
                          {
                            type: 'day_use',
                            room_id: selectedRoomData.roomId,
                            duration: { hours, minutes },
                            selectedTime: selectedRange,
                          },
                        ]);
                        navigate('/checkout');
                      }}
                      className="w-full cursor-pointer flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-3.5 py-3.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      예약하기
                    </button>
                  )}
                </Modal>
              </>
            )}
          </div>
        </div>
      </div>

      {toast && (
        <ToastMessage
          toast={toast}
          setToast={setToast}
        />
      )}
    </>
  );
};

export default RoomCard;
