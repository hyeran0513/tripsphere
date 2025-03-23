import React, { useEffect } from 'react';
import { BiHeart } from 'react-icons/bi';
import { HiOutlineTicket } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { LiaCoinsSolid } from 'react-icons/lia';

import PointModal from './PointModal';
import { useUserData } from '../../hooks/useUserData';
import { useUserOrders } from '../../hooks/useOrderData';
import Loading from '../common/Loading';
import Modal from '../common/Modal';
import useAuthStore from '../../stores/useAuthStore';

const UserStats = () => {
  const { user } = useAuthStore();
  const { data: orderInfo } = useUserOrders(user?.uid);
  const { data, isLoading, error } = useUserData(user?.uid);

  useEffect(() => {
    if (data) {
      console.log('사용자 정보:', JSON.stringify(data));
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return <>에러</>;

  return (
    <div className="flex divide-x-1 divide-solid divide-gray-300 border-t border-b border-gray-300 ">
      {/* 포인트 박스  */}
      <div className="flex items-center gap-4 px-4">
        <Link
          to="/pointhistory"
          className="flex-1 flex items-center gap-2 justify-around  py-4">
          {/* 포인트 제목 */}
          <div className="flex-none flex gap-2 items-center">
            <LiaCoinsSolid size={30} />
            <div>포인트</div>
          </div>

          {/* 포인트 점수 */}
          <div>
            <strong className="stat-value text-primary">
              {data && data.points}
            </strong>
            포인트
          </div>
        </Link>

        {/* 포인트 충전 버튼 */}
        <Modal
          buttonTitle="충전"
          modalId="addPoint"
          title="포인트 충전">
          <PointModal />
        </Modal>
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
