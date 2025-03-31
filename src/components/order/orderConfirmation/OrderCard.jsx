import React, { useEffect } from 'react';
import {
  BiBuildings,
  BiCalendarAlt,
  BiChevronRight,
  BiUser,
} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useRoomData } from '../../../hooks/useProductData';
import { formatDate, formatTimeStampTime } from '../../../utils/format';
import { PiBabyLight } from 'react-icons/pi';

const OrderCard = ({ data, index }) => {
  const navigate = useNavigate();

  console.log('OrderCard  - data : ', data);
  const { data: roomData, isLoading, isError } = useRoomData([data.room_id]);

  // 방 데이터가 로딩될 때마다 로그를 찍어주는 useEffect
  useEffect(() => {
    console.log('roomData : ', roomData);
  }, [roomData]);

  let room;
  useEffect(() => {
    console.log(' isLoading, isError : ', isLoading, isError);
  }, [isLoading, isError]);

  // 에러가 있을 경우 에러 메시지 반환
  if (isError) {
    return <>{isError.message}</>;
  }

  // roomData가 없으면 렌더링하지 않도록 방어 처리
  if (!roomData) {
    console.log('roomData 없음!', roomData);
    return null; // roomData가 없으면 아무 것도 렌더링하지 않음
  } else {
    console.log('roomData ! : ', roomData);
    console.log('roomData.flat() ! : ', roomData.flat());
    room = roomData[0];
    console.log('room : ', room);
  }

  return (
    <div
      key={index}
      className="list-row flex-col flex my-3 mx-5 border-gray-200 w-full">
      <div className="pb-4 border-b border-stone-200 flex justify-between items-center">
        <div>{formatDate(data.order_date)}</div>
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => navigate(`/product/${room?.accommodation_id}`)}>
          <BiChevronRight className="size-6" />
        </button>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-6 pt-6">
          <img
            className="size-24 rounded-box"
            src={room?.images?.[0] || 'https://via.placeholder.com/100'}
            alt={roomData?.flat().accomData?.name || '숙소 정보 없음'}
          />
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">
              {room?.accomData.name || '숙소 정보 없음'}
              <p className="flex items-center gap-1 text-gray-500 text-xs">
                <BiBuildings />
                {room?.accomData.name}
              </p>
            </h2>
            <div className="text-xs uppercase opacity-60 pt-1">
              예약번호 : {data.id}
            </div>

            <div className="mt-4">
              <p className="flex justify-between items-center font-semibold">
                {room.stay_type
                  ? room.stay_type === 'stay'
                    ? '숙박'
                    : '대실'
                  : ''}
              </p>

              <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-white">
                <BiCalendarAlt />
                {formatDate(room?.check_in)}
                {room?.stay_type === 'stay' &&
                  ` - ${formatDate(room?.check_out)}`}
              </div>

              {/* 체크인 · 체크아웃 */}
              <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-white">
                {room.stay_type === 'stay' && (
                  <>
                    체크인: {formatTimeStampTime(room.check_in)} ~ 체크아웃:{' '}
                    {formatTimeStampTime(room.check_out)}
                  </>
                )}

                {room.stay_type === 'day_use' && (
                  <>
                    체크인: {data.selectedTime[0]} ~ 체크아웃:{' '}
                    {data.selectedTime[data.selectedTime.length - 1]}
                  </>
                )}
              </div>

              {/* 인원 정보 */}
              <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-white">
                <span className="flex items-center gap-1">
                  <BiUser />
                  성인 {room.capacity?.adults ?? 0}명
                </span>
                <span className="flex items-center gap-1">
                  <PiBabyLight /> 미성년자 {room.capacity.children ?? 0}명
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
