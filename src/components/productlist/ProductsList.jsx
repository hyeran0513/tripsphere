import { useEffect, useRef, useState } from 'react';
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

  const notEnoughCondition = <NoData text={'조건에 맞는 숙소가 없습니다.'} />;

  useEffect(() => {
    setFiltered(typeCheck(list));
  }, [range.min, range.max, roomTypes, pagePerItem, list]);

  useEffect(() => {}, [filterLoading, pagePerItem]);

  // 향후 접근성 향상용
  // 동작 : 탭으로 페이지 버튼선택후 엔터 -> 상품목록 첫번째 요소 선택
  const focus = useRef();

  // 숙소 형태 조건
  const typeCheck = (array) => {
    if (array === null) console.error('array is null');
    else if (array === undefined) console.error('array === undefined');
    else if (array.length === 0) console.error('array.length === 0');
    return array.filter((ele) => roomTypes.includes(ele.type));
  };

  // 상품목록의 상품 표출 갯수 조절
  const changePagePerItem = (e) => {
    setPagePerItem(Number(e.target.value));
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

  // 쿼리결과가 없으면 필터링 UI 출력 중지
  if (list.length <= 0) return notEnoughCondition;

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

      {/* 필터링 결과로 인해 결과가 없을때 필터링 UI는 출력*/}
      {(filtered.length === 0 || filtered === null) && notEnoughCondition}

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
