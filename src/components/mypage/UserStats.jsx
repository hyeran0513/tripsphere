import React, { useEffect } from 'react';
import { BiHeart } from 'react-icons/bi';
import { HiOutlineTicket } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { LiaCoinsSolid } from 'react-icons/lia';

import PointModal from './PointModal';
import { useUserData } from '../../hooks/useUserData';
import { useOrderData } from '../../hooks/useOrderData';
import Loading from '../common/Loading';
import Modal from '../common/Modal';
import useAuthStore from '../../stores/useAuthStore';

const UserStats = ({ points, setPoints, pointHistoryRefetch }) => {
  const { user } = useAuthStore();
  const { data: orderInfo } = useOrderData(user?.uid);
  const { data, isLoading, error, refetch } = useUserData(user?.uid);

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return <>에러</>;

  return (
    <div className="stats bg-base-100 border border-base-300  flex justify-between">
      {/* 포인트 박스  */}
      <div className="stat place-items-center">
        <Link to="/pointhistory">
          <div className="stat-title  flex-none flex gap-2 items-center">
            <LiaCoinsSolid size={30} />
            <div>포인트</div>
          </div>
          <div className="stat-value text-center">
            {data && (data.points || 0)}
          </div>
        </Link>

        {/* 포인트 충전 버튼 */}
        <div className="stat-actions mt-2">
          <Modal
            buttonTitle="충전"
            modalId="addPoint"
            title="포인트 충전">
            <PointModal
              points={points}
              setPoints={setPoints}
              pointHistoryRefetch={pointHistoryRefetch}
            />
          </Modal>
        </div>
      </div>

      {/* 주문내역 박스  */}
      <div className="stat place-items-center">
        <Link to="/orderhistory">
          <div className="stat-title flex-none flex gap-2 items-center">
            <HiOutlineTicket size={30} />
            <div>주문 내역</div>
          </div>
          <div className="stat-value text-center">{orderInfo?.length}</div>
        </Link>
      </div>

      {/* 찜내역 박스  */}
      <div className="stat place-items-center">
        <Link to="/favorite">
          <div className="stat-title flex-none flex gap-2 items-center">
            <BiHeart size={30} />
            <div>찜</div>
          </div>

          <div className="stat-value text-center">
            {data && data.wishlist.length}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserStats;
