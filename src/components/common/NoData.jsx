import React from 'react';

const NoData = ({ text, icon: Icon }) => {
  return (
    <div className="flex flex-col gap-2 items-center border border-gray-300 border-dashed rounded-md py-8">
      {/* 노데이터 아이콘 */}
      {Icon && <Icon className="text-gray-500 text-3xl" />}

      {/* 노데이터 문구 */}
      <p className="text-gray-500 text-md">{text}</p>
    </div>
  );
};

export default NoData;
