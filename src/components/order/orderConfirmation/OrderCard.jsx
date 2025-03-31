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
      className="list-row flex-col flex my-3 mx-5 border-gray-200">
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

            {/* 인원 정보 */}
            <div className="flex items-center gap-2 mt-2">
              <BiUser />
              <div className="mr-1 text-sm">
                성인: {room?.capacity?.adults ?? 0}명, 미성년자:{' '}
                {room?.capacity?.children ?? 0}명
              </div>
            </div>

            {/* 체크인/체크아웃 날짜 */}
            <div className="flex items-center gap-10 mt-2">
              <div className="flex items-center gap-2">
                <BiCalendarAlt />
                <span className="font-bold">체크인:</span>{' '}
                <span>
                  {room.check_in
                    ? room.stay_type === 'stay'
                      ? formatDate(room?.check_in)
                      : formatTimeStampTime(room?.check_in)
                    : '날짜 없음'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BiCalendarAlt />
                <span className="font-bold">체크아웃:</span>{' '}
                <span>
                  {room.check_out
                    ? room.stay_type === 'stay'
                      ? formatDate(room?.check_out)
                      : formatTimeStampTime(room?.check_out)
                    : '날짜 없음'}
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
