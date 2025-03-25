import React from 'react';
import DatePicker from './DatePicker';
import useDateSelection from '../../hooks/useDateSelection';

const DateSelector = ({ openDate, setOpenDate, stateType }) => {
  const { date, setDate } = useDateSelection(stateType);

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
      />
    </div>
  );
};

export default DateSelector;
