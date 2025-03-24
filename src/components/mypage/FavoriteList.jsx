import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiHeart, BiCalendarAlt } from 'react-icons/bi';
import { formatDate, formatNumber } from '../../utils/format';
import { useFavoriteAccommData } from '../../hooks/useFavoriteData';
import TypeMapping from '../common/TypeMapping';
import Loading from '../common/Loading';
import useAuthStore from '../../stores/useAuthStore';

const FavoriteList = () => {
  const { user } = useAuthStore();
  const { data, isLoading, error } = useFavoriteAccommData(user?.uid);

  useEffect(() => {
    if (data) {
      //console.log('찜 목록 내역:', JSON.stringify(data));
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return <>오류</>;

  return (
    <div>
      <div className="my-8 p-4 pb-2 text-xs opacity-60 tracking-wide flex justify-between">
        <h2 className="flex items-center gap-2 font-bold text-xl">
          <BiHeart size={20} /> 찜 목록
        </h2>

        <Link
          to="/favorite"
          className="text-primary font-bold">
          더 보기
        </Link>
      </div>

      <ul className="mt-8 list bg-base-100 rounded-box shadow-md mb-10">
        {data &&
          data.map((favorite, index) => (
            <li
              key={index}
              className="list-row flex-col flex">
              <div className="flex justify-between">
                <div className="flex gap-6">
                  <img
                    className="size-20 rounded-box"
                    src={favorite.images[1]}
                    alt={favorite.name}
                  />

                  <div className="flex flex-col">
                    <h2 className="text-md font-bold mb-2">{favorite.name}</h2>
                    <div className="flex gap-2">
                      <TypeMapping type={favorite.type} />

                      <div className="badge badge-soft badge-info text-xs">
                        {favorite.location.city} {favorite.location.sub_city}
                      </div>
                    </div>

                    <div className="flex-col flex gap-[4px] mt-auto">
                      <div className="flex items-center gap-10">
                        <div className="flex items-center gap-2 text-xs">
                          <BiCalendarAlt />
                          <span>체크인:</span>
                          <span>{formatDate(favorite.check_in)}</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs">
                          <BiCalendarAlt />
                          <span>체크아웃:</span>
                          <span>{formatDate(favorite.check_out)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>{formatNumber(favorite.final_price)}원</div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FavoriteList;
