import React, { useState, useEffect, useRef } from 'react';
import { cities } from '../data/cities';
import useFilterStore from '../../stores/useFilterStore';

const CitySelector = ({ isGlobal }) => {
  const store = useFilterStore();
  const [subCities, setSubCities] = useState([]);
  const [isSubCityModalOpen, setIsSubCityModalOpen] = useState(false);
  const [localCity, setLocalCity] = useState([]);
  const [localSubCity, setLocalSubCity] = useState([]);

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

  const subCityInputRef = useRef(null);

  // 지역 선택 핸들러
  const handleCitySelect = (city) => {
    setSelectedCity(city);

    if (city === '전체') {
      setSubCities([]);
      setSelectedSubCity('전체');
      setIsSubCityModalOpen(false);
    } else {
      const selectedCityObj = cities.find((item) => item.name === city);
      const newSubCities = selectedCityObj ? selectedCityObj.subCities : [];

      setSubCities(newSubCities);
      setSelectedSubCity('전체');
      setIsSubCityModalOpen(true);
    }
  };

  // 소분류 선택 핸들러
  const handleSubCitySelect = (subCity) => {
    setSelectedSubCity(subCity);
    setIsSubCityModalOpen(false);
  };

  // 소분류 모달이 열리면 자동으로 포커스 맞추기
  useEffect(() => {
    if (isSubCityModalOpen) {
      subCityInputRef.current.focus();
    }
  }, [isSubCityModalOpen]);

  return (
    <div className="w-full">
      <label
        htmlFor="city"
        className="mb-2 block text-sm font-medium text-gray-700 text-left dark:text-gray-200">
        지역
      </label>
      <div className="flex gap-2">
        {/* 대분류 선택 */}
        <div className="dropdown w-full gap-2">
          <input
            tabIndex={0}
            role="button"
            className="input bg-base-200 w-full dark:border-gray-200 dark:placeholder:text-gray-200"
            placeholder="대분류 선택"
            value={selectedCity}
            readOnly
          />
          <div
            tabIndex={0}
            className="dropdown-content card card-sm bg-base-100 z-10 w-64 shadow-md">
            <div className="card-body space-y-2 grid grid-cols-3">
              {cities.map((item, index) => (
                <label
                  key={`${item} - ${index}`}
                  className={`flex items-center justify-center p-2 cursor-pointer rounded-sm border-1 ${
                    selectedCity === item.name
                      ? 'border-blue-500 bg-blue-100 dark:bg-gray-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}>
                  <input
                    type="radio"
                    name="city"
                    value={item.name}
                    onChange={() => handleCitySelect(item.name)}
                    className="hidden"
                  />
                  <span>{item.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* 소분류 선택 */}
        <div className="dropdown w-full">
          <input
            tabIndex={1}
            ref={subCityInputRef}
            role="button"
            className="input bg-base-200 w-full dark:border-gray-200 dark:placeholder:text-gray-200"
            placeholder="소분류 선택"
            value={selectedSubCity}
            readOnly
          />
          <div
            tabIndex={0}
            className="dropdown-content card card-sm bg-base-100 z-10 w-64 shadow-md">
            <div className="card-body space-y-2 grid grid-cols-3">
              {subCities.map((item, index) => (
                <label
                  key={`${item} - ${index}`}
                  className={`flex items-center justify-center p-2 cursor-pointer rounded-sm border-1 ${
                    selectedSubCity === item
                      ? 'border-blue-500 bg-blue-100 dark:bg-gray-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}>
                  <input
                    type="radio"
                    name="subCity"
                    value={item}
                    onChange={() => handleSubCitySelect(item)}
                    className="hidden"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitySelector;
