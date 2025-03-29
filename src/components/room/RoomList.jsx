import React from 'react';
import { BiUser } from 'react-icons/bi';
import RoomCard from './RoomCard';
import { PiBabyLight } from 'react-icons/pi';
import RoomTypeMapping from '../common/RoomTypeMapping';

const RoomList = ({ rooms }) => {
  const roomsGroupedById = rooms?.length
    ? rooms.reduce((acc, room) => {
        if (room.stock > 0) {
          if (!acc[room.room_group_id]) {
            acc[room.room_group_id] = {
              room_group_id: room.room_group_id,
              name: room.name,
              type: room.type,
              images: room.images || [],
              capacity: room.capacity,
              rooms: [],
            };
          }
          acc[room.room_group_id].rooms.push(room);
        }
        return acc;
      }, {})
    : {};

  return (
    <div className="flex-1 divide-y divide-gray-200">
      {Object.values(roomsGroupedById)?.map((roomGroup, index) => (
        <div
          key={roomGroup.room_group_id}
          className={`flex gap-6 ${index === 0 ? 'pt-0' : 'pt-[40px]'} ${index === roomGroup.length - 1 ? 'pb-0' : 'pb-[40px]'}`}>
          <h3 className="w-[40%]">
            <div className="overflow-hidden rounded-lg">
              {roomGroup.images && roomGroup.images.length > 0 ? (
                <img
                  src={roomGroup.images[0]}
                  alt="Room"
                />
              ) : (
                <div className="text-gray-400">이미지 없습니다</div>
              )}
            </div>

            <div className="flex flex-col gap-1 mt-4 text-base/7 font-semibold text-gray-800 dark:text-white">
              <RoomTypeMapping type={roomGroup.type} /> {roomGroup.name}
            </div>
            <div className="flex items-center gap-3 mt-1 max-w-2xl text-sm text-gray-500">
              <div className="flex items-center gap-1 dark:text-white">
                <BiUser /> 성인 {roomGroup.capacity.adults}
              </div>
              <div className="flex items-center gap-1 dark:text-white">
                <PiBabyLight /> 미성년자 {roomGroup.capacity.children}
              </div>
            </div>

            {/* <div className="space-x-2 my-4">
              {roomGroup.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`room_${roomGroup.room_group_id}_${idx}`}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              ))}
            </div> */}
          </h3>

          <div className="flex-1">
            <div className="border border-gray-200 rounded-md">
              {roomGroup?.rooms?.map((room, index) => (
                <RoomCard
                  room={room}
                  index={index}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomList;
