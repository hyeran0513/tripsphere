import React, { useEffect, useState } from 'react';
import DatePicker from './DatePicker';
import useFilterStore from '../../stores/useFilterStore';
import useReservationStore from '../../stores/useReservationStore';

const DateSelector = ({ openDate, setOpenDate, stateType }) => {
  const filterStore = useFilterStore();
  const reservationStore = useReservationStore();
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const [localCheckIn, setLocalCheckIn] = useState();
  const [localCheckOut, setLocalCheckOut] = useState();

  let selectedState;

  if (stateType === 'filter') {
    selectedState = {
      setCheckIn: filterStore.setCheckIn,
      setCheckOut: filterStore.setCheckOut,
    };
  } else if (stateType === 'reservation') {
    selectedState = {
      setCheckIn: reservationStore.setCheckIn,
      setCheckOut: reservationStore.setCheckOut,
    };
  } else {
    selectedState = {
      setCheckIn: setLocalCheckIn,
      setCheckOut: setLocalCheckOut,
    };
  }

  const { setCheckIn, setCheckOut } = selectedState;

  useEffect(() => {
    if (date.startDate && date.endDate) {
      setCheckIn(date.startDate.toLocaleDateString());
      setCheckOut(date.endDate.toLocaleDateString());
    }
  }, [date]);

  return (
    <div className="w-full">
      <label
        htmlFor="checkinout"
        className="mb-2 block text-sm font-medium text-gray-700 text-left dark:text-gray-200">
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
