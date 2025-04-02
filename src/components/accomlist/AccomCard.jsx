import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TypeMapping from '../common/TypeMapping';
import {
  BiSolidStar,
  BiSolidMap,
  BiHeart,
  BiSolidHeart,
  BiCalendarAlt,
  BiUser,
} from 'react-icons/bi';
import { formatDate, formatNumber } from '../../utils/format';
import KakaoShareButton from '../common/KakaoShareButton';
import {
  useCheckFavorite,
  useControlFavorite,
} from '../../hooks/useFavoriteData';
import useAuthStore from '../../stores/useAuthStore';
import ToastMessage from '../common/ToastMessage';
import { PiBabyLight } from 'react-icons/pi';

const AccomCard = ({ accommodation }) => {
  const [toast, setToast] = useState(null);
  const { user, isAuthenticated } = useAuthStore();
  const { data: isFavorite } = useCheckFavorite(user?.uid, accommodation.id);

  // 토스트 메시지
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const { mutate: favoriteMutation, isLoading: isFavoriteLoading } =
    useControlFavorite(showToast, user?.uid);

  // 찜 버튼 핸들러
  const handleFavorite = (e) => {
    if (e) e.preventDefault();

    if (!isAuthenticated) {
      showToast('error', '로그인 후 찜 기능을 이용하실 수 있습니다.');
      return;
    }

    favoriteMutation(accommodation.id);
  };

  return (
    <>
      <li>
        <Link
          to={`/product/${accommodation.id}`}
          className="flex gap-6">
          <div className="w-[40%] h-[200px] rounded-md overflow-hidden">
            <img
              src={accommodation.images[0]}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <div className="flex gap-2 mb-2">
                  {/* 숙소 유형 */}
                  <TypeMapping type={accommodation.type} />

                  <div className="badge bg-yellow-500 text-xs gap-0.5">
                    <BiSolidStar />
                    {(accommodation.avg_rating || 0).toFixed(1)}
                  </div>
                </div>

                {/* 숙소명 */}
                <div className="mb-0.5 transition-colors card-title text-lg">
                  {accommodation.name}
                </div>

                {/* 위치 */}
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <BiSolidMap /> {accommodation.location.city}{' '}
                  {accommodation.location.sub_city}
                </div>
              </div>

              <div className="flex gap-2">
                <span
                  className="hidden sm:block"
                  aria-label="카카오톡으로 숙소 정보 공유하기">
                  <KakaoShareButton
                    title={accommodation.name}
                    description={accommodation.description}
                    imageUrl={accommodation.images[0]}
                    pageUrl={
                      window.location.origin + `/product/${accommodation.id}`
                    }
                  />
                </span>

                <span className="hidden sm:block">
                  <button
                    onClick={handleFavorite}
                    type="button"
                    className="cursor-pointer dark:text-white inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                    {isFavorite ? (
                      <BiSolidHeart
                        aria-hidden="true"
                        className=" size-5 text-red-400"
                      />
                    ) : (
                      <BiHeart
                        aria-hidden="false"
                        className="size-5 text-gray-400"
                      />
                    )}
                  </button>
                </span>
              </div>
            </div>

            {accommodation.rooms.map((room) => {
              // 숙박과 대실을 각각 하나씩만 선택
              const stayRoom = accommodation.rooms.find(
                (room) => room.stay_type === 'stay',
              );
              const dayUseRoom = accommodation.rooms.find(
                (room) => room.stay_type === 'day_use',
              );

              // 조건에 맞는 객실을 출력
              return (
                <>
                  {stayRoom && room.id === stayRoom.id && (
                    <div
                      key={stayRoom.id}
                      className="mt-4 pl-2 flex justify-between border-l-3 border-gray-200">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-xs font-semibold">숙박</h3>
                        <p className="flex items-center gap-2 text-xs">
                          <BiCalendarAlt /> {formatDate(stayRoom.check_in)} -{' '}
                          {formatDate(stayRoom.check_out)}
                        </p>

                        <p className="flex items-center gap-2 text-xs">
                          <BiUser /> 성인{' '}
                          <span>{stayRoom.capacity.adults}명</span>
                          <PiBabyLight /> 미성년자{' '}
                          <span>{stayRoom.capacity.children}명</span>
                        </p>
                      </div>

                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {stayRoom.discount_rate * 100}%
                          </span>
                          <span className="line-through text-sm text-gray-300 dark:text-white">
                            {formatNumber(stayRoom.original_price)}원
                          </span>
                        </div>
                        <div className="font-semibold text-lg text-gray-900 dark:text-white">
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
                      <div className="flex flex-col gap-2">
                        <h3 className="text-xs font-semibold">대실</h3>

                        <p className="flex items-center gap-2 text-xs">
                          <BiCalendarAlt /> {formatDate(dayUseRoom.check_in)}
                        </p>

                        <p className="flex items-center gap-2 text-xs">
                          <BiUser /> 성인{' '}
                          <span>{dayUseRoom.capacity.adults}명</span>
                          <PiBabyLight /> 미성년자{' '}
                          <span>{dayUseRoom.capacity.children}명</span>
                        </p>
                      </div>

                      <div className="mt-4 flex flex-col items-end">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {dayUseRoom.discount_rate * 100}%
                          </span>
                          <span className="line-through text-sm text-gray-300 dark:text-white">
                            {formatNumber(dayUseRoom.original_price)}원
                          </span>
                        </div>
                        <div className="font-semibold text-lg text-gray-900 dark:text-white">
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
      </li>

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

export default AccomCard;
