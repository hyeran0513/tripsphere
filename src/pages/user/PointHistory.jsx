import PageHeader from '../../components/common/PageHeader';
import { usePointData } from '../../hooks/usePointData';
import { formatDate, formatNumber } from '../../utils/format';
import Loading from '../../components/common/Loading';
import useAuthStore from '../../stores/useAuthStore';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/common/Pagination';
import { useUserData } from '../../hooks/useUserData';
import { BiCoin } from 'react-icons/bi';

const breadcrumb = [
  { link: '/mypage', text: '마이페이지' },
  { link: '/pointhistory', text: '포인트 내역' },
];

const PointHistory = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [selectedPerOption, setSelectedPerOption] = useState(5);
  const [currentPageData, setCurrentPageData] = useState([]);
  const {
    data: userData,
    isLoading: isUserLoading,
    error: errorUserLoading,
  } = useUserData(user?.uid);

  const perOptions = [
    { id: 1, value: 5, name: '5개씩 보기' },
    { id: 2, value: 10, name: '10개씩 보기' },
    { id: 4, value: 20, name: '20개씩 보기' },
  ];

  // 페이지 옵션 선택 핸들러
  const handlePagePerOptionSelect = useCallback(
    (event) => {
      const perPage = Number(event.target.value);
      setSelectedPerOption(perPage);

      navigate(location.pathname);
    },
    [navigate, location],
  );

  // 포인트 내역 조회
  const { data, isLoading, error } = usePointData(user?.uid);

  if (isLoading || isUserLoading) return <Loading />;
  if (error || errorUserLoading) return <>오류</>;

  return (
    <div className="max-w-[700px] mx-auto py-[40px]">
      <PageHeader
        title={`포인트 내역 (${data?.length || 0}건)`}
        breadcrumb={breadcrumb}
        hasBackButton={true}
        navigateLink="/mypage"
      />

      <div className="flex justify-end mb-10">
        <select
          id="perPage"
          className="select border border-gray-400 rounded-lg w-40"
          value={selectedPerOption}
          onChange={handlePagePerOptionSelect}>
          {perOptions.map((item) => (
            <option
              key={item.id}
              value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <p className="mb-4 flex items-center gap-2">
        <BiCoin /> 보유 포인트:{' '}
        <span className="text-indigo-600 font-bold">
          {formatNumber(userData?.points || 0)} 포인트
        </span>
      </p>

      <ul className="list bg-base-100 rounded-box shadow-md">
        {isAuthenticated &&
          currentPageData?.map((point, index) => (
            <li
              className="list-row flex-col flex"
              key={index}>
              <div className="py-2 border-b border-stone-200 flex justify-between items-center">
                <div>{formatDate(point.received_date)}</div>
              </div>

              <div className="flex justify-between">
                <div className="flex gap-6">
                  <div className="flex flex-col">
                    <h2 className="text-md font-bold">{point.title}</h2>
                    <div className="mb-4 text-xs uppercase opacity-60">
                      {point.description}
                    </div>
                  </div>
                </div>

                <div className="text-secondary">
                  {point.type === 'used' ? '-' : '+'}
                  {formatNumber(point.points)} 포인트
                </div>
              </div>
            </li>
          ))}
      </ul>

      {/* 페이지네이션 */}
      <Pagination
        data={data}
        pagePerItem={selectedPerOption}
        setCurrentPageData={setCurrentPageData}
      />
    </div>
  );
};

export default PointHistory;
