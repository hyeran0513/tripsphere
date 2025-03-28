import React, { useCallback, useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import SideFilter from '../../components/accomlist/SideFilter';
import Loading from '../../components/common/Loading';
import AccomCard from '../../components/accomlist/AccomCard';
import { useAccommodations } from '../../hooks/useAccomData';
import useFilterStore from '../../stores/useFilterStore';
import AccomTypeSelector from '../../components/accomlist/AccomTypeSelector';
import Pagination from '../../components/common/Pagination';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const breadcrumb = [
  { link: '/', text: '홈' },
  { link: '/products', text: '여행 검색 결과 목록' },
];

const typeMapping = [
  {
    value: '전체',
    text: '전체',
    icon: 'https://a0.muscache.com/pictures/9a2ca4df-ee90-4063-b15d-0de7e4ce210a.jpg',
  },
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

const ProductList = () => {
  const {
    selectedCity,
    selectedSubCity,
    adultCount,
    childrenCount,
    checkIn,
    checkOut,
  } = useFilterStore();

  const [filters, setFilters] = useState({
    type: '전체',
    city: selectedCity,
    sub_city: selectedSubCity,
    checkIn,
    checkOut,
    adults: adultCount,
    children: childrenCount,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading } = useAccommodations(filters);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedPerOption, setSelectedPerOption] = useState(5);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const perOptions = [
    { id: 1, value: 5, name: '5개씩 보기' },
    { id: 2, value: 10, name: '10개씩 보기' },
    { id: 3, value: 15, name: '15개씩 보기' },
    { id: 4, value: 20, name: '20개씩 보기' },
  ];

  useEffect(() => {
    if (data) {
      const filtered = data.filter((item) => {
        const typeMatch = filters.type === '전체' || item.type === filters.type;
        return typeMatch;
      });
      setFilteredData(filtered);
    }
  }, [data, filters]);

  useEffect(() => {
    if (filteredData.length > 0) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev.toString());
        newParams.set('page', 1);
        return newParams;
      });
    }
  }, [filteredData]);

  // 검색 핸들러
  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      city: selectedCity,
      sub_city: selectedSubCity,
      checkIn,
      checkOut,
      adults: adultCount,
      children: childrenCount,
    }));
  };

  // 페이지 옵션 선택 핸들러
  const handlePagePerOptionSelect = useCallback(
    (event) => {
      const perPage = Number(event.target.value);
      setSelectedPerOption(perPage);

      navigate(location.pathname);
    },
    [navigate, location],
  );

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-[1200px] mx-auto py-[40px]">
      {/* 페이지 헤더 */}
      <PageHeader
        title={`여행 숙소 검색 결과 (${filteredData.length}건)`}
        breadcrumb={breadcrumb}
      />

      {/* 숙소 유형 선택 */}
      <AccomTypeSelector
        filters={filters}
        setFilters={setFilters}
        typeMapping={typeMapping}
      />

      <div
        id="container"
        className="flex items-start gap-10">
        {/* 숙소 필터 */}
        <SideFilter handleSearch={handleSearch} />

        <div className="flex-1">
          <div className="flex justify-end mb-10">
            <select
              id="perPage"
              className="select border border-gray-400 rounded-lg w-40"
              value={selectedPerOption}
              onChange={handlePagePerOptionSelect}>
              {perOptions.map((item) => (
                <option
                  key={item.id}
                  value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* 숙소 목록 */}
          <ul className="flex flex-col gap-6">
            {currentPageData.map((item, index) => (
              <AccomCard
                accommodation={item}
                key={index}
              />
            ))}
          </ul>

          {/* 페이지네이션 */}
          <Pagination
            data={filteredData}
            pagePerItem={selectedPerOption}
            setCurrentPageData={setCurrentPageData}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
