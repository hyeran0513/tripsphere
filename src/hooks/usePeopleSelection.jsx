import { useState, useCallback, useEffect } from 'react';
import useFilterStore from '../stores/useFilterStore';
import useReservationStore from '../stores/useReservationStore';

const usePeopleSelection = (stateType, capacity, setAdults, setChildren) => {
  const [localAdultCount, setLocalAdultCount] = useState(0);
  const [localChildrenCount, setLocalChildrenCount] = useState(0);
  const [people, setPeople] = useState(0);

  // 메인페이지의 필터 영역 store
  const filterStore = useFilterStore();
  // 상품 상세 페이지의 예약 정보 폼 영역 store
  const reservationStore = useReservationStore();

  const selectedState =
    stateType === 'filter'
      ? {
          adultCount: filterStore.adultCount,
          setAdultCount: filterStore.setAdultCount,
          childrenCount: filterStore.childrenCount,
          setChildrenCount: filterStore.setChildrenCount,
        }
      : stateType === 'reservation'
        ? {
            adultCount: reservationStore.adultCount,
            setAdultCount: reservationStore.setAdultCount,
            childrenCount: reservationStore.childrenCount,
            setChildrenCount: reservationStore.setChildrenCount,
          }
        : {
            adultCount: localAdultCount,
            setAdultCount: setLocalAdultCount,
            childrenCount: localChildrenCount,
            setChildrenCount: setLocalChildrenCount,
          };

  const { adultCount, setAdultCount, childrenCount, setChildrenCount } =
    selectedState;

  // 총 인원 수 계산
  useEffect(() => {
    setPeople(adultCount + childrenCount);
  }, [adultCount, childrenCount]);

  // reservation 상태인 경우, setAdults 함수 호출
  useEffect(() => {
    if (stateType === 'reservation' && setAdults) {
      setAdults(adultCount);
    }
  }, [adultCount, stateType, setAdults]);

  // reservation 상태인 경우, setChildren 함수 호출
  useEffect(() => {
    console.log('타나?' + childrenCount);
    console.log(setChildren);
    console.log(stateType);
    if (stateType === 'reservation' && setChildren) {
      console.log('타dy?' + childrenCount);
      setChildren(childrenCount);
    }
  }, [childrenCount, stateType, setChildren]);

  // 인원 수 변경 핸들러
  const handlePeopleCount = useCallback(
    (type, count) => {
      const maxAdults = capacity?.adults ?? Infinity;
      const maxChildren = capacity?.children ?? Infinity;

      if (type === 'adultCount' && count <= maxAdults) {
        setAdultCount(count);
      } else if (type === 'childrenCount' && count <= maxChildren) {
        setChildrenCount(count);
      }
    },
    [capacity, setAdultCount, setChildrenCount],
  );

  return {
    adultCount,
    childrenCount,
    people,
    handlePeopleCount,
  };
};

export default usePeopleSelection;
