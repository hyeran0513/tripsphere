import React, { useState } from 'react';
import {
  convertTimestampToDate,
  formatNumber,
  formatTimeStampTime,
} from '../../utils/format';
import { useNavigate } from 'react-router-dom';
import { IoBedOutline } from 'react-icons/io5';
import { BiChevronRight } from 'react-icons/bi';
import Modal from '../common/Modal';
import CartButton from '../detail/reservation/CartButton';
import ToastMessage from '../common/ToastMessage';

const RoomCard = ({ room, index }) => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  // 토스트 보여주기
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <>
      <div
        key={index}
        className={`p-6 ${index > 0 && 'border-t border-gray-200'}`}>
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-gray-700">
            {room.stay_type === 'stay' ? '숙박' : '대실'}
          </h4>

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
          </Modal>
        </div>

        <p className="mt-1 text-xs text-gray-500">
          체크인: {formatTimeStampTime(room.check_in)} ~ 체크아웃:{' '}
          {formatTimeStampTime(room.check_out)}
        </p>

        <div className="mt-4 flex flex-col items-end">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">
              {room.discount_rate * 100}%
            </span>
            <span className="line-through text-sm text-gray-300">
              {formatNumber(room.original_price)}원
            </span>
          </div>

          <div className="font-semibold text-lg text-gray-900">
            {formatNumber(30000)}원
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="flex items-center gap-1 text-sm font-semibold text-red-400">
            <IoBedOutline /> 남은 객실 {room.stock}개
          </p>

          <div className="flex items-center gap-2">
            {/* 장바구니 버튼 */}
            <CartButton
              productId={room.roomId}
              showToast={showToast}
              checkIn={convertTimestampToDate(room.check_in)}
              checkOut={convertTimestampToDate(room.check_out)}
              adultCount={room.capacity.adults}
              childrenCount={room.capacity.children}
              totalPrice={room.original_price * (1 - room.discount_rate)}
            />

            {/* 숙박 예약 / 대실 예약 버튼 */}
            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="h-[38px] text-indigo-600 hover:text-white border border-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-500 dark:focus:ring-indigo-800 cursor-pointer">
              {room.stay_type === 'stay' ? '숙박 예약' : '대실 예약'}
            </button>
          </div>
        </div>
      </div>

      {/* 토스트 메시지 */}
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
