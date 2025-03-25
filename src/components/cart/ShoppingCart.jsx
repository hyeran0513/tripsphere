import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { Link } from 'react-router-dom';
import { BiCalendarAlt, BiX, BiTrash } from 'react-icons/bi';
import { formatNumber } from '../../utils/format';
import TypeMapping from '../common/TypeMapping';

// [250311] hrkim: firebase 사용하면, users 테이블의 cart에 있는 accommodation_id 리스트를 이용하여 아래 정보를 조회해주세요
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
  const totalPrice = accommodations.reduce((acc, product) => {
    return acc + parseInt(product.final_price, 10);
  }, 0);

  return (
    <Dialog
      open={open}
      onClose={setOpen}
      className="relative z-101">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0 "
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="fixed inset-0 flex items-center justify-center">
            <DialogPanel
              transition
              className="w-[70%] h-[90%] bg-white dark:bg-gray-900 shadow-xl rounded-lg transform transition duration-500 ease-in-out">
              <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900 dark:text-white">
                      장바구니
                    </DialogTitle>

                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <BiX
                          aria-hidden="true"
                          className="size-6"
                        />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="flex flex-wrap gap-4">
                        {accommodations.map((accommodation) => (
                          <li
                            key={accommodation.id}
                            className="flex w-[48%] h-auto py-6 border border-gray-200 rounded-lg p-4">
                            <input
                              type="checkbox"
                              defaultChecked
                              className="checkbox checkbox-primary mr-3"
                            />
                            <Link
                              to="/product/0"
                              className="w-full flex gap-8">
                              <div className="h-[100px] rounded-md overflow-hidden inline-block">
                                <img
                                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                  alt="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                  className="h-full object-cover"
                                />
                              </div>

                              <div className="card-body py-0 px-0 gap-0">
                                {/* 패키지 이름 */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center justify-between">
                                    <div className="flex gap-2">
                                      <TypeMapping type={accommodation.type} />

                                      <div className="badge bg-transparent border border-gray-300 dark:border-sky-300 text-gray-900 dark:text-sky-300 text-xs">
                                        {accommodation.location.place_name}
                                      </div>
                                    </div>
                                  </div>

                                  <button className="btn btn-square btn-ghost indicator-item badge hover:scale-110 group-hover:opacity-100 ">
                                    <BiTrash className="size-[1.2em]" />
                                  </button>
                                </div>
                                <h2 className="mt-2 transition-colors card-title text-lg pb-3.5">
                                  <div className="line-clamp-1">
                                    {accommodation.name}
                                  </div>
                                </h2>
                                {/* 가격정보 */}
                                <div className="flex flex-col border-b-1 border-gray-200 pb-3.5">
                                  <div className="flex items-center gap-2">
                                    <div className="text-gray-400">
                                      {accommodation.discount_rate}%
                                    </div>
                                    <div
                                      className="line-through text-gray-400"
                                      title="정가">
                                      {formatNumber(
                                        accommodation.original_price,
                                      )}
                                      원
                                    </div>
                                  </div>

                                  <div
                                    className="font-bold text-lg text-red-600"
                                    title="할인가">
                                    {formatNumber(accommodation.final_price)}원
                                  </div>
                                </div>
                                <div
                                  className=""
                                  title="패키지 상세정보들">
                                  <div className="py-4 pr-4">
                                    <div className="">
                                      <div className="flex gap-4 items-center">
                                        <div className="flex items-center gap-2 min-w-[90px]">
                                          <BiCalendarAlt className="text-base" />
                                          <p className="font-bold">체크인</p>
                                        </div>
                                        <p>{accommodation.check_in}</p>
                                      </div>

                                      <div className="flex gap-4 items-center">
                                        <div className="flex items-center gap-2 min-w-[90px]">
                                          <BiCalendarAlt className="text-base" />
                                          <p className="font-bold">체크아웃</p>
                                        </div>
                                        <p>{accommodation.check_out}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white ">
                    <p>주문 합계 금액</p>
                    <p className="text-indigo-600 font-bold dark:text-indigo-50">
                      {totalPrice.toLocaleString()}원
                    </p>
                  </div>

                  <div className="mt-6">
                    <Link
                      to="/checkout"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700">
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
