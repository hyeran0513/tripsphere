import React, { useCallback, useMemo, useRef } from 'react';
import { cities } from '../data/cities';
import useFilterStore from '../../stores/useFilterStore';
import useCitySelection from '../../hooks/useCitySelection';

const CitySelector = React.memo(({ isGlobal }) => {
  const store = useFilterStore();
  const {
    selectedCity,
    setSelectedCity,
    selectedSubCity,
    setSelectedSubCity,
    subCities,
    setSubCities,
  } = useCitySelection(isGlobal, store);
  const subCityRef = useRef();

  // 대분류 선택 핸들러
  const handleCitySelect = useCallback(
    (event) => {
      const city = event.target.value;
      setSelectedCity(city);

      if (city === '전체') {
        setSubCities([]);
        setSelectedSubCity('전체');
        subCityRef.current.disabled = true;
      } else {
        const selected = cities.find((item) => item.name === city);
        const newSubCities = selected ? selected.subCities : [];
        setSubCities(newSubCities);
        setSelectedSubCity('전체');
        subCityRef.current.disabled = false;
      }
    },
    [setSelectedCity, setSubCities, setSelectedSubCity],
  );

  // 소분류 선택 핸들러
  const handleSubCitySelect = useCallback(
    (event) => {
      setSelectedSubCity(event.target.value);
    },
    [setSelectedSubCity],
  );

  // 대분류 옵션
  const cityOptions = useMemo(
    () =>
      cities.map((item) => (
        <option
          key={item.name}
          value={item.name}>
          {item.name}
        </option>
      )),
    [],
  );

  // 소분류 옵션
  const subCityOptions = useMemo(
    () =>
      subCities.map((item) => (
        <option
          key={item}
          value={item}>
          {item}
        </option>
      )),
    [subCities],
  );

  return (
    <div className="w-full">
      {/* 라벨 영역 */}
      <label
        htmlFor="city"
        className="mb-1 block text-xs font-medium text-gray-700 text-left dark:text-gray-200">
        지역
      </label>

      <div className="flex gap-2">
        {/* 대분류 선택 */}
        <div className="w-full">
          <select
            id="city"
            className="input bg-base-200 w-full dark:border-gray-200 dark:placeholder:text-gray-200"
            value={selectedCity}
            onChange={handleCitySelect}>
            <option
              value=""
              disabled>
              대분류 선택
            </option>
            {cityOptions}
          </select>
        </div>

        {/* 소분류 선택 */}
        <div className="w-full">
          <select
            id="subCity"
            ref={subCityRef}
            className="input bg-base-200 w-full dark:border-gray-200 dark:placeholder:text-gray-200"
            value={selectedSubCity}
            onChange={handleSubCitySelect}>
            <option value="">소분류 선택</option>
            {subCityOptions}
          </select>
        </div>
      </div>
    </div>
  );
});

export default CitySelector;
