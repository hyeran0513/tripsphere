import { useEffect, useState } from 'react';
import Pagination from '../../components/productlist/Pagination';
import PageHeader from '../../components/common/PageHeader';
import ProductCard from '../../components/favorite/ProductCard';
import { useFavoriteAccommData } from '../../hooks/useFavoriteData';
import Loading from '../../components/common/Loading';
import useAuthStore from '../../stores/useAuthStore';

const breadcrumb = [
  { link: '/', text: '홈' },
  { link: '/favorite', text: '찜 목록' },
];

const Favorite = () => {
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [searchOption, setSearchOption] = useState('name');

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
      setFilteredData(data);
      console.log(JSON.stringify(data));
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return <>오류</>;

  const handleSearchButton = () => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
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
        title="찜 목록"
        breadcrumb={breadcrumb}
        hasBackButton={true}
      />
      <div className="my-8 flex justify-end rounded-2xl">
        <select
          value={searchOption}
          id="searchOption"
          onChange={(e) => setSearchOption(e.target.value)}
          className="select border border-gray-400 rounded-l-2xl w-40">
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

  // 찜 목록이 없거나 검색 결과가 없을 때
  if (!data || filteredData.length === 0) {
    return renderEmptyState(
      data ? '검색하신 조건에 맞는 숙소가 없습니다.' : '찜 목록이 없습니다.',
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto py-[40px]">
      <PageHeader
        title="찜 목록"
        breadcrumb={breadcrumb}
        hasBackButton={true}
      />
      <div className="my-8 flex justify-end rounded-2xl">
        <select
          value={searchOption}
          id="searchOption"
          onChange={(e) => setSearchOption(e.target.value)}
          className="select border border-gray-400 rounded-l-2xl w-40">
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

      <div className="mb-10 grid grid-cols-4 gap-10">
        {filteredData.map((favorite, index) => (
          <ProductCard
            key={index}
            favorite={favorite}
          />
        ))}
      </div>

      <Pagination data={filteredData} />
    </div>
  );
};

export default Favorite;
