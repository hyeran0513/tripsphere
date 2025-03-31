import { useCallback, useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import ProductCard from '../../components/favorite/ProductCard';
import { useFavoriteAccommData } from '../../hooks/useFavoriteData';
import Loading from '../../components/common/Loading';
import useAuthStore from '../../stores/useAuthStore';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../../components/common/Pagination';

const breadcrumb = [
  { link: '/', text: '홈' },
  { link: '/favorite', text: '찜 목록' },
];

const Favorite = () => {
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [searchOption, setSearchOption] = useState('name');
  const [selectedPerOption, setSelectedPerOption] = useState(10);
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPageData, setCurrentPageData] = useState([]);

  const perOptions = [
    { id: 2, value: 10, name: '10개씩 보기' },
    { id: 4, value: 20, name: '20개씩 보기' },
  ];

  // 페이지 옵션 선택 핸들러
  const handlePagePerOptionSelect = useCallback(
    (event) => {
      const perPage = Number(event.target.value);
      setSelectedPerOption(perPage);

      navigate(location.pathname);
    },
    [navigate, location],
  );

  const typeMapping = {
    hotel: '호텔',
    motel: '모텔',
    resort: '리조트',
    pension: '펜션',
    guesthouse: '게스트하우스',
    camping: '캠핑',
  };

  const { data, isLoading, error } = useFavoriteAccommData(user?.uid);

  useEffect(() => {
    if (data) {
      const sortedData = [...data].reverse();
      setFilteredData(sortedData);
      console.log(data);
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return <>오류</>;

  const handleSearchButton = () => {
    if (!searchTerm.trim()) {
      setFilteredData([...data].reverse());
      return;
    }

    const results = data.filter((item) => {
      let searchableField = '';

      switch (searchOption) {
        case 'name':
          searchableField = item.name;
          break;
        case 'location':
          searchableField = `${item.location.city} ${item.location.sub_city}`;
          break;
        case 'place':
          searchableField = `${item.location.place_name}`;
          break;
        case 'type':
          searchableField = typeMapping[item.type] || item.type;
          break;
        default:
          searchableField = '';
      }
      return searchableField.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredData(results);
  };

  // Enter 키를 눌렀을 때
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleSearchButton();
    }
  };

  const renderEmptyState = (message) => (
    <div className="max-w-[1200px] mx-auto py-[40px]">
      <PageHeader
        title={`찜 목록 (${data?.length || 0}건)`}
        breadcrumb={breadcrumb}
        hasBackButton={true}
      />
      <div className="my-8 flex gap-2 justify-end rounded-2xl">
        <select
          value={searchOption}
          id="searchOption"
          onChange={(e) => setSearchOption(e.target.value)}
          className="select border border-gray-400 rounded-lg w-40">
          <option value="name">숙소명</option>
          <option value="location">도시명</option>
          <option value="place">장소명</option>
          <option value="type">타입명</option>
        </select>

        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          id="searchTerm"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={handleKeyUp}
          className="input border border-gray-400 p-4"
        />
        <button
          type="submit"
          onClick={handleSearchButton}
          className="btn">
          검색
        </button>
      </div>
      <div className="mb-10">{message}</div>
    </div>
  );

  // 찜 목록이  없을 때
  if (!data || data.length === 0) {
    return renderEmptyState(<div> </div>);
  }

  // 검색 결과가 없을 때
  if (filteredData.length === 0) {
    return renderEmptyState(
      data ? '검색하신 조건에 맞는 숙소가 없습니다.' : '찜 목록이 없습니다.',
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto py-[40px]">
      {/* 페이지 헤더 */}
      <PageHeader
        title={`찜 목록 (${data?.length || 0}건)`}
        breadcrumb={breadcrumb}
        hasBackButton={true}
        navigateLink="/mypage"
      />

      {/* 검색 영역 */}
      <div className="my-8 flex gap-2 justify-end rounded-2xl">
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

        <select
          value={searchOption}
          id="searchOption"
          onChange={(e) => setSearchOption(e.target.value)}
          className="select border border-gray-400 rounded-lg w-40">
          <option value="name">숙소명</option>
          <option value="location">도시명</option>
          <option value="place">장소명</option>
          <option value="type">타입명</option>
        </select>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          id="searchTerm"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={handleKeyUp}
          className="input border border-gray-400 p-4"
        />
        <button
          type="submit"
          onClick={handleSearchButton}
          className="btn">
          검색
        </button>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-10">
        {currentPageData.map((favorite, index) => (
          <ProductCard
            key={index}
            favorite={favorite}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      <Pagination
        data={filteredData}
        pagePerItem={selectedPerOption}
        setCurrentPageData={setCurrentPageData}
      />
    </div>
  );
};

export default Favorite;
