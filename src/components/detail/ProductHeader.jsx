import React, { useEffect, useState } from 'react';
import KakaoShareButton from '../../components/common/KakaoShareButton';
import { BiCart, BiHeart, BiSolidHeart } from 'react-icons/bi';
import Toast from '../common/Toast';
import {
  useCheckFavorite,
  useControlFavorite,
} from '../../hooks/useFavoriteData';
import useAuthStore from '../../stores/useAuthStore';

const ProductHeader = ({ product, productId }) => {
  const [toast, setToast] = useState(null);
  const { isAuthenticated } = useAuthStore();

  // 토스트 메시지
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const { mutate: favoriteMutation, isLoading: isFavoriteLoading } =
    useControlFavorite(showToast);
  const { data: isFavorite } = useCheckFavorite(productId);

  // 찜 버튼 핸들러
  const handleFavorite = (e) => {
    if (e) e.preventDefault();
    favoriteMutation(productId);
  };

  return (
    <>
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
            {product.name}
          </h2>
        </div>

        {isAuthenticated && (
          <div className="mt-5 flex lg:mt-0 lg:ml-4">
            <span className="hidden sm:block">
              <KakaoShareButton
                hasText
                title={product.name}
                description={product.description}
                imageUrl={product.images[0]}
                pageUrl={window.location.origin + '/product/' + productId}
              />
            </span>

            <span className="ml-3 hidden sm:block">
              <button
                onClick={handleFavorite}
                type="button"
                className="dark:text-white inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                {isFavorite ? (
                  <BiSolidHeart
                    aria-hidden="true"
                    className="mr-1.5 -ml-0.5 size-5 text-red-400"
                  />
                ) : (
                  <BiHeart
                    aria-hidden="false"
                    className="mr-1.5 -ml-0.5 size-5 text-gray-400"
                  />
                )}
                찜하기
              </button>
            </span>
          </div>
        )}
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

export default ProductHeader;
