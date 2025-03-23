import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../../components/detail/details/ProductDetails';
import ProductGallery from '../../components/detail/ProductGallery';
import ProductHeader from '../../components/detail/ProductHeader';
import ProductLocation from '../../components/detail/ProductLocation';
import ProductReview from '../../components/detail/ProductReview';
import { useAccomData } from '../../hooks/useProductData';

const ProductDetail = () => {
  const { id } = useParams();
  const [productId, setProductId] = useState(id);

  useEffect(() => {
    setProductId(id);
  }, [id]);

  // 숙소 정보
  const {
    data: accommodation,
    isLoading: isAccommodationLoading,
    error: accomodationError,
  } = useAccomData(productId);

  if (isAccommodationLoading) return <>로딩 중...</>;
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
