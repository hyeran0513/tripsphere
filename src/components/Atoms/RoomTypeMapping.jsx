import React from 'react';

const roomTypeMapping = {
  single: '싱글룸',
  double: '더블룸',
  suite: '스위트룸',
  family: '패밀리룸',
};

const RoomTypeMapping = ({ type }) => {
  return (
    <div className="badge bg-transparent border border-gray-300 dark:border-indigo-200 text-gray-900 dark:text-indigo-200 text-xs ">
      {roomTypeMapping[type]}
    </div>
  );
};

export default RoomTypeMapping;
