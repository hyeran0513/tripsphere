import React, { useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import CitySelector from '../common/CitySelector';
import DateSelector from '../common/DateSelector';
import PeopleSelector from '../common/PeopleSelector';

const SideFilter = ({ handleSearch }) => {
  const [openDate, setOpenDate] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(true);

  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };

  return (
    <aside
      aria-label="숙소 검색 옵션"
      className={`sidebar z-10 sticky top-[100px] ${isFormOpen ? 'w-[30%]' : 'w-0'}`}>
      <div className="flex mb-4 items-center justify-between">
        {isFormOpen && (
          <div className="pl-3 font-extrabold">검색 옵션 영역</div>
        )}
        <button
          type="button"
          onClick={toggleForm}
          aria-label={
            isFormOpen ? '숙소 검색 옵션 닫기' : '숙소 검색 옵션 열기'
          }
          className={`cursor-pointer border border-gray-200 px-0.5 py-2 ${
            isFormOpen ? 'rounded-l-md' : 'rounded-r-md'
          }`}>
          <BiChevronLeft
            className={`transition-transform duration-300 ${
              !isFormOpen ? 'rotate-180' : ''
            } size-6`}
          />
        </button>
      </div>

      {isFormOpen && (
        <form className="flex flex-col gap-y-5 p-2.5">
          {/* 여행 장소 선택 */}
          <fieldset className="fieldset border border-base-300 p-4 rounded-box dark:border-white">
            <legend className="fieldset-legend px-2 font-medium">
              여행 장소
            </legend>

            <CitySelector isGlobal={true} />
          </fieldset>

          <fieldset className="fieldset border border-base-300 p-4 rounded-box dark:border-white">
            <legend className="fieldset-legend px-2 font-medium">일정</legend>
            {/* 체크인 · 체크아웃 */}
            <DateSelector
              stateType="filter"
              openDate={openDate}
              setOpenDate={setOpenDate}
            />

            {/* 인원수 */}
            <PeopleSelector stateType="filter" />
          </fieldset>

          <button
            type="button"
            onClick={handleSearch}
            className="cursor-pointer flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            옵션 수정 적용
          </button>
        </form>
      )}
    </aside>
  );
};

export default SideFilter;
