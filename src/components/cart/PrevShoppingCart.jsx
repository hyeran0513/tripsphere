import { useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { Link } from 'react-router-dom';
import { BiCalendarAlt, BiX, BiTrash } from 'react-icons/bi';
import { formatNumber, totalDays } from '../../utils/format';
import TypeMapping from '../common/TypeMapping';
import { useUserCart, useDelCartItem } from '../../hooks/useCartData';
import useUpdateGuestCount from '../../hooks/useUpdateGuestCount';

// [250311] hrkim: firebase 사용하면, users 테이블의 cart에 있는 accommodation_id 리스트를 이용하여 아래 정보를 조회해주세요
// const accommodations = [
//   {
//     id: '1',
//     type: 'pension',
//     name: '양평 독채 풀빌라 스테이호은',
//     check_in: '2025.03.11',
//     check_out: '2025.03.13',
//     description:
//       '예약 전 숙소 이용 안내 및 이용 수칙을 반드시 읽어주세요. 호젓한 은신처를 의미하는 호은.',
//     original_price: '80000',
//     discount_rate: '20',
//     final_price: '64000',
//     images: [
//       'https://ak-d.tripcdn.com/images/220713000000ubfbb2422_R_600_400_R5.webp',
//       'https://search.pstatic.net/common/?src=%22https%3A%2F%2Fimg.tripplat.com%2Fdomestic%2Fproduct%2Fpackage%2F5%2Fb1df43231016311a21c18139bcda6d08%2Fd2071f084774e9d137837f63a757b432.jpg%22&type=m1500',
//       'https://search.pstatic.net/common?src=https://img.tripplat.com/domestic/product/package/63/745afb46c4487cb27af34116d44ca34f/2bc579ebce57266a57247ff884947fe7.jpg&type=f174_174',
//       'https://search.pstatic.net/common/?src=%22https%3A%2F%2Fimg.tripplat.com%2Fdomestic%2Fproduct%2Fpackage%2F5%2Fb1df43231016311a21c18139bcda6d08%2Fd2071f084774e9d137837f63a757b432.jpg%22&type=m1500',
//       'https://search.pstatic.net/common/?src=%22https%3A%2F%2Fimg.tripplat.com%2Fdomestic%2Fproduct%2Fpackage%2F92%2F39eecb19671866113575816b92ff5ac3%2F14de7183c8784b2b44d7a08bf1ef0a7c.png%22&type=m1500',
//     ],
//     host: {
//       name: '홍길동',
//       experience: '3',
//       contact: '010-1234-5678',
//     },
//     services: ['wifi', 'parking', 'tv', 'breakfast', 'barbecue'],
//     location: {
//       latitude: '33.450701',
//       longitude: '126.570667',
//       place_name: '양평군, 경기도, 한국',
//     },
//   },
//   {
//     id: '2',
//     type: 'pension',
//     name: '양평 독채 풀빌라 스테이호은',
//     check_in: '2025.03.11',
//     check_out: '2025.03.13',
//     description:
//       '예약 전 숙소 이용 안내 및 이용 수칙을 반드시 읽어주세요. 호젓한 은신처를 의미하는 호은.',
//     original_price: '80000',
//     discount_rate: '20',
//     final_price: '64000',
//     images: [
//       'https://ak-d.tripcdn.com/images/220713000000ubfbb2422_R_600_400_R5.webp',
//       'https://search.pstatic.net/common/?src=%22https%3A%2F%2Fimg.tripplat.com%2Fdomestic%2Fproduct%2Fpackage%2F5%2Fb1df43231016311a21c18139bcda6d08%2Fd2071f084774e9d137837f63a757b432.jpg%22&type=m1500',
//       'https://search.pstatic.net/common?src=https://img.tripplat.com/domestic/product/package/63/745afb46c4487cb27af34116d44ca34f/2bc579ebce57266a57247ff884947fe7.jpg&type=f174_174',
//       'https://search.pstatic.net/common/?src=%22https%3A%2F%2Fimg.tripplat.com%2Fdomestic%2Fproduct%2Fpackage%2F5%2Fb1df43231016311a21c18139bcda6d08%2Fd2071f084774e9d137837f63a757b432.jpg%22&type=m1500',
//       'https://search.pstatic.net/common/?src=%22https%3A%2F%2Fimg.tripplat.com%2Fdomestic%2Fproduct%2Fpackage%2F92%2F39eecb19671866113575816b92ff5ac3%2F14de7183c8784b2b44d7a08bf1ef0a7c.png%22&type=m1500',
//     ],
//     host: {
//       name: '홍길동',
//       experience: '3',
//       contact: '010-1234-5678',
//     },
//     services: ['wifi', 'parking', 'tv', 'breakfast', 'barbecue'],
//     location: {
//       latitude: '33.450701',
//       longitude: '126.570667',
//       place_name: '양평군, 경기도, 한국',
//     },
//   },
// ];

const accommodations = [
  {
    id: '1',
    type: 'pension',
    name: '양평 독채 풀빌라 스테이호은',
    check_in: '2025.03.11',
    check_out: '2025.03.13',
    description:
      '예약 전 숙소 이용 안내 및 이용 수칙을 반드시 읽어주세요. 호젓한 은신처를 의미하는 호은.',
    original_price: '80000',
    discount_rate: '20',
    final_price: '64000',
    images: [
      'https://ak-d.tripcdn.com/images/220713000000ubfbb2422_R_600_400_R5.webp',
      'https://search.pstatic.net/common/?src=%22https%3A%2F%2Fimg.tripplat.com%2Fdomestic%2Fproduct%2Fpackage%2F5%2Fb1df43231016311a21c18139bcda6d08%2Fd2071f084774e9d137837f63a757b432.jpg%22&type=m1500',
      'https://search.pstatic.net/common?src=https://img.tripplat.com/domestic/product/package/63/745afb46c4487cb27af34116d44ca34f/2bc579ebce57266a57247ff884947fe7.jpg&type=f174_174',
      'https://search.pstatic.net/common/?src=%22https%3A%2F%2Fimg.tripplat.com%2Fdomestic%2Fproduct%2Fpackage%2F5%2Fb1df43231016311a21c18139bcda6d08%2Fd2071f084774e9d137837f63a757b432.jpg%22&type=m1500',
      'https://search.pstatic.net/common/?src=%22https%3A%2F%2Fimg.tripplat.com%2Fdomestic%2Fproduct%2Fpackage%2F92%2F39eecb19671866113575816b92ff5ac3%2F14de7183c8784b2b44d7a08bf1ef0a7c.png%22&type=m1500',
    ],
    host: {
      name: '홍길동',
      email: 'example@naver.com',
      contact: '010-1234-5678',
    },
    services: ['wifi', 'parking', 'tv', 'breakfast', 'barbecue'],
    location: {
      latitude: '33.450701',
      longitude: '126.570667',
      place_name: '양평군, 경기도, 한국',
    },
  },
  {
    id: '2',
    type: 'pension',
    name: '양평 독채 풀빌라 스테이호은',
    check_in: '2025.03.11',
    check_out: '2025.03.13',
    description:
      '예약 전 숙소 이용 안내 및 이용 수칙을 반드시 읽어주세요. 호젓한 은신처를 의미하는 호은.',
    original_price: '80000',
    discount_rate: '20',
    final_price: '64000',
    images: [
      'https://ak-d.tripcdn.com/images/220713000000ubfbb2422_R_600_400_R5.webp',
      'https://search.pstatic.net/common/?src=%22https%3A%2F%2Fimg.tripplat.com%2Fdomestic%2Fproduct%2Fpackage%2F5%2Fb1df43231016311a21c18139bcda6d08%2Fd2071f084774e9d137837f63a757b432.jpg%22&type=m1500',
      'https://search.pstatic.net/common?src=https://img.tripplat.com/domestic/product/package/63/745afb46c4487cb27af34116d44ca34f/2bc579ebce57266a57247ff884947fe7.jpg&type=f174_174',
      'https://search.pstatic.net/common/?src=%22https%3A%2F%2Fimg.tripplat.com%2Fdomestic%2Fproduct%2Fpackage%2F5%2Fb1df43231016311a21c18139bcda6d08%2Fd2071f084774e9d137837f63a757b432.jpg%22&type=m1500',
      'https://search.pstatic.net/common/?src=%22https%3A%2F%2Fimg.tripplat.com%2Fdomestic%2Fproduct%2Fpackage%2F92%2F39eecb19671866113575816b92ff5ac3%2F14de7183c8784b2b44d7a08bf1ef0a7c.png%22&type=m1500',
    ],
    host: {
      name: '홍길동',
      email: 'example@naver.com',
      contact: '010-1234-5678',
    },
    services: ['wifi', 'parking', 'tv', 'breakfast', 'barbecue'],
    location: {
      latitude: '33.450701',
      longitude: '126.570667',
      place_name: '양평군, 경기도, 한국',
    },
  },
];

const ShoppingCart = ({ open, setOpen }) => {
  const { data: accommodations = [], isLoading } = useUserCart();
  const delCart = useDelCartItem();
  const updateGuestCount = useUpdateGuestCount();

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // 주문 합계 내역
  const totalPrice = accommodations.reduce((acc, item) => {
    if (selectedItems.includes(item.id)) {
      const checkIn = item.check_in.toDate().toLocaleDateString('ko-KR');
      const checkOut = item.check_out.toDate().toLocaleDateString('ko-KR');
      const nights = Math.max(1, totalDays(checkIn, checkOut));
      return acc + (item.accommodation?.final_price ?? 0) * nights;
    }
    return acc;
  }, 0);

  // 전체선택 / 선택
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(accommodations.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleItemSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  // 인원 조절 핸들
  const handleGuestChange = (cartId, type, delta) => {
    const item = accommodations.find((a) => a.id === cartId);
    if (!item) return;
    updateGuestCount(cartId, item.guest_count, type, delta);
  };

  if (isLoading) return <div className="text-center mt-10"></div>;

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
                  <div className="mt-4 flex items-center">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="checkbox checkbox-primary mr-2"
                    />
                    <span className="text-sm">전체 선택</span>
                  </div>

                  <ul className="flex flex-wrap gap-4 mt-4">
                    {accommodations.map((accommodation) => {
                      const checkIn = accommodation.check_in
                        .toDate()
                        .toLocaleDateString('ko-KR');
                      const checkOut = accommodation.check_out
                        .toDate()
                        .toLocaleDateString('ko-KR');
                      const nights = Math.max(1, totalDays(checkIn, checkOut));
                      const originPrice =
                        accommodation.accommodation?.original_price || 0;
                      const finalPrice =
                        accommodation.accommodation?.final_price || 0;
                      const totalOrigin = originPrice * nights;
                      const totalFinal = finalPrice * nights;

                      return (
                        <li
                          key={accommodation.id}
                          className="w-full xl:w-[48%] flex flex-col border border-gray-200 rounded-lg p-4">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(accommodation.id)}
                            onChange={() => handleItemSelect(accommodation.id)}
                            className="checkbox checkbox-primary mb-3"
                          />
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full md:w-[120px] h-[180px] md:h-[120px] rounded-md overflow-hidden">
                              <img
                                src={
                                  accommodation.accommodation?.images?.[0] ??
                                  'https://via.placeholder.com/100'
                                }
                                alt={
                                  accommodation.accommodation?.name ??
                                  '숙소 이미지'
                                }
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                  <TypeMapping
                                    type={accommodation.accommodation?.type}
                                  />
                                  <div className="badge text-xs border border-gray-300 dark:border-sky-300">
                                    {accommodation.accommodation?.location
                                      ?.place_name || '위치 정보 없음'}
                                  </div>
                                </div>
                                <button
                                  onClick={() =>
                                    delCart.mutate(accommodation.id)
                                  }
                                  className="text-gray-500 hover:text-red-500">
                                  <BiTrash className="size-[1.2em]" />
                                </button>
                              </div>
                              <h2 className="mt-2 text-lg font-semibold">
                                <Link
                                  to={`/product/${accommodation.accommodation_id}`}
                                  className="hover:underline">
                                  {accommodation.accommodation?.name}
                                </Link>
                              </h2>

                              <div className="flex flex-col border-b border-gray-200 pb-3.5">
                                <div className="flex justify-end gap-2 text-sm text-gray-400">
                                  {accommodation.accommodation
                                    ?.discount_rate && (
                                    <span>
                                      {accommodation.accommodation
                                        .discount_rate * 100}
                                      %
                                    </span>
                                  )}
                                  <span className="line-through">
                                    {formatNumber(totalOrigin)}원
                                  </span>
                                </div>
                                <div className="text-right text-lg text-red-600 font-bold">
                                  {formatNumber(totalFinal)}원
                                </div>
                              </div>

                              <div className="py-4 space-y-2 text-sm">
                                <div className="flex gap-4 items-center">
                                  <div className="min-w-[90px] font-bold">
                                    성인 :
                                  </div>
                                  <button
                                    onClick={() =>
                                      handleGuestChange(
                                        accommodation.id,
                                        'adults',
                                        -1,
                                      )
                                    }
                                    className="w-5 h-5 border rounded">
                                    -
                                  </button>
                                  <span>
                                    {accommodation.guest_count?.adults ?? 0}명
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleGuestChange(
                                        accommodation.id,
                                        'adults',
                                        1,
                                      )
                                    }
                                    className="w-5 h-5 border rounded">
                                    +
                                  </button>
                                </div>
                                <div className="flex gap-4 items-center">
                                  <div className="min-w-[90px] font-bold">
                                    어린이 :
                                  </div>
                                  <button
                                    onClick={() =>
                                      handleGuestChange(
                                        accommodation.id,
                                        'children',
                                        -1,
                                      )
                                    }
                                    className="w-5 h-5 border rounded">
                                    -
                                  </button>
                                  <span>
                                    {accommodation.guest_count?.children ?? 0}명
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleGuestChange(
                                        accommodation.id,
                                        'children',
                                        1,
                                      )
                                    }
                                    className="w-5 h-5 border rounded">
                                    +
                                  </button>
                                </div>
                                <div className="flex gap-4 items-center pt-2">
                                  <div className="min-w-[90px] font-bold">
                                    체크인 :
                                  </div>
                                  <p>{checkIn}</p>
                                </div>
                                <div className="flex gap-4 items-center">
                                  <div className="min-w-[90px] font-bold">
                                    체크아웃 :
                                  </div>
                                  <p>{checkOut}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium">
                    <p>주문 합계 금액</p>
                    <p className="text-indigo-600 font-bold">
                      {totalPrice.toLocaleString()}원
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
