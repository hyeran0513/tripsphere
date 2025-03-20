import React, { useEffect, useState } from 'react';
import { BiHeart } from 'react-icons/bi';
import { HiOutlineTicket } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { LiaCoinsSolid } from 'react-icons/lia';

import PointModal from './PointModal';
import { auth } from '../../firebase/firebaseConfig';
import { useUserData } from '../../hooks/useUserData';
import { onAuthStateChanged } from 'firebase/auth';
import { useUserOrders } from '../../hooks/useOrderData';
const UserStats = () => {
  const [user, setUser] = useState(null);
  //포인트 모달 열기
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // Firebase 인증 상태가 변경될 때마다 호출
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // 컴포넌트가 언마운트될 때 리스너를 정리
    return () => unsubscribe();
  }, []);

  const { data: orderInfo } = useUserOrders(user?.uid);

  const { data, isLoading, error } = useUserData(user?.uid);

  useEffect(() => {
    if (data) {
      console.log('사용자 정보:', JSON.stringify(data));
    }
  }, [data]);

  if (isLoading) return <>로딩 중...</>;
  if (error) return <>에러</>;

  return (
    <div className="flex divide-x-1 divide-solid divide-gray-300 border-t border-b border-gray-300 ">
      {/* 포인트 박스  */}
      <div className="flex items-center gap-4 px-4">
        <Link
          to="/pointhistory"
          className="flex-1 flex items-center gap-2 justify-around  py-4">
          <div className="flex-none flex gap-2 items-center">
            <LiaCoinsSolid size={30} />
            <div>포인트</div>
          </div>
          <div>
            <strong className="stat-value text-primary">
              {data && data.points}
            </strong>
            포인트
          </div>
        </Link>
        <button
          onClick={handleOpen}
          className="btn bg-green-500">
          충전
        </button>
        {isOpen && (
          <PointModal
            onClose={handleClose}
            data={data}
          />
        )}
      </div>

      {/* 주문내역 박스  */}
      <Link
        to="/orderhistory"
        className="flex-1 flex items-center gap-2 justify-around  py-4">
        <div className="flex-none flex gap-2 items-center">
          <HiOutlineTicket size={30} />
          <div>주문 내역</div>
        </div>
        <div className="stat-value text-secondary">{orderInfo?.length}</div>
      </Link>

      {/* 찜내역 박스  */}
      <Link
        to="/favorite"
        className="flex-1 flex items-center gap-2 justify-around  py-4">
        <div className="flex-none flex gap-2 items-center">
          <BiHeart size={30} />
          <div>찜</div>
        </div>

        <div className="stat-value text-accent">
          {data && data.wishlist.length}
        </div>
      </Link>
    </div>
  );
};

export default UserStats;
