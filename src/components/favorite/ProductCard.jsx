import React, { useState } from 'react';
import { BiSolidStar, BiSolidMap, BiTrash } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { formatNumber } from '../../utils/format';
import { useControlFavorite } from '../../hooks/useFavoriteData';
import ToastMessage from '../common/ToastMessage';
import useAuthStore from '../../stores/useAuthStore';
import TypeMapping from '../common/TypeMapping';

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
    favoriteDelMutation(favorite.id);
  };

  return (
    <>
      <Link
        to={`/product/${favorite.id}`}
        className="flex flex-col gap-6 relative group">
        <button
          className="btn btn-square btn-ghost indicator-item badge absolute top-2 right-2 transition opacity-0 hover:scale-110 group-hover:opacity-100"
          onClick={handleDelete}
          disabled={isFavoriteLoading}>
          <BiTrash className="size-[1.2em]" />
        </button>

        <div className="w-[100%] h-[200px] rounded-md overflow-hidden">
          <img
            src={favorite.images[0]}
            alt={favorite.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <div className="flex gap-2 mb-2">
                {/* 숙소 유형 */}
                <TypeMapping type={favorite.type} />

                <div className="badge bg-yellow-500 text-xs gap-0.5">
                  <BiSolidStar />
                  {favorite.rating}
                </div>
              </div>

              {/* 숙소명 */}
              <div className="mb-0.5 transition-colors card-title text-lg">
                {favorite.name}
              </div>

              {/* 위치 */}
              <div
                aria-label={`숙소 위치 ${favorite.rating}`}
                className="flex items-center gap-1 text-xs text-gray-500">
                <BiSolidMap /> {favorite.location.city}{' '}
                {favorite.location.sub_city}
              </div>
            </div>
          </div>

          {favorite.rooms.map((room) => {
            // 숙박과 대실을 각각 하나씩만 선택
            const stayRoom = favorite.rooms.find(
              (room) => room.stay_type === 'stay',
            );
            const dayUseRoom = favorite.rooms.find(
              (room) => room.stay_type === 'day_use',
            );

            return (
              <>
                {stayRoom && room.id === stayRoom.id && (
                  <div
                    key={stayRoom.id}
                    className="mt-4 pl-2 flex justify-between border-l-3 border-gray-200">
                    <h3 className="text-xs font-semibold">숙박</h3>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">
                          {stayRoom.discount_rate * 100}%
                        </span>
                        <span className="line-through text-sm text-gray-300">
                          {formatNumber(stayRoom.original_price)}원
                        </span>
                      </div>
                      <div className="font-semibold text-lg text-gray-900">
                        {formatNumber(
                          stayRoom.original_price *
                            (1 - stayRoom.discount_rate),
                        )}{' '}
                        원
                      </div>
                    </div>
                  </div>
                )}

                {dayUseRoom && room.id === dayUseRoom.id && (
                  <div
                    key={dayUseRoom.id}
                    className="mt-4 pl-2 flex justify-between border-l-3 border-gray-200">
                    <h3 className="text-xs font-semibold">대실</h3>
                    <div className="mt-4 flex flex-col items-end">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">
                          {dayUseRoom.discount_rate * 100}%
                        </span>
                        <span className="line-through text-sm text-gray-300">
                          {formatNumber(dayUseRoom.original_price)}원
                        </span>
                      </div>
                      <div className="font-semibold text-lg text-gray-900">
                        {formatNumber(
                          dayUseRoom.original_price *
                            (1 - dayUseRoom.discount_rate),
                        )}{' '}
                        원
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </Link>

      {toast && (
        <ToastMessage
          toast={toast}
          setToast={setToast}
        />
      )}
    </>
  );
};

export default ProductCard;
