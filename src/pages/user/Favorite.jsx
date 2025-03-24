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

  const { data, isLoading, error } = useFavoriteAccommData(user?.uid);

  useEffect(() => {
    if (data) {
      console.log('찜 목록 내역:', JSON.stringify(data));
    }
    setFilteredData(data);
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return <>오류</>;

  const typeMapping = {
    hotel: '호텔',
    motel: '모텔',
    resort: '리조트',
    pension: '펜션',
    guesthouse: '게스트하우스',
    camping: '캠핑',
  };

  const handleSearchButton = () => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
    } else {
      const results = data.filter((item) => {
        const searchableContent = [
          item.name,
          item.host.name,
          typeMapping[item.type] || item.type,
          item.description,
          item.location.city,
          item.location.sub_city,
          item.services.join(', '),
        ]
          .join(' ')
          .toLowerCase(); // 검색 범위가 되는 텍스트를 모두 합침
        return searchableContent.includes(searchTerm.toLowerCase());
      });
      setFilteredData(results); // 검색어와 일치하는 데이터만 표시
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto py-[40px]">
      <PageHeader
        title="찜 목록"
        breadcrumb={breadcrumb}
        hasBackButton={true}
      />

      {/* 검색영역  */}
      <div className="my-8 flex justify-end rounded-2xl">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input border border-blue-400 p-4 rounded-l-2xl "
        />
        <button
          type="submit"
          onClick={handleSearchButton}
          className="btn">
          검색
        </button>
      </div>

      {/* 찜목록 출력 && 검색어로 검색결과  */}
      <div className="mb-10 grid grid-cols-4 gap-10">
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((favorite, index) => (
            <ProductCard
              key={index}
              favorite={favorite}
            />
          ))
        ) : (
          <p>일치하는 결과가 없습니다.</p>
        )}
      </div>

      <Pagination data={data} />
    </div>
  );
};

export default Favorite;
