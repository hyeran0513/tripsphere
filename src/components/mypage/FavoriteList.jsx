import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiHeart, BiCalendarAlt, BiSolidStar } from 'react-icons/bi';
import { formatDate, formatNumber } from '../../utils/format';
import { useFavoriteAccommData } from '../../hooks/useFavoriteData';

import Loading from '../common/Loading';
import useAuthStore from '../../stores/useAuthStore';
import Rating from '../common/Rating';
import TypeMapping from '../common/TypeMapping';

const FavoriteList = () => {
  const { user } = useAuthStore();
  const { data, isLoading, error } = useFavoriteAccommData(user?.uid);

  useEffect(() => {
    if (data) {
      // console.log('찜 목록 내역:', JSON.stringify(data));
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return <>오류</>;

  return (
    <>
      <div className="mt-8 p-4 pb-2 text-xs opacity-60 tracking-wide flex justify-between">
        <h2 className="flex items-center gap-2 font-bold text-xl">
          <BiHeart size={20} /> 찜 목록
        </h2>

        <Link
          to="/favorite"
          className="text-primary font-bold">
          더 보기
        </Link>
      </div>

      <ul className="list bg-base-100 rounded-box shadow-md mb-10">
        {data.slice(0, 3).map((favorite, index) => (
          <li
            key={index}
            className="list-row flex-col flex">
            <div className="flex flex-col">
              <div className="flex  gap-6">
                <img
                  className="size-20 rounded-box"
                  src={favorite.images[1]}
                  alt={favorite.name}
                />

                <div className="flex-1">
                  <div className="flex">
                    <h2 className="text-md font-bold mb-2">{favorite.name}</h2>
                    <div className="flex gap-2">
                      <TypeMapping type={favorite.type} />

                      <div className="badge badge-soft badge-info text-xs">
                        {favorite.location.city} {favorite.location.sub_city}
                      </div>

                      <div className="badge bg-yellow-500 text-xs gap-0.5">
                        <BiSolidStar />
                        {favorite.rating}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {favorite.rooms.map((room) => {
                      // 숙박과 대실을 각각 하나씩만 선택
                      const stayRoom = favorite.rooms.find(
                        (room) => room.stay_type === 'stay',
                      );
                      const dayUseRoom = favorite.rooms.find(
                        (room) => room.stay_type === 'day_use',
                      );

                      return (
                        <div>
                          {stayRoom && room.id === stayRoom.id && (
                            <div
                              key={stayRoom.id}
                              className="mt-4 pl-2 flex justify-between border-l-3 border-gray-200">
                              <h3 className="flex gap-2 text-xs font-semibold">
                                <p className="font-semibold">{room.name}</p> /
                                숙박
                              </h3>
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
                              <h3 className="flex gap-2 text-xs font-semibold">
                                <p className="font-semibold">{room.name}</p> /
                                대실
                              </h3>
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
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FavoriteList;
