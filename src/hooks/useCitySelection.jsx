import { useState, useCallback } from 'react';

const useCitySelection = (isGlobal, store) => {
  const [localCity, setLocalCity] = useState('');
  const [localSubCity, setLocalSubCity] = useState('');
  const [subCities, setSubCities] = useState([]);

  const selectedCity = isGlobal ? store.selectedCity : localCity;
  const selectedSubCity = isGlobal ? store.selectedSubCity : localSubCity;

  // 대분류 선택 핸들러
  const setSelectedCity = useCallback(
    (city) => {
      isGlobal ? store.setSelectedCity(city) : setLocalCity(city);
    },
    [isGlobal, store],
  );

  // 소분류 선택 핸들러
  const setSelectedSubCity = useCallback(
    (subCity) => {
      isGlobal ? store.setSelectedSubCity(subCity) : setLocalSubCity(subCity);
    },
    [isGlobal, store],
  );

  return {
    selectedCity,
    setSelectedCity,
    selectedSubCity,
    setSelectedSubCity,
    subCities,
    setSubCities,
  };
};

export default useCitySelection;
