import { useMemo, useState } from 'react';
import useAuthStore from '../../../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import useReservationStore from '../../../stores/useReservationStore';
import { formatToTimestamp, totalDays } from '../../../utils/format';
import { serverTimestamp } from 'firebase/firestore';
import { useAddCarts } from '../../../hooks/useCartData';
import ProductInfo from './ProductInfo';
import ServiceList from '../../common/ServiceList';
import HostInfo from './HostInfo';
import ReservationForm from './reservationForm';
import PriceDetails from './PriceDetails';
import ToastMessage from '../../common/ToastMessage';
import ProductDescription from './ProductDescription';

const ProductDetails = ({ product, productId }) => {
  const { user } = useAuthStore();
  const [openDate, setOpenDate] = useState(false);
  const navigate = useNavigate();
  const [adults, setAdults] = useState(0);
  const { checkIn, checkOut, setTotalPrice, adultCount, childrenCount } =
    useReservationStore();

  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const { mutate } = useAddCarts(user?.uid, showToast);

  const handleAddToCart = (e) => {
    e.preventDefault();
    mutate({
      accommodation_id: productId,
      check_in: formatToTimestamp(checkIn),
      check_out: formatToTimestamp(checkOut),
      guest_count: { adults: adultCount, children: childrenCount },
      cart_date: serverTimestamp(),
      user_id: user?.uid,
    });
  };

  const totalPrice = useMemo(
    () =>
      (checkIn === checkOut ? 1 : totalDays(checkIn, checkOut)) *
      product.final_price,
    [checkIn, checkOut, product.final_price],
  );

  const handleReservation = (e) => {
    e.preventDefault();
    setTotalPrice(totalPrice);
    navigate('/checkout');
  };

  return (
    <>
      <div className="flex space-y-6 gap-10 mt-[30px]">
        <div className="flex-1">
          {/* 상품 정보 */}
          <ProductInfo product={product} />

          <div className="mt-6 border-t border-gray-100">
            <div className="divide-y divide-gray-100">
              {/* 서비스 목록 */}
              <ServiceList services={product.services} />

              {/* 호스트 정보 */}
              <HostInfo product={product} />

              {/* 상품 상세 설명 */}
              <ProductDescription product={product} />
            </div>
          </div>
        </div>

        {/* 예약 정보 */}
        <div>
          <div className="card bg-base-100 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">예약 정보</h2>

              {/* 예약 폼 */}
              <ReservationForm
                openDate={openDate}
                setOpenDate={setOpenDate}
                adults={adults}
                setAdults={setAdults}
                product={product}
                adultCount={adultCount}
                childrenCount={childrenCount}
              />

              {/* 가격 정보 */}
              <PriceDetails
                totalPrice={totalPrice}
                checkIn={checkIn}
                checkOut={checkOut}
                product={product}
              />

              {/* 버튼 영역 */}
              <div className="flex space-x-2">
                {/* 장바구니 버튼 */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="text-base font-medium flex-1 border border-gray-300 px-8 py-3 rounded hover:bg-gray-100 cursor-pointer">
                  장바구니
                </button>

                {/* 예약하기 버튼 */}
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
        <ToastMessage
          toast={toast}
          setToast={setToast}
        />
      )}
    </>
  );
};

export default ProductDetails;
