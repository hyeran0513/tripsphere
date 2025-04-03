import React, { useState } from 'react';
import KakaoShareButton from '../Molecules/KakaoShareButton';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import {
  useCheckFavorite,
  useControlFavorite,
} from '../../hooks/useFavoriteData';
import useAuthStore from '../../stores/useAuthStore';
import ToastMessage from '../Atoms/ToastMessage';

const ProductHeader = ({ product, productId, hideFavorite }) => {
  const [toast, setToast] = useState(null);
  const { user } = useAuthStore();

  // 토스트 메시지
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const { isAuthenticated } = useAuthStore();
  const { mutate: favoriteMutation } = useControlFavorite(showToast, user?.uid);
  const { data: isFavorite } = useCheckFavorite(user?.uid, productId);

  // 찜 버튼 핸들러
  const handleFavorite = (e) => {
    if (e) e.preventDefault();

    if (!isAuthenticated) {
      showToast('error', '로그인 후 찜 기능을 이용하실 수 있습니다.');
      return;
    }

    favoriteMutation(productId);
  };

  return (
    <>
      <div className="flex items-center justify-between pt-10">
        {/* 숙소명 */}
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
            {product.name}
          </h2>
        </div>

        {/* 로그인할 경우에만, 버튼 노출 */}
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          {/* 카카오 공유하기 버튼 */}
          <span className="hidden sm:block">
            {product?.images.length > 0 && (
              <KakaoShareButton
                hasText
                title={product.name}
                description={product.description}
                imageUrl={product?.images[0]}
                pageUrl={window.location.origin + '/product/' + productId}
              />
            )}
          </span>

          {/* 찜하기 버튼 */}
          {!hideFavorite && (
            <span className="ml-3 hidden sm:block">
              <button
                onClick={handleFavorite}
                type="button"
                className="cursor-pointer dark:text-white inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 dark:hover:bg-base-300">
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
          )}
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

export default ProductHeader;
