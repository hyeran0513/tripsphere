import { Link } from 'react-router-dom';
import { BiHeart, BiSolidStar, BiCalendarAlt, BiUser } from 'react-icons/bi';
import { formatDate, formatNumber } from '../../utils/format';
import { useFavoriteAccommData } from '../../hooks/useFavoriteData';
import { PiBabyLight } from 'react-icons/pi';
import Loading from '../common/Loading';
import useAuthStore from '../../stores/useAuthStore';
import TypeMapping from '../common/TypeMapping';
import NoData from '../common/NoData';
import { BiHeartCircle } from 'react-icons/bi';

const FavoriteList = () => {
  const { user } = useAuthStore();
  const { data, isLoading, error } = useFavoriteAccommData(user?.uid);

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

      {data?.length > 0 ? (
        <ul className="list bg-base-100 rounded-box shadow-md mb-10">
          {data
            ?.slice(-3)
            .reverse()
            .map((favorite, index) => (
              <li
                key={index}
                className="list-row flex-col flex">
                <div className="flex flex-col">
                  <div className="flex  gap-6">
                    <img
                      className="size-20 rounded-box"
                      src={favorite.images[0]}
                      alt={favorite.name}
                    />

                    <div className="flex-1">
                      <div className="flex">
                        <h2 className="text-md font-bold mb-2">
                          {favorite.name}
                        </h2>
                        <div className="flex gap-2">
                          <TypeMapping type={favorite.type} />

                          <div className="badge badge-soft badge-info text-xs">
                            {favorite.location.city}{' '}
                            {favorite.location.sub_city}
                          </div>

                          <div className="badge bg-yellow-500 text-xs gap-0.5">
                            <BiSolidStar />
                            {(favorite.avg_rating || 0).toFixed(1)}
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
                            <div key={`room-${room.id}`}>
                              {stayRoom && room.id === stayRoom.id && (
                                <div
                                  key={stayRoom.id}
                                  className="mt-4 pl-2 flex justify-between border-l-3 border-gray-200">
                                  <div className="flex flex-col gap-2">
                                    <h3 className="text-xs font-semibold">
                                      숙박
                                    </h3>
                                    <p className="flex items-center gap-2 text-xs">
                                      <BiCalendarAlt />{' '}
                                      {formatDate(stayRoom.check_in)} -{' '}
                                      {formatDate(stayRoom.check_out)}
                                    </p>

                                    <p className="flex items-center gap-2 text-xs">
                                      <BiUser /> 성인{' '}
                                      <span>{stayRoom.capacity.adults}명</span>
                                      <PiBabyLight /> 미성년자{' '}
                                      <span>
                                        {stayRoom.capacity.children}명
                                      </span>
                                    </p>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {stayRoom.discount_rate * 100}%
                                      </span>
                                      <span className="line-through text-sm text-gray-300 dark:text-white">
                                        {formatNumber(stayRoom.original_price)}
                                        원
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
                                    <h3 className="text-xs font-semibold">
                                      대실
                                    </h3>

                                    <p className="flex items-center gap-2 text-xs">
                                      <BiCalendarAlt />{' '}
                                      {formatDate(dayUseRoom.check_in)}
                                    </p>

                                    <p className="flex items-center gap-2 text-xs">
                                      <BiUser /> 성인{' '}
                                      <span>
                                        {dayUseRoom.capacity.adults}명
                                      </span>
                                      <PiBabyLight /> 미성년자{' '}
                                      <span>
                                        {dayUseRoom.capacity.children}명
                                      </span>
                                    </p>
                                  </div>
                                  <div className="mt-4 flex flex-col items-end">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {dayUseRoom.discount_rate * 100}%
                                      </span>
                                      <span className="line-through text-sm text-gray-300 dark:text-white">
                                        {formatNumber(
                                          dayUseRoom.original_price,
                                        )}
                                        원
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
      ) : (
        <NoData
          text={
            data?.length > 0
              ? '검색하신 조건에 맞는 숙소가 없습니다.'
              : '찜 내역이 없습니다.'
          }
          icon={BiHeartCircle}
        />
      )}
    </>
  );
};

export default FavoriteList;
