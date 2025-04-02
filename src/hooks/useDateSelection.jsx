import { useState, useEffect } from 'react';
import useFilterStore from '../stores/useFilterStore';
import useReservationStore from '../stores/useReservationStore';

const useDateSelection = (stateType) => {
  const [localCheckIn, setLocalCheckIn] = useState();
  const [localCheckOut, setLocalCheckOut] = useState();
  const filterStore = useFilterStore();
  const reservationStore = useReservationStore();

  const initialDate = (() => {
    if (stateType === 'filter') {
      return {
        startDate: filterStore.checkIn
          ? new Date(filterStore.checkIn)
          : new Date(),
        endDate: filterStore.checkOut
          ? new Date(filterStore.checkOut)
          : new Date(),
        key: 'selection',
      };
    } else if (stateType === 'reservation') {
      return {
        startDate: reservationStore.checkIn
          ? new Date(reservationStore.checkIn)
          : new Date(),
        endDate: reservationStore.checkOut
          ? new Date(reservationStore.checkOut)
          : new Date(),
        key: 'selection',
      };
    } else {
      return {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      };
    }
  })();

  const [date, setDate] = useState(initialDate);

  const selectedState =
    stateType === 'filter'
      ? {
          setCheckIn: filterStore.setCheckIn,
          setCheckOut: filterStore.setCheckOut,
        }
      : stateType === 'reservation'
        ? {
            setCheckIn: reservationStore.setCheckIn,
            setCheckOut: reservationStore.setCheckOut,
          }
        : {
            setCheckIn: setLocalCheckIn,
            setCheckOut: setLocalCheckOut,
          };

  const { setCheckIn, setCheckOut } = selectedState;

  // 날짜 선택 시 상태 저장
  useEffect(() => {
    if (date.startDate && date.endDate) {
      setCheckIn(date.startDate.toLocaleDateString());
      setCheckOut(date.endDate.toLocaleDateString());
    }
  }, [date, setCheckIn, setCheckOut]);

  return {
    date,
    setDate,
  };
};

export default useDateSelection;
