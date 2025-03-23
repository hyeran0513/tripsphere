import { useSearchParams } from 'react-router-dom';
import useProductListStore from '../../stores/useProductListStore';
import Pagination from './Pagination';
import ProductCard from './ProductCard';
import Loading from '../common/Loading';

const ProductsPageList = ({ loading, error }) => {
  const [searchParams] = useSearchParams();
  const initPageNumber = Number(searchParams.get('page')) || 1;
  const { list } = useProductListStore();

  if (error)
    return (
      <div>
        에러가 발생했습니다.
        <br /> {error}
        <br /> {error.message}
      </div>
    );

  if (loading) return <Loading />;
  if (list.length <= 0) return <div>조건에 맞는 숙소가 없습니다.</div>;

  return (
    <>
      <ul>
        {list
          .filter(
            (_, index) =>
              (initPageNumber - 1) * 10 <= index &&
              index < (initPageNumber - 1) * 10 + 10,
          )
          .map((product, index, array) => (
            <ProductCard
              key={index}
              index={index}
              product={product}
              arrayLength={array.length}
            />
          ))}
      </ul>
      <Pagination data={list} />
    </>
  );
};

export default ProductsPageList;
