import { useEffect, useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import DateSelector from '../../common/DateSelector';
import PeopleSelector from '../../common/PeopleSelector';
import { formatDateWithHyphen } from '../../../utils/format';
import { useLocation } from 'react-router-dom';
import useReservationStore from '../../../stores/useReservationStore';

const SearchForm = ({
  openDate,
  setOpenDate,
  adults,
  setAdults,
  product,
  children,
  setChildren,
  datePickerDate,
  setDatePickerDate,
  setFilters,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(true);
  const location = useLocation();
  const resetReservation = useReservationStore(
    (state) => state.resetReservation,
  );

  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };

  // 필터 초기화
  useEffect(() => {
    resetReservation();
  }, [location]);

  // 검색 핸들러
  const handleSearch = (e) => {
    e.preventDefault();

    setFilters({
      checkIn: formatDateWithHyphen(datePickerDate.startDate),
      checkOut: formatDateWithHyphen(datePickerDate.endDate),
      adults,
      children,
    });
  };

  return (
    <aside
      aria-label="숙소 검색 옵션 변경하기"
      className={`sidebar z-10 sticky top-[124px] transition-width duration-300 ${isFormOpen ? 'w-[30%]' : 'w-0'}`}>
      <div className="flex mb-4 items-center justify-between">
        {isFormOpen && (
          <div className="text-base/7 font-semibold text-gray-900 dark:text-white">
            검색 옵션
          </div>
        )}
        <button
          type="button"
          onClick={toggleForm}
          aria-label={
            isFormOpen ? '숙소 검색 옵션 열림' : '숙소 검색 옵션 닫힘'
          }
          className={`border border-gray-200 px-0.5 py-2 ${isFormOpen ? 'rounded-l-md' : 'rounded-r-md'}`}>
          <BiChevronRight
            className={`transition-transform duration-300 ${!isFormOpen ? 'rotate-180' : ''} size-6`}
          />
        </button>
      </div>

      {isFormOpen && (
        <form
          aria-label="검색 옵션 변경창"
          className="flex flex-col gap-y-5 p-2.5">
          <fieldset className="flex flex-col gap-4 fieldset border border-base-300 p-4 rounded-box dark:border-white">
            {/* 체크인 · 체크아웃 */}
            <DateSelector
              stateType="reservation"
              openDate={openDate}
              setOpenDate={setOpenDate}
              setDatePickerDate={setDatePickerDate}
              datePickerDate={datePickerDate}
              bookedDates={product?.booked_dates}
            />

            {/* 인원수 */}
            <PeopleSelector
              setAdults={setAdults}
              setChildren={setChildren}
              stateType="reservation"
              capacity={product?.capacity}
            />
          </fieldset>

          <button
            aria-label="검색"
            type="button"
            onClick={(e) => handleSearch(e)}
            className="cursor-pointer flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            검색
          </button>
        </form>
      )}
    </aside>
  );
};

export default SearchForm;
