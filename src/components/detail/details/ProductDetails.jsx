import { useMemo, useState } from 'react';
import useReservationStore from '../../../stores/useReservationStore';
import { totalDays } from '../../../utils/format';
import ProductInfo from './ProductInfo';
import ServiceList from '../../common/ServiceList';
import HostInfo from './HostInfo';
import ProductDescription from './ProductDescription';
import ReservationForm from '../reservation/ReservationForm';
import PriceDetails from '../reservation/PriceDetails';
import CartButton from '../reservation/CartButton';
import ReservationButton from '../reservation/ReservationButton';
import ToastMessage from '../../common/ToastMessage';

const ProductDetails = ({ product, productId }) => {
  const [openDate, setOpenDate] = useState(false);
  const [adults, setAdults] = useState(0);
  const [toast, setToast] = useState(null);
  const {
    checkIn,
    checkOut,
    adultCount,
    childrenCount,
    setTotalPrice,
    setAccommodationId,
  } = useReservationStore();

  // 토스트 보여주기
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  // 총 금액
  const totalPrice = useMemo(
    () =>
      (checkIn === checkOut ? 1 : totalDays(checkIn, checkOut)) *
      product.final_price,
    [checkIn, checkOut, product.final_price],
  );

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
                <CartButton
                  productId={productId}
                  showToast={showToast}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  adultCount={adultCount}
                  childrenCount={childrenCount}
                  totalPrice={totalPrice}
                />

                {/* 예약하기 버튼 */}
                <ReservationButton
                  product={product}
                  totalPrice={totalPrice}
                  setTotalPrice={setTotalPrice}
                  setAccommodationId={setAccommodationId}
                  productId={productId}
                />
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
