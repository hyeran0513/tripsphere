import React, { useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';

const SideFilter = ({ onSearch }) => {
  const [isFormOpen, setIsFormOpen] = useState(true);

  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };

  const [localFilters, setLocalFilters] = useState({
    type: '전체',
    stay_type: '전체',
    city: '전체',
    sub_city: '전체',
    checkIn: '',
    checkOut: '',
    adults: 0,
    children: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedValue =
      name === 'adults' || name === 'children' ? parseInt(value, 10) : value;

    setLocalFilters((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const handleSearch = () => {
    onSearch(localFilters);
  };

  return (
    <aside
      aria-label="숙소 검색 옵션"
      className={`sidebar z-10 sticky top-5 ${isFormOpen ? 'w-[30%]' : 'w-0'}`}>
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
          className={`border border-gray-200 px-0.5 py-2 ${
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
        <form
          aria-label="검색 옵션 변경창"
          className="flex flex-col gap-y-5 p-2.5">
          {/* 여행 장소 선택 */}
          <fieldset className="rounded-lg border border-gray-200 p-3">
            <legend className="fieldset-legend px-2 font-medium">
              여행 장소
            </legend>

            <input
              type="text"
              name="city"
              placeholder="도시"
              value={localFilters.city}
              onChange={handleChange}
            />
            <input
              type="text"
              name="sub_city"
              placeholder="지역"
              value={localFilters.sub_city}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset className="fieldset border border-base-300 p-4 rounded-box dark:border-white">
            <legend className="fieldset-legend px-2 font-medium">일정</legend>
            {/* 체크인 · 체크아웃 */}
            <input
              type="date"
              name="checkIn"
              value={localFilters.checkIn}
              onChange={handleChange}
            />
            <input
              type="date"
              name="checkOut"
              value={localFilters.checkOut}
              onChange={handleChange}
            />

            {/* 인원수 */}
            <input
              type="number"
              name="adults"
              value={localFilters.adults}
              onChange={handleChange}
            />
            <input
              type="number"
              name="children"
              value={localFilters.children}
              onChange={handleChange}
            />
          </fieldset>

          <button
            aria-label="수정한 검색 옵션 적용"
            type="button"
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            옵션 수정 적용
          </button>
        </form>
      )}
    </aside>
  );
};

export default SideFilter;
