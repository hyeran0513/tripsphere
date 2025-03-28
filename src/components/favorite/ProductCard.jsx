import React, { useState } from 'react';
import { BiCalendarAlt, BiTrash, BiHeart } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { calculateDiscountedPrice } from '../../utils/discountedPrice';
import { formatNumber, formatDate } from '../../utils/format';
import TypeMapping from '../common/TypeMapping';
import { useControlFavorite } from '../../hooks/useFavoriteData';
import ToastMessage from '../common/ToastMessage';
import useAuthStore from '../../stores/useAuthStore';

const ProductCard = ({ favorite }) => {
  const [toast, setToast] = useState(null);
  const { user } = useAuthStore();
  // 토스트 메시지
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };
  const { mutate: favoriteDelMutation, isLoading: isFavoriteLoading } =
    useControlFavorite(showToast, user?.uid);

  const handleDelete = (e) => {
    if (e) e.preventDefault();
    favoriteDelMutation(favorite.accomId);
  };

  return (
    <Link to={`/product/${favorite.accomId}`}>
      <div className="flex flex-col items-start group card bg-base-100 transition-shadow gap-[20px]">
        <div className="h-full relative">
          <div className="h-[200px] rounded-md overflow-hidden">
            <img
              src={favorite.images[0]}
              alt={favorite.name}
              className="h-full object-cover"
            />
          </div>
        </div>

        <button
          className="btn btn-square btn-ghost indicator-item badge absolute top-2 right-2 transition opacity-0 hover:scale-110 group-hover:opacity-100 "
          onClick={handleDelete}
          disabled={isFavoriteLoading}>
          <BiTrash className="size-[1.2em]" />
        </button>

        <div className="card-body w-full py-0 px-0 gap-0">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 w-full">
              <TypeMapping type={favorite.type} />

              <div className="badge badge-soft badge-info text-xs truncate line-clamp-1 leading-6">
                {favorite.location.city} {favorite.location.sub_city}
              </div>
            </div>
          </div>

          <h2 className="mt-2 transition-colors card-title text-lg pb-3.5">
            <div className="line-clamp-1">{favorite.name}</div>
          </h2>

          <div className="flex flex-col border-b-1 border-gray-200 pb-3.5">
            <div className="flex items-center gap-2">
              <div className="text-gray-600 font-semibold">
                {(favorite.discount_rate * 100).toFixed(0)}%
              </div>
              <div
                className="line-through text-gray-400"
                title="정가">
                {formatNumber(favorite.original_price)}원
              </div>
            </div>

            <div
              className="font-bold text-lg text-red-600"
              title="할인가">
              {formatNumber(
                calculateDiscountedPrice(
                  favorite.original_price,
                  favorite.discount,
                ),
              )}
              원
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
                  <time dateTime={favorite.check_in}>
                    {formatDate(favorite.check_in)}
                  </time>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-2 min-w-[90px]">
                    <BiCalendarAlt className="text-base" />
                    <p className="font-bold">체크아웃</p>
                  </div>
                  <time dateTime={favorite.check_out}>
                    {formatDate(favorite.check_out)}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>
        {toast && (
          <ToastMessage
            toast={toast}
            setToast={setToast}
          />
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
