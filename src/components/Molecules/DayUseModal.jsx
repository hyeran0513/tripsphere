import Modal from './Modal';
import { getTimeDiff, timeToMinutes } from '../../utils/format';
import useAuthStore from '../../stores/useAuthStore';
import { useAddCarts } from '../../hooks/useCartData';
import { serverTimestamp } from 'firebase/firestore';
import useRoomSelectionStore from '../../stores/useRoomSelectionStore';
import { useNavigate } from 'react-router-dom';

const DayUseModal = ({
  showToast,
  selectedRoomData,
  selectedType,
  selectedRange,
  setSelectedRange,
}) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { mutate } = useAddCarts(user?.uid, showToast);
  const { setReservationInfo } = useRoomSelectionStore();

  // 대실 시간 구하기
  const { hours = 0, minutes = 0 } = getTimeDiff(
    selectedRoomData?.check_in,
    selectedRoomData?.check_out,
  );

  // 11:00 - 19:00 생성
  const items = Array.from({ length: 17 }, (_, index) => {
    const hour = 11 + Math.floor(index / 2);
    const minute = index % 2 === 0 ? '00' : '30';
    const label = `${hour.toString().padStart(2, '0')}:${minute}`;
    const id = `radio-${hour.toString().padStart(2, '0')}${minute}`;
    return { id, label };
  });

  // 타임 선택 시 실행
  const handleChange = (startLabel) => {
    const startIndex = items.findIndex((item) => item.label === startLabel);
    const startMinutes = timeToMinutes(items[startIndex].label);
    const durationMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + durationMinutes;

    const newSelectedRange = items
      .filter((item) => {
        const time = timeToMinutes(item.label);
        return time >= startMinutes && time <= endMinutes;
      })
      .map((item) => item.label);

    setSelectedRange(newSelectedRange);
  };

  // 장바구니 추가
  const handleAddToCart = (type, duration, selectedTime) => {
    if (!isAuthenticated) {
      showToast('error', '로그인 후 장바구니 기능을 이용하실 수 있습니다.');
      document.getElementById('dayUse').close();
      return;
    }

    mutate({
      user_id: user?.uid,
      room_id: selectedRoomData?.roomId || selectedRoomData?.id,
      created_at: serverTimestamp(),
      type,
      duration,
      selectedTime,
    });

    document.getElementById('dayUse').close();
  };

  // 대실 예약하기
  const handleReservationDayUse = () => {
    if (!isAuthenticated) {
      showToast('error', '로그인 후 예약을 진행하실 수 있습니다');
      document.getElementById('dayUse').close();
      return;
    }

    setReservationInfo([
      {
        type: 'day_use',
        room_id: selectedRoomData?.roomId || selectedRoomData?.id,
        duration: { hours, minutes },
        selectedTime: selectedRange,
      },
    ]);
    navigate('/checkout');
  };

  return (
    <Modal
      hideButton={true}
      modalId="dayUse"
      title="대실시간 선택">
      <span className="block mb-4">대실: {`${hours}시간 ${minutes}분`}</span>

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
        // 장바구니 버튼
        <button
          aria-label="장바구니"
          type="button"
          onClick={() =>
            handleAddToCart('day_use', { hours, minutes }, selectedRange)
          }
          className="cursor-pointer w-full flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-3.5 py-3.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          장바구니
        </button>
      ) : (
        // 예약하기
        <button
          aria-label="예약하기"
          type="button"
          onClick={handleReservationDayUse}
          className="cursor-pointer w-full flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-3.5 py-3.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          예약하기
        </button>
      )}
    </Modal>
  );
};

export default DayUseModal;
