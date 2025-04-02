import OrderList from '../../components/order/OrderList';
import PageHeader from '../../components/common/PageHeader';
import { useOrderData } from '../../hooks/useOrderData';
import useAuthStore from '../../stores/useAuthStore';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/common/Pagination';

const breadcrumb = [
  { link: '/mypage', text: '마이페이지' },
  { link: '/orderhistory', text: '주문 내역' },
];

const OrderHistory = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data: orderInfo, isLoading, error } = useOrderData(user?.uid);
  const [selectedPerOption, setSelectedPerOption] = useState(5);
  const [currentPageData, setCurrentPageData] = useState([]);

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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px]">
        <div className="w-5 h-5 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-gray-500">주문 내역 불러오는 중</p>
      </div>
    );
  }
  if (error) return <div className="text-center text-red-500">오류 발생</div>;

  return (
    <div className="max-w-[700px] mx-auto py-[40px]">
      <PageHeader
        title={`주문 내역 (${orderInfo?.length || 0}건)`}
        breadcrumb={breadcrumb}
        hasBackButton={true}
        navigateLink="/mypage"
      />

      <div className="flex justify-end mb-10">
        <select
          id="perPage"
          className="select border border-gray-400 rounded-lg w-40"
          value={selectedPerOption}
          onChange={handlePagePerOptionSelect}
          title="갯수 보기">
          {perOptions.map((item) => (
            <option
              key={item.id}
              value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* 주문 내역 */}
      <OrderList orderInfo={currentPageData} />

      {/* 페이지네이션 */}
      <Pagination
        data={orderInfo}
        pagePerItem={selectedPerOption}
        setCurrentPageData={setCurrentPageData}
      />
    </div>
  );
};

export default OrderHistory;
