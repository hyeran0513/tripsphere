import React, { useState } from 'react';
import CitySelector from '../common/CitySelector';
import DateSelector from '../common/DateSelector';
import PeopleSelector from '../common/PeopleSelector';
import SearchButton from './SearchButton';

const Filter = () => {
  const [openDate, setOpenDate] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-950 border border-base-300 p-4 rounded-box">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

          {/* 검색 버튼 */}
          <SearchButton />
        </div>
      </div>
    </div>
  );
};

export default Filter;
