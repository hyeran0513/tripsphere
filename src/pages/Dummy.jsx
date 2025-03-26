import React from 'react';
import useExampleData from '../hooks/useAccomDummyData';

const Dummy = () => {
  const { loading, error, fetchData } = useExampleData();

  if (error) return <>오류: {error.message}</>;

  return (
    <>
      <h1 className="font-bold text-2xl mb-4">숙소 데이터</h1>

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
