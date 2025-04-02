import React, { useEffect, useState } from 'react';
import CitySelector from './CitySelector';
import DateSelector from './DateSelector';
import PeopleSelector from './PeopleSelector';
import SearchButton from '../Atoms/SearchButton';
import { useLocation } from 'react-router-dom';
import useFilterStore from '../../stores/useFilterStore';

const Filter = () => {
  const [openDate, setOpenDate] = useState(false);
  const location = useLocation();
  const resetFilter = useFilterStore((state) => state.resetFilter);

  // 필터 초기화
  useEffect(() => {
    resetFilter();
  }, [location]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 bg-white dark:bg-gray-950 border border-base-300 p-4 pl-10 rounded-full">
        <div className="grid grid-cols-3 gap-4">
          {/* 지역 선택 */}
          <CitySelector isGlobal={true} />

          {/* 체크인 · 체크아웃 */}
          <DateSelector
            stateType="filter"
            openDate={openDate}
            setOpenDate={setOpenDate}
          />

          {/* 인원수 */}
          <PeopleSelector stateType="filter" />
        </div>

        {/* 검색 버튼 */}
        <SearchButton />
      </div>
    </div>
  );
};

export default Filter;
