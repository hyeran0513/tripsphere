import React, { useState } from 'react';
import Counter from './Counter';
import usePeopleSelection from '../../hooks/usePeopleSelection';

const PeopleSelector = ({ stateType, setAdults, capacity }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { adultCount, childrenCount, people, handlePeopleCount } =
    usePeopleSelection(stateType, capacity, setAdults);

  return (
    <div className="w-full">
      {/* 라벨 영역 */}
      <label
        htmlFor="peopleCount"
        className="mb-1 block text-xs font-medium text-gray-700 text-left dark:text-gray-200">
        인원수
      </label>

      {/* 드롭다운 영역 */}
      <div className="dropdown w-full">
        {/* 인원수 input */}
        <input
          role="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="input bg-base-200 w-full dark:border-gray-200"
          placeholder="인원수"
          value={`총 인원 ${people}`}
          readOnly
        />

        {/* 드롭다운 모달 */}
        {isOpen && (
          <div className="dropdown-content card card-sm bg-base-100 z-1 w-64 shadow-md">
            <div className="card-body">
              {/* 성인 카운트 */}
              <Counter
                type="adultCount"
                label="성인"
                handlePeopleCount={handlePeopleCount}
                count={adultCount}
                maxCount={capacity?.adults ?? Infinity}
              />

              {/* 미성년자 카운트 */}
              <Counter
                type="childrenCount"
                label="미성년자"
                handlePeopleCount={handlePeopleCount}
                count={childrenCount}
                maxCount={capacity?.children ?? Infinity}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeopleSelector;
