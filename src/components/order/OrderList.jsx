import React, { useEffect, useState } from 'react';
import {
  BiBuildings,
  BiCalendarAlt,
  BiChevronRight,
  BiUser,
} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useCancelOrder } from '../../hooks/useOrderData';
import {
  compareToday,
  formatDate,
  formatNumber,
  formatTimeStampTime,
} from '../../utils/format';
import CancelOrderModal from './CancelOrderModal';
import Loading from '../common/Loading';
import { PiBabyLight } from 'react-icons/pi';

const OrderList = ({ orderInfo }) => {
  const navigate = useNavigate();
  const cancelOrderMutation = useCancelOrder();
  const [selectedOrder, setSelectedOrder] = useState(null);

  // 주문 취소 처리
  const handleCancelClick = (order) => {
    setSelectedOrder(order);
  };

  // 주문 취소 요청
  const handleCancelConfirm = (reason) => {
    if (selectedOrder) {
      cancelOrderMutation.mutate({
        orderId: selectedOrder.id,
        userId: selectedOrder.user_id,
        usedPoints: selectedOrder.used_points,
        reason,
      });
    }
  };

  useEffect(() => {
    console.log(JSON.stringify(orderInfo));
  }, [orderInfo]);

  if (!orderInfo) return <Loading />;
  if (orderInfo.length === 0) return <p>주문 결과 정보가 없습니다.</p>;

  return (
    <>
      <ul className="list bg-base-100 dark:bg-gray-800 rounded-box shadow-md py-">
        {orderInfo?.map((order, index) => (
          <li
            key={index}
            className="list-row flex-col flex my-3 mx-5 border-gray-200">
            <div className="border-b border-stone-200 flex justify-between items-center">
              <div>{formatDate(order.order_date)}</div>
              <button
                type="button"
                className="cursor-pointer"
                onClick={() =>
                  navigate(`/product/${order.room.accommodation_id}`)
                }>
                <BiChevronRight className="size-6" />
              </button>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-6">
                <img
                  className="size-24 rounded-box"
                  src={
                    order.room?.images?.[0] || 'https://via.placeholder.com/100'
                  }
                  alt={order.accom.name || '숙소 정보 없음'}
                />

                <div className="flex flex-col">
                  <h2 className="text-lg font-bold">
                    {compareToday(order.room.check_in) && (
                      <div className="mr-2 badge badge-soft badge-primary text-[10px]">
                        {compareToday(order.room.check_in)}
                      </div>
                    )}
                    {order.room.name || '숙소 정보 없음'}
                    <p className="mt-4  flex items-center gap-1 text-gray-500 text-xs">
                      <BiBuildings />
                      {order.accom.name}
                    </p>
                  </h2>

                  <div className="text-xs uppercase opacity-60 pt-1">
                    예약번호 : {order.id}
                  </div>

                  <div className="mt-4">
                    <p className="flex justify-between items-center font-semibold">
                      {order.room.stay_type
                        ? order.room.stay_type === 'stay'
                          ? '숙박'
                          : '대실'
                        : ''}
                    </p>

                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-white">
                      <BiCalendarAlt />
                      {formatDate(order.room?.check_in)}
                      {order.room?.stay_type === 'stay' &&
                        ` - ${formatDate(order.room?.check_out)}`}
                    </div>

                    {/* 체크인 · 체크아웃 */}
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-white">
                      {order.room.stay_type === 'stay' && (
                        <>
                          체크인: {formatTimeStampTime(order.room.check_in)} ~{' '}
                          체크아웃: {formatTimeStampTime(order.room.check_out)}
                        </>
                      )}

                      {order.room.stay_type === 'day_use' && (
                        <>
                          체크인: {order.selectedTime[0]} ~ 체크아웃:{' '}
                          {order.selectedTime[order.selectedTime.length - 1]}
                        </>
                      )}
                    </div>

                    {/* 인원 정보 */}
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-white">
                      <span className="flex items-center gap-1">
                        <BiUser />
                        성인 {order.room.capacity?.adults ?? 0}명
                      </span>
                      <span className="flex items-center gap-1">
                        <PiBabyLight /> 미성년자{' '}
                        {order.room.capacity.children ?? 0}명
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 주문 취소버튼 */}
              <div className="flex flex-col justify-between">
                <div className="text-lg">
                  {formatNumber(
                    order.room.original_price * (1 - order.room.discount_rate),
                  )}
                  원
                </div>
                {order.payment_status === '결제 취소' ? (
                  <span className="text-red-500 font-bold">결제 취소</span>
                ) : (
                  <button
                    className={`cursor-pointer px-3 py-1 rounded-md transition ${
                      compareToday(order.room.check_in)
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-red-500 text-white hover:bg-red-700'
                    }`}
                    onClick={() =>
                      !compareToday(order.room.check_in) &&
                      handleCancelClick(order)
                    }
                    disabled={compareToday(order.room.check_in)}>
                    {compareToday(order.room.check_in)
                      ? '취소 불가'
                      : '주문 취소'}
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {selectedOrder && (
        <CancelOrderModal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onConfirm={handleCancelConfirm}
        />
      )}
    </>
  );
};

export default OrderList;
