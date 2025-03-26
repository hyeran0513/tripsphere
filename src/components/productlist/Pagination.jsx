import React, { useEffect, useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { useSearchParams } from 'react-router-dom';
import usePriceStore from '../../stores/usePriceStore';
import useRoomType from '../../stores/useRoomType';
import Loading from '../common/Loading';

// 상품목록 하단 페이지 목록 컴포넌트
const Pagination = ({ data, pagePerItem = 10, ref = '' }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 상태를 이용해서 저장하면 즉각 처리 안됌
  const currentPage = Number(searchParams.get('page')) || 1;
  const [itemsPerPage, setItemsPerPage] = useState(pagePerItem);
  const [currentItems, setCurrentItems] = useState([]);
  const { range } = usePriceStore();

  const { roomTypes } = useRoomType();

  // 페이지 목록 최대 10개 표출--------
  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const [pageGroupSize] = useState(10); // 페이지 목록 개수 제한

  // 현재 페이지 그룹 계산 (1~10, 11~20, ...)
  const currentPageGroup = Math.floor((currentPage - 1) / pageGroupSize);
  // ---------------------

  // 데이터 셋팅
  useEffect(() => {
    if (data && data.length) {
      const startIdx = (currentPage - 1) * itemsPerPage;
      const endIdx = startIdx + itemsPerPage;

      setCurrentItems(data.slice(startIdx, endIdx));
    }
    // console.log('pagePerItem : ', pagePerItem);
    setItemsPerPage(pagePerItem);
  }, [currentPage, data, range.min, range.max, roomTypes, itemsPerPage]);

  const moveScroll = () => {
    scroll({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // console.log('페이지 목록 이동 : ', currentPage);
  }, [currentPage, data]);

  // 페이지 변경
  const handlePageChange = (page) => {
    console.log('page : ', page);

    if (page > 0 && page <= Math.ceil(data?.length / itemsPerPage)) {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set('page', page);
        //리턴 안하면 url 변경 안됨.
        return newParams;
      });
      // ref.current.focus();
      moveScroll();
    } else {
      alert('이동할 수 없는 페이지입니다.');
    }
  };

  // 필터링 결과로 인해서 데이터 길이가 없다면 로딩창 유지됨
  if (data.length === 0) {
    return;
  }

  // 상품이 1개만 있어도 표출
  if (!data) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-5">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href=""
          aria-label={`이전페이지 ${currentPage + 1} 로 이동하기`}
          className="relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(currentPage - 1);
          }}>
          Previous
        </a>
        <a
          href=""
          aria-label={`다음페이지 ${currentPage + 1} 로 이동하기`}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(currentPage + 1);
          }}>
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          {/* 총 몇개의 페이지 중 몇번째 라고 출력 가능*/}
          {/* <p className="text-sm text-gray-700 dark:text-gray-400">
            Showing
            <span className="font-medium">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>
            to
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, data.length)}
            </span>
            of <span className="font-medium">{data.length}</span> results
          </p> */}
        </div>
        <div>
          <nav
            aria-label="페이지 목록"
            className="isolate inline-flex -space-x-px rounded-md shadow-xs">
            <a
              href=""
              aria-label={
                currentPage - (currentPage % pageGroupSize) > 0
                  ? `이전 페이지 목록 ${pageGroupSize}개 보기`
                  : '이전 페이지 목록을 볼 수 없습니다.'
              }
              className="inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={(e) => {
                e.preventDefault();
                // 현재목록에서 이전 목록의 마지막으로 이동.
                handlePageChange(currentPage - (currentPage % itemsPerPage));
              }}>
              <span className="sr-only">이전</span>
              <BiChevronLeft
                aria-hidden="true"
                className="size-5"
              />
            </a>
            {[
              ...Array(
                Math.min(
                  pageGroupSize,
                  totalPages - currentPageGroup * pageGroupSize,
                ),
              ),
            ].map((_, index) => {
              const pageNumber = currentPageGroup * pageGroupSize + index + 1;
              return (
                <a
                  aria-label={`페이지 번호 ${pageNumber}로 이동하기`}
                  href=""
                  key={pageNumber}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200 dark:hover:bg-gray-50 hover:bg-gray-300 hover:text-white dark:hover:text-black ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                    currentPage === pageNumber ? 'bg-indigo-600 text-white' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(pageNumber);
                  }}>
                  {pageNumber}
                </a>
              );
            })}
            <a
              href=""
              aria-label={`다음 페이지 목록 최대 ${pageGroupSize}개 보기`}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-white"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(
                  // 현재목록에서 다음 목록의 첫번째로 이동.
                  currentPage + (pageGroupSize - currentPage) + 1,
                );
              }}>
              <span className="sr-only">다음</span>
              <BiChevronRight
                aria-hidden="true"
                className="size-5"
              />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
