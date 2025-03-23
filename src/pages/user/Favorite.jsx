import { useEffect, useState } from 'react';
import Pagination from '../../components/productlist/Pagination';
import PageHeader from '../../components/common/PageHeader';
import ProductCard from '../../components/favorite/ProductCard';

import { onAuthStateChanged } from 'firebase/auth';
import { useFavoriteAccommData } from '../../hooks/useFavoriteData';
import { auth } from '../../firebase/firebaseConfig';
import Loading from '../../components/common/Loading';

const breadcrumb = [
  { link: '/', text: '홈' },
  { link: '/favorite', text: '찜 목록' },
];

const Favorite = () => {
  const [user, setUser] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleSearchInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchButton = () => {};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const { data, isLoading, error } = useFavoriteAccommData(user?.uid);

  useEffect(() => {
    if (data) {
      console.log('찜 목록 내역:', JSON.stringify(data));
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return <>오류</>;

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
          value={inputValue}
          onChange={handleSearchInput}
          className="input border   border-blue-400 p-4 rounded-l-2xl "
        />
        <button
          type="submit"
          onClick={handleSearchButton}
          className="btn">
          검색
        </button>
      </div>

      {/* 찜목록 출력 */}
      <div className="mb-10 grid grid-cols-4 gap-10">
        {data &&
          data.map((favorite, index) => (
            <ProductCard
              key={index}
              favorite={favorite}
            />
          ))}
      </div>

      <Pagination data={data} />
    </div>
  );
};

export default Favorite;
