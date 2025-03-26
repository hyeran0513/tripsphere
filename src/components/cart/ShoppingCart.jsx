import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { Link } from 'react-router-dom';
import { BiX, BiTrash, BiUser, BiMap } from 'react-icons/bi';
import {
  formatDate,
  formatNumber,
  formatTimeStampTime,
} from '../../utils/format';
import { useCartItems } from '../../hooks/useCartData';
import RoomTypeMapping from '../common/RoomTypeMapping';
import Loading from '../common/Loading';
import useAuthStore from '../../stores/useAuthStore';
import { PiBabyLight } from 'react-icons/pi';
import { IoBedOutline } from 'react-icons/io5';

const ShoppingCart = ({ open, setOpen }) => {
  const { user } = useAuthStore();
  const { data, isLoading } = useCartItems(user?.uid);

  if (isLoading) return <Loading />;

  return (
    <Dialog
      open={open}
      onClose={setOpen}
      className="relative z-101">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0 " />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="fixed inset-0 flex items-center justify-center">
            <DialogPanel className="w-[70%] h-[90%] bg-white dark:bg-gray-900 shadow-xl rounded-lg transform transition duration-500 ease-in-out">
              <div className="flex h-full flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xl">
                <div className="px-4 py-6 sm:px-6 overflow-y-scroll">
                  {/* Dialog 헤더 영역 */}
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium">
                      장바구니
                    </DialogTitle>
                    <button
                      onClick={() => setOpen(false)}
                      className="text-gray-400 hover:text-gray-500">
                      <BiX className="size-6" />
                    </button>
                  </div>

                  {/* 전체 선택 */}
                  <div className="my-4 flex items-center">
                    <input
                      type="checkbox"
                      // checked={selectAll}
                      // onChange={handleSelectAll}
                      className="checkbox checkbox-primary mr-2"
                    />
                    <span className="text-sm">전체 선택</span>
                  </div>

                  {/* 장바구니 목록 */}
                  <ul className="grid grid-cols-2">
                    {data?.map((item) => (
                      <li className="p-4 border border-gray-200 rounded-lg">
                        <div className="border-b border-gray-200 mb-4 pb-4">
                          <p className="font-semibold">{item?.accom?.name}</p>
                          <div className="mt-1 text-xs text-gray-500 flex items-center gap-1">
                            <BiMap />
                            {item?.accom?.location.place_name}
                          </div>
                        </div>

                        {/* 객실명 */}
                        <div className="flex items-center justify-between">
                          <h3 className="mb-4 flex items-center gap-2 font-semibold">
                            {item.room?.name}
                            <RoomTypeMapping type={item.room.type} />
                          </h3>

                          <button
                            type="button"
                            className="cursor-pointer">
                            <BiTrash />
                          </button>
                        </div>

                        <div className="flex gap-4">
                          {/* 체크박스 */}
                          <input
                            type="checkbox"
                            onChange={() => {}}
                            className="checkbox checkbox-primary mb-3"
                          />

                          {/* 이미지 영역 */}
                          <div className="w-[130px] h-[100px] overflow-hidden border border-gray-400 rounded-lg">
                            <img
                              src={item.room?.images?.[0]}
                              alt={item.room?.name}
                              className="w-[100%] h-[100%]"
                            />
                          </div>

                          {/* 객실 정보 */}
                          <div className="flex-1">
                            {/* 숙박 기간 */}
                            <div className="flex gap-2 items-center text-xs text-gray-500">
                              <span>
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
                              <span>
                                체크인 {formatTimeStampTime(item.room.check_in)}
                              </span>
                              <span>
                                체크아웃
                                {formatTimeStampTime(item.room.check_out)}
                              </span>
                            </div>

                            {/* 인원 수 */}
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <span className="flex items-center gap-1">
                                <BiUser /> 성인 {item.room.capacity.adults || 0}
                                명
                              </span>
                              <span className="flex items-center gap-1">
                                <PiBabyLight /> 미성년자{' '}
                                {item.room.capacity.children || 0}명
                              </span>
                            </div>

                            <div class="mt-4 flex flex-col items-end">
                              <div class="flex items-center gap-2">
                                <span class="text-sm font-semibold text-gray-900">
                                  {item.room.discount_rate * 100}%
                                </span>
                                <span class="line-through text-sm text-gray-300">
                                  {formatNumber(item.room.original_price)}원
                                </span>
                              </div>
                              <div class="font-semibold text-lg text-gray-900">
                                {formatNumber(
                                  item.room.original_price *
                                    (1 - item.room.discount_rate),
                                )}
                                원
                              </div>
                              <p className="mt-2 flex items-center gap-1 text-sm font-semibold text-red-400">
                                <IoBedOutline /> 남은 객실 {item.room.stock}개
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium">
                    <p>주문 합계 금액</p>
                    <p className="text-indigo-600 font-bold">
                      {/* {totalPrice.toLocaleString()}원 */}
                    </p>
                  </div>

                  <div className="mt-6">
                    <Link
                      to="/checkout"
                      className="flex justify-center rounded-md bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700">
                      주문하기
                    </Link>
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
