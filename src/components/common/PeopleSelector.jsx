import React, { useState, useEffect } from 'react';
import Counter from './Counter';
import useFilterStore from '../../stores/useFilterStore';
import useReservationStore from '../../stores/useReservationStore';

const PeopleSelector = ({ stateType, setAdults, capacity }) => {
  const filterStore = useFilterStore();
  const reservationStore = useReservationStore();
  const [localAdultCount, setLocalAdultCount] = useState(0);
  const [localChildrenCount, setLocalChildrenCount] = useState(0);
  const [people, setPeople] = useState(0);
  let selectedState;

  if (stateType === 'filter') {
    selectedState = {
      adultCount: filterStore.adultCount,
      setAdultCount: filterStore.setAdultCount,
      childrenCount: filterStore.childrenCount,
      setChildrenCount: filterStore.setChildrenCount,
    };
  } else if (stateType === 'reservation') {
    selectedState = {
      adultCount: reservationStore.adultCount,
      setAdultCount: reservationStore.setAdultCount,
      childrenCount: reservationStore.childrenCount,
      setChildrenCount: reservationStore.setChildrenCount,
    };
  } else {
    selectedState = {
      adultCount: localAdultCount,
      setAdultCount: setLocalAdultCount,
      childrenCount: localChildrenCount,
      setChildrenCount: setLocalChildrenCount,
    };
  }

  const { adultCount, setAdultCount, childrenCount, setChildrenCount } =
    selectedState;

  useEffect(() => {
    if (stateType === 'reservation') {
      setAdults(adultCount);
    }
  }, [adultCount]);

  useEffect(() => {
    setPeople(adultCount + childrenCount);
  }, [adultCount, childrenCount]);

  const handlePeopleCount = (type, count) => {
    const maxAdults = capacity?.adults ?? Infinity;
    const maxChildren = capacity?.children ?? Infinity;

    if (type === 'adultCount' && count <= maxAdults) {
      setAdultCount(count);
    } else if (type === 'childrenCount' && count <= maxChildren) {
      setChildrenCount(count);
    }
  };

  return (
    <div className="w-full">
      <label
        htmlFor="peopleCount"
        className="mb-2 block text-sm font-medium text-gray-700 text-left dark:text-gray-200">
        인원수
      </label>
      <div className="dropdown w-full">
        <input
          tabIndex={1}
          role="button"
          className="input bg-base-200 w-full dark:border-gray-200"
          placeholder="인원수"
          value={`총 인원 ${people}`}
          readOnly
        />
        <div
          tabIndex={1}
          className="dropdown-content card card-sm bg-base-100 z-1 w-64 shadow-md">
          <div className="card-body">
            <Counter
              type="adultCount"
              label="성인"
              handlePeopleCount={handlePeopleCount}
              count={adultCount}
              maxCount={capacity?.adults ?? Infinity}
            />

            <Counter
              type="childrenCount"
              label="미성년자"
              handlePeopleCount={handlePeopleCount}
              count={childrenCount}
              maxCount={capacity?.children ?? Infinity}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleSelector;
