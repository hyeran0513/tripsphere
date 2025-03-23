import React from 'react';

const NoData = ({ text, icon: Icon }) => {
  return (
    <div className="flex flex-col gap-2 items-center border border-gray-300 border-dashed rounded-md py-8">
      {Icon && <Icon className="text-gray-500 text-3xl" />}
      <p className="text-gray-500 text-md">{text}</p>
    </div>
  );
};

export default NoData;
