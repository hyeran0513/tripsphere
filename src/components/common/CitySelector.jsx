import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { cities } from '../data/cities';
import useFilterStore from '../../stores/useFilterStore';
import useCitySelection from '../../hooks/useCitySelection';

const CitySelector = ({ isGlobal }) => {
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

      if (city === '') {
        setSubCities([]);
        setSelectedSubCity('');
        subCityRef.current.disabled = true;
      } else {
        const selected = cities.find((item) => item.name === city);
        const newSubCities = selected ? selected.subCities : [];
        setSubCities(newSubCities);
        setSelectedSubCity('');
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

  // 초기화 및 소도시 설정
  useEffect(() => {
    if (selectedCity) {
      const selected = cities.find((item) => item.name === selectedCity);
      const newSubCities = selected ? selected.subCities : [];

      if (JSON.stringify(subCities) !== JSON.stringify(newSubCities)) {
        setSubCities(newSubCities);
      }

      // 선택된 소도시가 해당 대도시에 포함되지 않으면 전체로 초기화
      if (newSubCities && !newSubCities.includes(selectedSubCity)) {
        if (selectedSubCity !== '') {
          setSelectedSubCity('');
        }
      }

      subCityRef.current.disabled = newSubCities.length === 0;
    }
  }, [
    selectedCity,
    selectedSubCity,
    subCities,
    setSubCities,
    setSelectedSubCity,
  ]);

  /* 대도시와 소도시 설정된 값이 있을 때
  대도시를 기준으로 소도시 목록을 업데이트 */
  useEffect(() => {
    if (selectedCity) {
      const selected = cities.find((item) => item.name === selectedCity);
      const newSubCities = selected ? selected.subCities : [];
      setSubCities(newSubCities);
    }
  }, [selectedCity, setSubCities]);

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
            className="select bg-base-200 w-full dark:border-gray-200 dark:placeholder:text-gray-200"
            value={selectedCity}
            onChange={handleCitySelect}>
            <option value="">전체</option>
            {cityOptions}
          </select>
        </div>

        {/* 소분류 선택 */}
        <div className="w-full">
          <select
            id="subCity"
            ref={subCityRef}
            className="select bg-base-200 w-full dark:border-gray-200 dark:placeholder:text-gray-200"
            value={selectedSubCity}
            onChange={handleSubCitySelect}
            disabled={selectedCity === ''}>
            <option value="">전체</option>
            {subCityOptions}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CitySelector;
