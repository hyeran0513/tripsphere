import React from 'react';
import OrderList from '../../components/order/OrderList';
import PageHeader from '../../components/common/PageHeader';
import { useOrderData } from '../../hooks/useOrderData';
import useAuthStore from '../../stores/useAuthStore';

const breadcrumb = [
  { link: '/mypage', text: '마이페이지' },
  { link: '/orderhistory', text: '주문 내역' },
];

const OrderHistory = () => {
  const { user } = useAuthStore();
  const { data: orderInfo, isLoading, error } = useOrderData(user?.uid);

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
        title="주문 내역"
        breadcrumb={breadcrumb}
        hasBackButton={true}
      />

      {/* 주문 내역 */}
      <OrderList orderInfo={orderInfo} />
    </div>
  );
};

export default OrderHistory;
