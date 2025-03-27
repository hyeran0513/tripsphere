import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import SideFilter from '../../components/accomlist/SideFilter';
import Loading from '../../components/common/Loading';
import AccomCard from '../../components/accomlist/AccomCard';
import { useAccommodations } from '../../hooks/useAccomData';

const breadcrumb = [
  { link: '/', text: '홈' },
  { link: '/products', text: '여행 검색 결과 목록' },
];

const typeMapping = [
  {
    value: 'hotel',
    text: '호텔',
    icon: 'https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg',
  },
  {
    value: 'motel',
    text: '모텔',
    icon: 'https://a0.muscache.com/pictures/251c0635-cc91-4ef7-bb13-1084d5229446.jpg',
  },
  {
    value: 'resort',
    text: '리조트',
    icon: 'https://a0.muscache.com/pictures/c027ff1a-b89c-4331-ae04-f8dee1cdc287.jpg',
  },
  {
    value: 'pension',
    text: '펜션',
    icon: 'https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg',
  },
  {
    value: 'guesthouse',
    text: '게스트하우스',
    icon: 'https://a0.muscache.com/pictures/48b55f09-f51c-4ff5-b2c6-7f6bd4d1e049.jpg',
  },
  {
    value: 'camping',
    text: '캠핑',
    icon: 'https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg',
  },
];

const AccomList = () => {
  const [filters, setFilters] = useState({
    type: '전체',
    stay_type: '전체',
  });

  const { data, isLoading } = useAccommodations(filters);

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((item) => {
        const typeMatch = filters.type === '전체' || item.type === filters.type;
        const stayTypeMatch =
          filters.stay_type === '전체' || item.stay_type === filters.stay_type;
        return typeMatch && stayTypeMatch;
      });
      setFilteredData(filtered);
    }
  }, [data, filters]);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-[1200px] mx-auto py-[40px]">
      {/* 페이지 헤더 */}
      <PageHeader
        title="여행 숙소 검색 결과"
        breadcrumb={breadcrumb}
      />
      <p>검색 결과: {filteredData.length}건</p>

      {/* 숙소 유형 선택 영역 */}
      <div className="flex gap-4 mb-10">
        {typeMapping.map((item) => (
          <label
            key={item.value}
            className="flex flex-col flex-1 items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name="type"
              value={item.value}
              checked={filters.type === item.value}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, type: e.target.value }))
              }
              className="hidden"
            />
            <div className="flex flex-col items-center gap-2">
              <img
                className="w-[30px]"
                src={item.icon}
                alt={item.text}
              />
              <span
                className={`text-sm ${filters.type === item.value ? 'text-indigo-600 font-bold' : ''}`}>
                {item.text}
              </span>
            </div>
          </label>
        ))}
      </div>

      {/* 필터 및 숙소 리스트 */}
      <div
        id="container"
        className="flex items-start gap-10">
        <SideFilter
          onSearch={setFilters}
          filters={filters}
        />

        <ul className="flex-1 flex flex-col gap-6">
          {filteredData.map((item, index) => (
            <AccomCard
              accommodation={item}
              key={index}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AccomList;
