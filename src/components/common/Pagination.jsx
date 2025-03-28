import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

const Pagination = ({ data, pagePerItem, setCurrentPageData }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(data.length / pagePerItem);

  // 데이터 잘라내기
  useEffect(() => {
    const startIdx = (currentPage - 1) * pagePerItem;
    const endIdx = startIdx + pagePerItem;
    const sliced = data.slice(startIdx, endIdx);
    setCurrentPageData(sliced);
  }, [data, pagePerItem, currentPage, setCurrentPageData]);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    searchParams.set('page', newPage);
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex items-center justify-end border-t border-gray-200 mt-10 pt-6">
      <nav
        aria-label="페이지 목록"
        className="isolate inline-flex -space-x-px rounded-md shadow-xs">
        <button
          type="button"
          aria-label="이전 페이지"
          className="cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) handlePageChange(currentPage - 1);
          }}>
          <span className="sr-only">이전</span>
          <BiChevronLeft
            aria-hidden="true"
            className="size-5"
          />
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            type="button"
            aria-label=""
            key={i + 1}
            className={`cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200 dark:hover:bg-gray-50 hover:bg-gray-300 hover:text-white dark:hover:text-black ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
              currentPage === i + 1 ? 'bg-indigo-600 text-white' : ''
            }`}
            onClick={() => handlePageChange(i + 1)}>
            {i + 1}
          </button>
        ))}

        <button
          type="button"
          aria-label="다음 페이지"
          className="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-white"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < totalPages) handlePageChange(currentPage + 1);
          }}>
          <span className="sr-only">다음</span>
          <BiChevronRight
            aria-hidden="true"
            className="size-5"
          />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
