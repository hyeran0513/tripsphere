import React from 'react';

const typeMapping = {
  hotel: '호텔',
  motel: '모텔',
  resort: '리조트',
  pension: '펜션',
  guesthouse: '게스트하우스',
  camping: '캠핑',
};

const TypeMapping = ({ type }) => {
  return (
    <div className="badge bg-transparent border border-gray-300 dark:border-indigo-200 text-gray-900 dark:text-indigo-200 text-xs">
      {typeMapping[type]}
    </div>
  );
};

export default TypeMapping;
