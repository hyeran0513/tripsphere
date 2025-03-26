import React from 'react';
import DatePicker from './DatePicker';
import useDateSelection from '../../hooks/useDateSelection';
import { getDatesInRange, convertToDate } from '../../utils/format';

const DateSelector = ({ openDate, setOpenDate, stateType, bookedDates }) => {
  const { date, setDate } = useDateSelection(stateType);

  // 비활성화할 날짜들 (예약된 날짜들)
  const disabledDates =
    bookedDates && bookedDates.length > 0
      ? bookedDates
          .map((date) =>
            getDatesInRange(
              convertToDate(date.check_in),
              convertToDate(date.check_out),
            ),
          )
          .flat()
      : [];

  return (
    <div className="w-full">
      <label
        htmlFor="checkinout"
        className="mb-1 block text-xs font-medium text-gray-700 text-left dark:text-gray-200">
        체크인 · 체크아웃
      </label>

      <DatePicker
        openDate={openDate}
        setOpenDate={setOpenDate}
        date={date}
        setDate={setDate}
        disabledDates={disabledDates}
      />
    </div>
  );
};

export default DateSelector;
