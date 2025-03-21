import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import usePriceStore from '../../stores/usePriceStore';
import useProductListStore from '../../stores/useProductListStore';
import useRoomType from '../../stores/useRoomType';
import Pagination from './Pagination';
import ProductCard from './ProductCard';

const ProductsPageList = ({ loading, error }) => {
  const [searchParams] = useSearchParams();
  const initPageNumber = Number(searchParams.get('page')) || 1;
  const { list } = useProductListStore();

  // 인원 수, 지역, 숙박일정은 쿼리로 변경
  // 캐시된 데이터에서 필터링을 숙소 타입과 금액범위으로 제한
  const { range, rangeLimit } = usePriceStore();
  const { roomTypes } = useRoomType();

  const [filtered, setFiltered] = useState([]);

  const [filterLoading, setFilterLoading] = useState(true);

  useEffect(() => {
    let array = [];
    async function filterWaiting() {
      setFilterLoading(true);
      await accomCheck(array);
      setFiltered([...array]);
      setFilterLoading(false);
    }
    filterWaiting();

    // setFiltered(array);
    console.log(filtered);
  }, [range.min, range.max, roomTypes]);

  useEffect(() => {}, [filterLoading]);

  const focus = useRef();

  const getPrice = useCallback((val) => {
    return val * 10000;
  });

  const accomCheck = (array) => {
    const start = new Date().getMilliseconds();
    list.map((ele) => {
      if (
        getPrice(range.min) <= ele.final_price &&
        ele.final_price <=
          (range.max < rangeLimit.max ? getPrice(range.max) : Number.MAX_VALUE)
      ) {
        if (roomTypes.length > 0 && roomTypes !== null) {
          if (roomTypes.includes(ele.type)) {
            duplicatedCheck(array, ele);
          }
        } else {
          duplicatedCheck(array, ele);
        }
      }
    });
    const end = new Date().getMilliseconds();
  };

  const duplicatedCheck = (array, item) => {
    let isContain = false;

    if (array.length < 1) {
      array.push(item);
      return;
    }

    array.map((ele) => {
      if (ele.id == item.id) {
        isContain = true;
      }
    });

    if (!isContain) {
      array.push(item);
    }
  };

  if (loading) return <div>로딩중입니다...</div>;
  if (error)
    return (
      <div>
        에러가 발생했습니다.
        <br /> {error.message}
      </div>
    );
  if (filtered.length === 0 || filtered === null)
    return <div>조건에 맞는 숙소가 없습니다.</div>;

  return (
    <>
      {/* 할인률 , 평점 , 리뷰수 정렬 UI 추가 예정 */}
      {!filterLoading &&
        filtered.map((ele) => {
          <p> {ele} </p>;
        })}
      <ul>
        {filtered.length > 0 &&
          filtered
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
                ref={focus}
              />
            ))}
      </ul>
      {!filterLoading && (
        <Pagination
          data={filtered}
          focus={focus}
        />
      )}
    </>
  );
};

export default ProductsPageList;
