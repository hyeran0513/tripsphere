import { useState } from 'react';
import RoomInfo from '../Molecules/RoomInfo';
import PriceInfo from '../Molecules/PriceInfo';
import RoomActions from '../Molecules/RoomActions';
import ToastMessage from '../Atoms/ToastMessage';

const RoomCard = ({ room, index }) => {
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <>
      <div
        key={index}
        className={`p-6 ${index > 0 && 'border-t border-gray-200'}`}>
        {/* 객실 정보 */}
        <RoomInfo
          room={room}
          index={index}
        />

        {/* 가격 정보 */}
        <PriceInfo room={room} />

        {/* 버튼 모음 */}
        <RoomActions
          room={room}
          showToast={showToast}
        />
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
