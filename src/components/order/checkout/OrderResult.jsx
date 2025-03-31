import React from 'react';
import { BiHotel, BiUser } from 'react-icons/bi';
import { FaMapLocationDot } from 'react-icons/fa6';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { PiBabyLight } from 'react-icons/pi';
import { formatDate, formatTimeStampTime } from '../../../utils/format';
import KakaoMap from '../../common/KakaoMap';
import RoomTypeMapping from '../../common/RoomTypeMapping';
import ServiceList from '../../common/ServiceList';
import OrderList from './OrderList';

const OrderResult = ({ room, isOpen, toggleContent, reservationInfo }) => {
  console.log(' OrderResult -  reservationInfo: ', reservationInfo);
  console.log(' OrderResult -  room: ', room);
  // 방정보 (단일) - room, 예약정보 (배열) - reservationInfo
  // 방정보에 해당하는 예약정보 불러오기

  const target = reservationInfo.find((ele) => ele.room_id === room.roomId);

  console.log('target : ', target);
  return (
    <div className="border-b border-base-300 mb-4">
      <button
        onClick={toggleContent}
        className="flex justify-between items-center w-full text-left p-4 bg-base-200 rounded-lg">
        <span className="text-sm font-semibold">{room.name}</span>
        <span
          className={`cursor-pointer transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}>
          <IoIosArrowDropdownCircle className="text-stone-500 text-lg" />
        </span>
      </button>

      {isOpen && (
        <div className="mt-2 text-base-content">
          <div>
            <div className="divide-y divide-gray-100">
              {/* 숙소명 */}
              <div className="px-4 py-6 grid grid-cols-2 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm/6 font-medium">숙소명</dt>
                <dd className="mt-1 text-sm/6  sm:col-span-2 sm:mt-0">
                  {room?.accomData?.name}
                </dd>
              </div>

              {/* 객실명 */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm/6 font-medium">객실명</dt>
                <dd className="mt-1 text-sm/6  sm:col-span-2 sm:mt-0 flex items-center gap-2">
                  {room?.name} <RoomTypeMapping type={room?.type} />
                </dd>
              </div>

              {/* 예약 정보 */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm/6 font-medium ">예약 정보</dt>
                <dd className="mt-2 text-sm sm:col-span-2 sm:mt-0">
                  <div
                    role="list"
                    className="divide-y divide-gray-200 rounded-md border border-gray-200">
                    {/* 숙소 위치 */}
                    <OrderList
                      IconComponent={FaMapLocationDot}
                      Title={'숙소 위치'}
                      description={`${room?.accomData?.location?.city}
                                ${room?.accomData?.location?.sub_city}`}
                    />

                    {/* 지도 */}
                    <div className="border-t border-gray-100">
                      <div className="divide-y divide-gray-100">
                        <KakaoMap
                          latitude={room?.accomData?.location?.latitude}
                          longitude={room?.accomData?.location?.longitude}
                        />
                      </div>
                    </div>

                    {/* 숙박 시설 */}
                    <OrderList
                      IconComponent={BiHotel}
                      Title={'숙박 시설'}
                      type={room?.accomData?.type}
                    />

                    <div className="py-4 px-6 flex flex-col gap-3">
                      <span>
                        {target.stayType
                          ? target.stayType === 'stay'
                            ? '숙박'
                            : '대실'
                          : ''}
                      </span>
                      <span>
                        {/* 체크인 · 체크아웃 */}
                        체크인 :{' '}
                        {target.selectedTime
                          ? `${target.selectedTime[0]}`
                          : formatDate(target.checkIn)
                          ? formatTimeStampTime(target.checkIn)
                          : formatTimeStampTime(room?.check_in)}{' '}
                        ~ 체크아웃 :{' '}
                        {target.selectedTime
                          ? `${
                              target.selectedTime[
                                target.selectedTime.length - 1
                              ]
                            }`
                          : formatTimeStampTime(target.checkOut)
                          ? formatTimeStampTime(target.checkOut)
                          : formatTimeStampTime(room?.check_out)}{' '}
                      </span>
                      {/* 인원수 */}
                      <span className="flex items-center gap-1">
                        <BiUser /> 성인 {room?.capacity?.adults || 0}명
                      </span>
                      <span className="flex items-center gap-1">
                        <PiBabyLight /> 미성년자 {room?.capacity?.children || 0}
                        명
                      </span>
                    </div>
                  </div>
                </dd>
              </div>

              {/* 호스트 연락처 */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm/6 font-medium">호스트 연락처</dt>
                <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0">
                  {room?.accomData?.host?.contact}
                </dd>
              </div>

              {/* 객실 소개 */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm/6 font-medium ">객실 소개</dt>
                <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0">
                  {room?.description}
                </dd>
              </div>

              {/* 서비스 */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm/6 font-medium">서비스</dt>
                <dd className="mt-2 text-sm sm:col-span-2 sm:mt-0">
                  {room?.services && <ServiceList services={room?.services} />}
                </dd>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderResult;
