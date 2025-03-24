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

  const handleSearchButton = () => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
    } else {
      const results = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      setFilteredData(results);
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
