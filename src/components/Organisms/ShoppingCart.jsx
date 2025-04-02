import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { BiX, BiTrash, BiUser, BiMap, BiBox } from 'react-icons/bi';
import { PiBabyLight } from 'react-icons/pi';
import { IoBedOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  formatDate,
  formatNumber,
  formatTimeStampTime,
} from '../../utils/format';
import { useCartItems, useDelCartItem } from '../../hooks/useCartData';
import RoomTypeMapping from '../Atoms/RoomTypeMapping';
import Loading from '../Molecules/Loading';
import useAuthStore from '../../stores/useAuthStore';
import useRoomSelectionStore from '../../stores/useRoomSelectionStore';
import NoData from '../Atoms/NoData';

const ShoppingCart = ({ open, setOpen }) => {
  const { user } = useAuthStore();
  const { data, isLoading } = useCartItems(user?.uid);
  const { mutate } = useDelCartItem();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const { setReservationInfo } = useRoomSelectionStore();
  const navigate = useNavigate();

  // 전체 선택에 따른 선택된 항목
  useEffect(() => {
    if (!data) return;
    setSelectAll(selectedItems.length === data.length && data.length > 0);
  }, [selectedItems, data]);

  // 전체 선택 토글
  const handleSelectAllChange = (checked) => {
    setSelectAll(checked);
    if (checked && data) {
      setSelectedItems(data.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  // 개별 항목 선택/해제 토글
  const toggleItemSelection = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id],
    );
  };

  // 선택된 항목들의 총 금액을 계산
  const calculateTotal = () => {
    if (!data) return 0;
    return data
      .filter((item) => selectedItems.includes(item.id))
      .reduce(
        (sum, item) =>
          sum + item.room.original_price * (1 - item.room.discount_rate),
        0,
      );
  };

  // 장바구니 항목 삭제
  const deleteItem = (e, cartId) => {
    e.preventDefault();
    mutate(cartId);
  };

  // 주문하기
  const handleOrder = () => {
    const selectedData = data
      .filter((item) => selectedItems.includes(item.id))
      .map((item) => {
        const {
          accommodation_id,
          check_in,
          check_out,
          capacity,
          original_price,
          discount_rate,
          stay_type,
        } = item.room;

        const { room_id } = item;

        return {
          accommodationId: accommodation_id,
          checkIn: check_in,
          checkOut: check_out,
          adultCount: capacity.adults,
          childrenCount: capacity.children,
          totalPrice: original_price * (1 - discount_rate),
          stayType: stay_type,
          duration: item.duration,
          room_id: room_id,
          selectedTime: item.selectedTime,
        };
      });

    setReservationInfo(selectedData);

    navigate('/checkout');
    setOpen(false);
  };

  if (isLoading) return <Loading />;

  return (
    <Dialog
      open={open}
      onClose={setOpen}
      className="relative z-101">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="fixed inset-0 flex items-center justify-center">
            <DialogPanel className="w-[70%] h-[90%] bg-white dark:bg-gray-900 shadow-xl rounded-lg">
              <div className="flex h-full flex-col text-gray-900 dark:text-white">
                {/* Header */}
                <div className="px-4 py-4 sm:px-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-semibold">
                      장바구니
                    </DialogTitle>
                    <button
                      onClick={() => setOpen(false)}
                      className="cursor-pointer text-gray-400 hover:text-gray-500">
                      <BiX className="size-6" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={(e) => handleSelectAllChange(e.target.checked)}
                      className="checkbox checkbox-primary mr-2"
                    />
                    <span className="text-sm">전체 선택</span>
                  </div>
                </div>

                {/* 장바구니 목록 */}
                <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
                  {data?.length > 0 ? (
                    <ul className="grid grid-cols-2 gap-6">
                      {data.map((item) => (
                        <li
                          key={item.id}
                          className="p-4 border border-gray-200 rounded-lg">
                          <div className="border-b border-gray-200 mb-4 pb-4">
                            <p className="font-semibold">{item?.accom?.name}</p>
                            <div className="mt-1 text-xs text-gray-500 flex items-center gap-1">
                              <BiMap />
                              {item?.accom?.location.place_name}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <h3 className="mb-4 flex items-center gap-2 font-semibold">
                              {item.room?.name}
                              <RoomTypeMapping type={item.room.type} />
                            </h3>
                            <button
                              type="button"
                              onClick={(e) => deleteItem(e, item?.id)}
                              className="cursor-pointer">
                              <BiTrash />
                            </button>
                          </div>

                          <div className="flex gap-4">
                            {/* 체크박스 */}
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(item.id)}
                              onChange={() => toggleItemSelection(item.id)}
                              className="checkbox checkbox-primary mb-3"
                            />

                            {/* 객실 이미지 */}
                            <div className="w-[130px] h-[100px] overflow-hidden border border-gray-400 rounded-lg">
                              <img
                                src={item.room?.images?.[0]}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* 객실 유형 및 기간 */}
                            <div className="flex-1">
                              <div className="flex gap-2 items-center text-xs text-gray-500">
                                <span className="font-semibold text-gray-900">
                                  {item.room.stay_type === 'stay'
                                    ? '숙박'
                                    : '대실'}
                                </span>
                                <span>/</span>
                                <span>
                                  {formatDate(item.room.check_in)} ~{' '}
                                  {formatDate(item.room.check_out)}
                                </span>
                              </div>

                              {/* 체크인 체크아웃 */}
                              <div className="my-1 flex items-center gap-2 text-xs text-gray-600">
                                {item.room.stay_type === 'day_use' ? (
                                  <>
                                    {item.duration?.hours}시간{' '}
                                    {item.duration?.minutes}분 /{' '}
                                    <span>체크인 {item.selectedTime?.[0]}</span>
                                    <span>
                                      체크아웃{' '}
                                      {
                                        item.selectedTime?.[
                                          item.selectedTime.length - 1
                                        ]
                                      }
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span>
                                      체크인{' '}
                                      {formatTimeStampTime(item.room.check_in)}
                                    </span>
                                    <span>
                                      체크아웃{' '}
                                      {formatTimeStampTime(item.room.check_out)}
                                    </span>
                                  </>
                                )}
                              </div>

                              {/* 인원 수 */}
                              <div className="flex items-center gap-2 text-xs text-gray-600">
                                <span className="flex items-center gap-1">
                                  <BiUser /> 성인{' '}
                                  {item.room.capacity.adults || 0}명
                                </span>
                                <span className="flex items-center gap-1">
                                  <PiBabyLight /> 미성년자{' '}
                                  {item.room.capacity.children || 0}명
                                </span>
                              </div>

                              {/* 가격 정보 */}
                              <div className="mt-4 flex flex-col items-end">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-gray-900">
                                    {item.room.discount_rate * 100}%
                                  </span>
                                  <span className="line-through text-sm text-gray-300">
                                    {formatNumber(item.room.original_price)}원
                                  </span>
                                </div>
                                <div className="font-semibold text-lg text-gray-900 dark:text-white">
                                  {formatNumber(
                                    item.room.original_price *
                                      (1 - item.room.discount_rate),
                                  )}
                                  원
                                </div>
                                <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-red-400">
                                  <IoBedOutline /> 남은 객실 {item.room.stock}개
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <NoData
                      text="장바구니에 상품이 없습니다."
                      icon={BiBox}
                    />
                  )}
                </div>

                {/* 주문 합계 금액 */}
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium">
                    <p>주문 합계 금액</p>
                    <p className="text-indigo-600 font-bold">
                      {formatNumber(calculateTotal())}원
                    </p>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={handleOrder}
                      disabled={selectedItems.length === 0}
                      className="cursor-pointer flex justify-center w-full rounded-md bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700 disabled:bg-gray-400">
                      주문하기
                    </button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ShoppingCart;
