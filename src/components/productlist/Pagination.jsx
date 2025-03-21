import React, { useEffect, useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { useSearchParams } from 'react-router-dom';
import usePriceStore from '../../stores/usePriceStore';

const Pagination = ({ data, ref = '' }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1,
  );
  const [itemsPerPage] = useState(10);
  const [currentItems, setCurrentItems] = useState([]);
  const { range } = usePriceStore();

  // 데이터 셋팅
  useEffect(() => {
    if (data && data.length) {
      const startIdx = (currentPage - 1) * itemsPerPage;
      const endIdx = startIdx + itemsPerPage;

      setCurrentItems(data.slice(startIdx, endIdx));
    }
  }, [currentPage, data, range.min, range.max]);

  const moveScroll = () => {
    scroll({ top: 0, behavior: 'smooth' });
  };

  // useEffect(() => {
  //   console.log('페이지 목록 이동 : ', currentPage);
  // }, [currentPage, data]);

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

  if (!data || data.length === 0) {
    return <div>로딩 중...</div>;
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
          {/* <p className="text-sm text-gray-700 dark:text-gray-400">
            Showing{' '}
            <span className="font-medium">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, data.length)}
            </span>{' '}
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
                currentPage - (currentPage % itemsPerPage) > 0
                  ? `이전 페이지 목록 ${itemsPerPage}개 보기`
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
            {[...Array(Math.ceil(data.length / itemsPerPage))].map(
              (_, index) => {
                const pageNumber = index + 1;
                return (
                  <a
                    aria-label={`페이지 번호 ${pageNumber}로 이동하기`}
                    href=""
                    key={pageNumber}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200 dark:hover:bg-gray-50 hover:bg-gray-300 hover:text-white dark:hover:text-black ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                      currentPage === pageNumber
                        ? 'bg-indigo-600 text-white'
                        : ''
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(pageNumber);
                    }}>
                    {pageNumber}
                  </a>
                );
              },
            )}
            <a
              href=""
              aria-label={`다음 페이지 목록 최대 ${itemsPerPage}개 보기`}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-white"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(
                  // 현재목록에서 다음 목록의 첫번째로 이동.
                  currentPage + (itemsPerPage - currentPage) + 1,
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
