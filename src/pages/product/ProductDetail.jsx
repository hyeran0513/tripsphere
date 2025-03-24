import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ProductHeader from '../../components/detail/header/ProductHeader';
import ProductGallery from '../../components/detail/gallery/ProductGallery';
import ProductDetails from '../../components/detail/details/ProductDetails';
import ProductLocation from '../../components/detail/location/ProductLocation';
import ProductReview from '../../components/detail/review/ProductReview';
import { useAccomData } from '../../hooks/useProductData';
import Loading from '../../components/common/Loading';
import useReservationStore from '../../stores/useReservationStore';

const ProductDetail = () => {
  const { id } = useParams();
  const [productId, setProductId] = useState(id);
  const location = useLocation();
  const resetReservation = useReservationStore(
    (state) => state.resetReservation,
  );

  // 예약 정보 폼 초기화
  useEffect(() => {
    resetReservation();
  }, [location]);

  useEffect(() => {
    setProductId(id);
  }, [id]);

  // 숙소 정보
  const {
    data: accommodation,
    isLoading: isAccommodationLoading,
    error: accomodationError,
  } = useAccomData(productId);

  if (isAccommodationLoading) return <Loading />;
  if (accomodationError) return <>에러</>;

  return (
    <div className="max-w-[1200px] mx-auto px-[20px] py-[40px]">
      {/* 상품 헤더 */}
      <ProductHeader
        product={accommodation}
        productId={productId}
      />

      {/* 상품 갤러리 */}
      <ProductGallery product={accommodation} />

      {/* 상품 상세 정보 */}
      <ProductDetails
        product={accommodation}
        productId={productId}
      />

      {/* 위치 */}
      <ProductLocation product={accommodation} />

      {/* 리뷰 */}
      <ProductReview productId={productId} />
    </div>
  );
};

export default ProductDetail;
