import React, { useState } from 'react';
import { cities } from '../data/cities';
import useFilterStore from '../../stores/useFilterStore';

const CitySelector = ({ isGlobal }) => {
  const store = useFilterStore();
  const [subCities, setSubCities] = useState([]);
  const [localCity, setLocalCity] = useState('');
  const [localSubCity, setLocalSubCity] = useState('');

  const selectedState = isGlobal
    ? {
        selectedCity: store.selectedCity,
        setSelectedCity: store.setSelectedCity,
        selectedSubCity: store.selectedSubCity,
        setSelectedSubCity: store.setSelectedSubCity,
      }
    : {
        selectedCity: localCity,
        setSelectedCity: setLocalCity,
        selectedSubCity: localSubCity,
        setSelectedSubCity: setLocalSubCity,
      };

  const { selectedCity, setSelectedCity, selectedSubCity, setSelectedSubCity } =
    selectedState;

  // 지역 선택 핸들러
  const handleCitySelect = (event) => {
    const city = event.target.value;
    setSelectedCity(city);

    if (city === '전체') {
      setSubCities([]);
      setSelectedSubCity('전체');
    } else {
      const selectedCity = cities.find((item) => item.name === city);
      const newSubCities = selectedCity ? selectedCity.subCities : [];

      setSubCities(newSubCities);
      setSelectedSubCity('전체');
    }
  };

  // 소분류 선택 핸들러
  const handleSubCitySelect = (event) => {
    setSelectedSubCity(event.target.value);
  };

  return (
    <div className="w-full">
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
            {cities.map((item, index) => (
              <option
                key={`${item} - ${index}`}
                value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* 소분류 선택 */}
        <div className="w-full">
          <select
            id="subCity"
            className="input bg-base-200 w-full dark:border-gray-200 dark:placeholder:text-gray-200"
            value={selectedSubCity}
            onChange={handleSubCitySelect}>
            <option value="전체">소분류 선택</option>
            {subCities.map((item, index) => (
              <option
                key={`${item} - ${index}`}
                value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CitySelector;
