import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

const Pagination = ({ data = [], pagePerItem, setCurrentPageData }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  if (!data.length) return null;

  const totalPages = Math.ceil(data.length / pagePerItem);
  const maxVisiblePages = 5;

  // 데이터 잘라내기
  useEffect(() => {
    const startIdx = (currentPage - 1) * pagePerItem;
    setCurrentPageData(data.slice(startIdx, startIdx + pagePerItem));
  }, [data, pagePerItem, currentPage, setCurrentPageData]);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    searchParams.set('page', newPage);
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 페이지네이션 범위 계산
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  return (
    <div className="flex items-center justify-end border-t border-gray-200 mt-10 pt-6">
      <nav
        aria-label="페이지 목록"
        className="isolate inline-flex -space-x-px rounded-md shadow-xs">
        <button
          type="button"
          className="cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}>
          <BiChevronLeft className="size-5" />
        </button>

        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i,
        ).map((pageNum) => (
          <button
            key={pageNum}
            className={`cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200 dark:hover:bg-gray-50 hover:bg-gray-300 hover:text-white dark:hover:text-black ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
              currentPage === pageNum ? 'bg-indigo-600 text-white' : ''
            }`}
            onClick={() => handlePageChange(pageNum)}>
            {pageNum}
          </button>
        ))}

        <button
          type="button"
          className="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-white"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}>
          <BiChevronRight className="size-5" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
