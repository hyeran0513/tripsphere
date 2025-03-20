import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import UserProfile from '../../components/mypage/UserProfile';
import UserStats from '../../components/mypage/UserStats';
import PointHistory from '../../components/mypage/PointHistory';
import OrderHistory from '../../components/mypage/OrderHistory';
import FavoriteList from '../../components/mypage/FavoriteList';

const breadcrumb = [
  { link: '/', text: '홈' },
  { link: '/mypage', text: '마이페이지' },
];

const MyPage = () => {
  return (
    <div className="py-[40px] max-w-[700px] mx-auto">
      <PageHeader
        title="마이페이지"
        breadcrumb={breadcrumb}
      />

      {/* 유저 프로필 */}
      <UserProfile />

      {/* 상태 */}
      <UserStats />

      {/* 포인트 내역 */}
      <PointHistory />

      {/* 주문 내역 */}
      <OrderHistory />

      {/* 찜 목록 */}
      <FavoriteList />
    </div>
  );
};

export default MyPage;
