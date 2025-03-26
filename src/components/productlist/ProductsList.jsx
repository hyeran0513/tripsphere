import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import usePriceStore from '../../stores/usePriceStore';
import useProductListStore from '../../stores/useProductListStore';
import useRoomType from '../../stores/useRoomType';
import Loading from '../common/Loading';
import NoData from '../common/NoData.jsx';
import Pagination from './Pagination';
import PriceSlider from './PriceSlider.jsx';
import ProductCard from './ProductCard';
import RoomTypeSelector from './RoomTypeSelect.jsx';

const ProductsList = ({ loading, error }) => {
  const [searchParams] = useSearchParams();
  const initPageNumber = Number(searchParams.get('page')) || 1;
  const { list } = useProductListStore();

  // 페이지별 표시 항목수선택
  const [pagePerItem, setPagePerItem] = useState(10);

  // 인원 수, 지역, 숙박일정은 쿼리로 변경
  // 캐시된 데이터에서 필터링을 숙소 타입과 금액범위으로 제한
  const { range, rangeLimit } = usePriceStore();
  const { roomTypes } = useRoomType();

  const [filtered, setFiltered] = useState([]);

  const [filterLoading, setFilterLoading] = useState(true);

  const notEnough = <NoData text={'조건에 맞는 숙소가 없습니다.'} />;

  useEffect(() => {
    let array = [];
    async function filterWaiting() {
      setFilterLoading(true);
      await accomCheck(array);
      array = sortProduct(array);
      setFiltered(typeCheck(array));
      setFilterLoading(false);
    }
    filterWaiting();
    // setFiltered(array);
    // console.log('pageperitem : ', pagePerItem);
    // console.log('filtered:', filtered);
  }, [range.min, range.max, roomTypes, pagePerItem, list]);

  useEffect(() => {
    // console.log('pageperitem : ', pagePerItem);
  }, [filterLoading, pagePerItem]);

  const focus = useRef();

  const getPrice = useCallback((val) => {
    return val * 10000;
  });

  const typeCheck = (array) => {
    return array.filter((ele) => roomTypes.includes(ele.type));
  };

  // 출력전 상품 기본 정렬.
  const sortProduct = (array, category = 'price', orderBy = 'asc') => {
    switch (category) {
      case 'price':
        // 기본설정 오름차순
        switch (orderBy) {
          case 'desc':
            return array.sort((a, b) => b.final_price - a.final_price);
          default:
            return array.sort((a, b) => a.final_price - b.final_price);
        }
      // 기본설정 내림차순
      case 'discount':
        switch (orderBy) {
          case 'desc':
            return array.sort((a, b) => b.discount_rate - a.discount_rate);
          default:
            return array.sort((a, b) => a.discount_rate - b.discount_rate);
        }
      // 기본설정 내림차순
      case 'rating':
        switch (orderBy) {
          case 'asc':
            return array.sort((a, b) => a.rating - b.rating);
          default:
            return array.sort((a, b) => b.rating - a.rating);
        }
      case 'reviewsCount':
        switch (orderBy) {
          // 기본설정 내림차순
          default:
            return array.sort((a, b) => b.reviews_count - a.reviews_count);
          case 'asc':
            return array.sort((a, b) => a.reviews_count - b.reviews_count);
        }
      // 기본설정 가격, 오름차순
      default:
        switch (orderBy) {
          case 'desc':
            return array.sort((a, b) => b.final_price - a.final_price);
          default:
            return array.sort((a, b) => a.final_price - b.final_price);
        }
    }
  };

  const changePagePerItem = (e) => {
    setPagePerItem(Number(e.target.value));
  };

  const accomCheck = (array) => {
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
  };

  const duplicatedCheck = (array, item) => {
    let isContain = false;

    if (array.length < 1) {
      array.push(item);
      return;
    }

    array.map((ele) => {
      if (ele.id == item.id) isContain = true;
    });

    if (!isContain) array.push(item);
  };

  if (loading) return <div>로딩중입니다...</div>;
  if (error)
    return (
      <div>
        에러가 발생했습니다.
        <br /> {error.message}
      </div>
    );

  if (loading) return <Loading />;
  if (list.length <= 0) return notEnough;
  // if (filtered.length === 0 || filtered === null) return notEnough;

  return (
    <>
      {/* 예산 범위 선택 */}
      {list.length > 0 && (
        <div className="flex w-full justify-around gap-3 pb-3.5">
          <div className="rounded-lg border border-gray-200 p-3">
            <span className="px-2 font-bold">가격</span>
            <div className="flex items-center justify-between">
              <div className="w-full p-3 max-w-xs">
                <PriceSlider
                  step={5}
                  className="relative w-full p-4"
                />
              </div>
            </div>
          </div>

          {/* 숙박 장소 선택 */}
          <div className="flex-2/3 rounded-lg border border-gray-200 p-3 flex flex-col gap-1.5">
            <span className="m-2 font-bold">숙박 장소</span>
            <div className="grid grid-cols-3 gap-x-3 gap-y-2">
              <RoomTypeSelector />
            </div>
          </div>
        </div>
      )}

      {(filtered.length === 0 || filtered === null) && notEnough}

      {/* 할인률 , 평점 , 리뷰수 정렬, 목록 5,10,15 개씩 보기 UI 추가 예정 */}
      {filtered.length > 0 && (
        // console.log(
        //   '정렬순서(오름차순, 내림차순), 정렬항목(가격, 평점, 할인률, 리뷰수) , 보이는 목록갯수 설정',)

        <div className="py-3.5">
          <select
            aria-label="보이는 상품 목록 갯수 선택하기"
            className="rounded-full border-2 border-gray-200 px-2 py-0.5"
            value={pagePerItem}
            onChange={changePagePerItem}>
            <option value="15">15개씩 보기</option>
            <option value="10">10개씩 보기</option>
            <option value="5">5개씩 보기</option>
          </select>
        </div>
      )}
      <ul>
        {filtered.length > 0 &&
          filtered
            .filter(
              (_, index) =>
                (initPageNumber - 1) * pagePerItem <= index &&
                index < (initPageNumber - 1) * pagePerItem + pagePerItem,
            )
            .map((product, index, array) => (
              <ProductCard
                key={product.id}
                index={index}
                product={product}
                arrayLength={array.length}
                // ref={focus}
              />
            ))}
      </ul>
      {!filterLoading && (
        <Pagination
          data={filtered}
          focus={focus}
          pagePerItem={pagePerItem}
        />
      )}
    </>
  );
};

export default ProductsList;
