import React from 'react';
import useExampleData from '../hooks/useAccomDummyData';
import { useAddCityData } from '../hooks/useCityData';

const Dummy = () => {
  const { loading, error, fetchData } = useExampleData();
  const { mutate } = useAddCityData();

  const handleAddCities = async () => {
    await mutate();
    alert('도시 데이터가 추가되었습니다.');
  };

  if (error) return <>오류: {error.message}</>;

  return (
    <>
      <h3 className="font-bold text-2xl mb-4">도시 데이터</h3>
      <button
        className="text-base font-medium flex-1 border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden rounded cursor-pointer"
        onClick={handleAddCities}>
        도시 데이터 추가
      </button>

      <br />

      <h3 className="font-bold text-2xl mb-4">숙소 데이터 불러오기</h3>
      <button
        className="text-base font-medium flex-1 border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden rounded cursor-pointer"
        onClick={fetchData}
        disabled={loading}>
        {loading ? '로딩 중...' : '숙소 데이터 불러오기'}
      </button>
    </>
  );
};

export default Dummy;
