import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PeopleSelector from '../../components/common/PeopleSelector';
import { formatNumber, formatToTimestamp, totalDays } from '../../utils/format';
import DateSelector from '../common/DateSelector';
import ServiceIcon from '../common/ServiceIcon';
import useReservationStore from '../../stores/useReservationStore';
import useAuthStore from '../../stores/useAuthStore';
import { serverTimestamp } from 'firebase/firestore';
import { useAddCarts } from '../../hooks/useCartData';
import Toast from '../common/Toast';

const typeMapping = {
  pension: '펜션',
  hotel: '호텔',
  camping: '캠핑',
};

const serviceNames = {
  wifi: '와이파이',
  parking: '주차장',
  tv: 'TV',
  breakfast: '조식',
  barbecue: '바비큐',
};

const ProductDetails = ({ product, productId }) => {
  const { user } = useAuthStore();
  const [openDate, setOpenDate] = useState(false);
  const navigate = useNavigate();
  const [adults, setAdults] = useState(0);
  const { checkIn, checkOut, setTotalPrice, adultCount, childrenCount } =
    useReservationStore();

  const [toast, setToast] = useState(null);

  // 토스트 메시지
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const { mutate } = useAddCarts(user?.uid, showToast);

  // 장바구니
  const handleAddToCart = (e) => {
    e.preventDefault();

    // 상태 업데이트
    mutate({
      accommodation_id: productId,
      check_in: formatToTimestamp(checkIn),
      check_out: formatToTimestamp(checkOut),
      guest_count: { adults: adultCount, children: childrenCount },
      cart_date: serverTimestamp(),
      user_id: user?.uid,
    });
  };

  // 총 주문 금액
  const totalPrice = useMemo(
    () =>
      (checkIn === checkOut ? 1 : totalDays(checkIn, checkOut)) *
      product.final_price,
    [checkIn, checkOut, product.final_price],
  );

  // 예약하기
  const handleReservation = (e) => {
    e.preventDefault();
    setTotalPrice(totalPrice);
    navigate('/checkout');
  };

  return (
    <>
      <div className="flex space-y-6 gap-10 mt-[30px]">
        <div className="flex-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {product.name}
            </h3>
            <div className="mt-1 max-w-2xl text-sm/6 text-gray-500">
              <div className="badge badge-soft badge-primary text-xs">
                {typeMapping[product.type]}
              </div>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <div className="divide-y divide-gray-100">
              <div className="px-4 py-6 gap-4 sm:px-0 text-sm/6 text-gray-70">
                <ul className="grid grid-cols-2 divide-y divide-gray-100 rounded-md border border-gray-200">
                  {product.services.map((service, index) => (
                    <li
                      key={index}
                      className="flex items-center py-4 px-4 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="text-lg">
                          <ServiceIcon
                            key={service}
                            type={service}
                            className="text-lg"
                          />
                        </div>
                        <span>{serviceNames[service]}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-4 py-6 gap-4 sm:px-0 text-sm/6 text-gray-70">
                <ul className="list">
                  <li className="list-row px-0 py-0">
                    <div>
                      <img
                        className="size-10 rounded-box"
                        src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                      />
                    </div>
                    <div>
                      <div className="font-bold">
                        호스트: {product.host.name}
                      </div>
                      <div className="text-xs uppercase opacity-60">
                        호스트 경력 {product.host.experience}년
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="px-4 py-6 gap-4 sm:px-0 text-sm/6 text-gray-70">
                <div className="mb-4 line-clamp-3">{product.description}</div>

                <button
                  className="btn"
                  onClick={() =>
                    document.getElementById('my_modal_1').showModal()
                  }>
                  더 보기
                </button>

                <dialog
                  id="my_modal_1"
                  className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="py-4">{product.description}</p>
                    <div className="modal-action">
                      <form method="dialog">
                        <button className="btn">확인</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card bg-base-100 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">예약 정보</h2>
              <div className="border border-base-300 dark:border-gray-100 p-4 rounded-box">
                {/* 체크인 · 체크아웃 */}
                <DateSelector
                  stateType="reservation"
                  openDate={openDate}
                  setOpenDate={setOpenDate}
                />

                {/* 인원수 */}
                <PeopleSelector
                  adults={adults}
                  setAdults={setAdults}
                  stateType="reservation"
                  capacity={product.capacity}
                />
              </div>

              <div className="flex items-center justify-between py-2">
                {totalDays(checkIn, checkOut) !== 0 ? (
                  <p className="flex gap-2 text-xl font-bold">
                    <span>{formatNumber(product.final_price)}</span>

                    <>
                      <span>X</span>{' '}
                      <span>{totalDays(checkIn, checkOut)}박</span>
                    </>
                  </p>
                ) : (
                  <>총액</>
                )}
                <p className="text-red-500 text-xl font-bold text-right">
                  {formatNumber(totalPrice)}원
                </p>
              </div>

              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="text-base font-medium flex-1 border border-gray-300 px-8 py-3 rounded hover:bg-gray-100 cursor-pointer">
                  장바구니
                </button>
                <button
                  type="button"
                  onClick={handleReservation}
                  className="text-base font-medium flex-1 border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden rounded cursor-pointer">
                  예약하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 토스트 메시지 */}
      {toast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-10">
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        </div>
      )}
    </>
  );
};

export default ProductDetails;
