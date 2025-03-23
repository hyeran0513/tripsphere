import React, { useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { useSearchParams } from 'react-router-dom';
import Loading from '../common/Loading';

const Pagination = ({ data }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initPageNumber = Number(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(initPageNumber);
  const [itemsPerPage] = useState(10);
  const [currentItems, setCurrentItems] = useState([]);

  // 데이터 셋팅
  // useEffect(() => {
  //   if (data && data.length) {
  //     const startIdx = (currentPage - 1) * itemsPerPage;
  //     const endIdx = startIdx + itemsPerPage;

  //     setCurrentItems(data.slice(startIdx, endIdx));
  //   }
  // }, [currentPage, data]);

  // 페이지 변경
  const handlePageChange = (page) => {
    if (page > 0 && page <= Math.ceil(data?.length / itemsPerPage)) {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set('page', page);
        return newParams;
      });
    }
  };

  if (!data || data.length === 0) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-5">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => {
            handlePageChange(currentPage - 1);
          }}>
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => {
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
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-xs">
            <a
              href="#"
              className="inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => handlePageChange(currentPage - 1)}>
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
                    href=""
                    key={pageNumber}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200 dark:hover:bg-gray-50 hover:bg-gray-300 hover:text-white dark:hover:text-black ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                      currentPage === pageNumber
                        ? 'bg-indigo-600 text-white'
                        : ''
                    }`}
                    onClick={() => {
                      handlePageChange(pageNumber);
                    }}>
                    {pageNumber}
                  </a>
                );
              },
            )}
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-white"
              onClick={() => handlePageChange(currentPage + 1)}>
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
