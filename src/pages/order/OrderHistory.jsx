import React from 'react';
import OrderList from '../../components/order/OrderList';
import PageHeader from '../../components/common/PageHeader';
import { useUserOrders } from '../../hooks/useOrderData';
import { auth } from '../../firebase/firebaseConfig';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

const breadcrumb = [
  { link: '/mypage', text: '마이페이지' },
  { link: '/orderhistory', text: '주문 내역' },
];

const OrderHistory = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // 로그인 상태 감지
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // 로그인
      } else {
        setUserId(null); // 로그아웃
      }
    });

    return () => unsubscribe();
  }, []);
  const { data: orderInfo, isLoading, error } = useUserOrders(userId);

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
