import React from 'react';
import Filter from '../components/filter/Filter';

const Home = () => {
  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col justify-center px-6 py-12 lg:px-8 bg-[url(/banner.jpg)]">
      <div className="mx-auto max-w-[1000px]">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="bg-black/20 rounded-full px-3 py-1 text-sm text-gray-100 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            TRIPSPHERE와 함께하는 특별한 여행
          </div>
        </div>

        <div className="text-center">
          <p className="text-4xl font-semibold tracking-tight text-white ">
            TRIPSPHERE와 함께 꿈의 여행을 떠나세요
          </p>

          <Filter />
        </div>
      </div>
    </div>
  );
};

export default Home;
