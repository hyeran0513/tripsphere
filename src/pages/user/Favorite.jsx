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

  const typeMapping = {
    hotel: '호텔',
    motel: '모텔',
    resort: '리조트',
    pension: '펜션',
    guesthouse: '게스트하우스',
    camping: '캠핑',
  };

  const servicesMapping = {
    wifi: '와이파이',
    parking: '주차장',
    tv: '텔레비전',
    breakfast: '조식',
    barbecue: '바베큐',
  };

  const { data, isLoading, error } = useFavoriteAccommData(user?.uid);

  useEffect(() => {
    if (data) {
      setFilteredData(data);
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
      const servicesInKorean = item.services
        .map((service) => servicesMapping[service] || service)
        .join(', ');

      const searchableContent = [
        item.name,
        item.host.name,
        item.type,
        typeMapping[item.type] || item.type,
        item.description,
        item.location.city,
        item.location.sub_city,
        item.original_price,
        item.final_price,
        servicesInKorean,
        item.services.join(', '),
      ]
        .join(' ')
        .toLowerCase();

      return searchableContent.includes(searchTerm.toLowerCase());
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
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={handleKeyUp}
          className="input border border-gray-400 p-4 rounded-l-2xl"
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
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={handleKeyUp}
          className="input border border-gray-400 p-4 rounded-l-2xl"
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
