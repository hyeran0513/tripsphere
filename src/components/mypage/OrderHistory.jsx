import { BiUser, BiCalendarAlt, BiBuildings } from 'react-icons/bi';
import { HiOutlineTicket } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import {
  compareToday,
  formatDate,
  formatNumber,
  formatTimeStampTime,
} from '../../utils/format';
import { useOrderData } from '../../hooks/useOrderData';
import Loading from '../common/Loading';
import useAuthStore from '../../stores/useAuthStore';
import { PiBabyLight } from 'react-icons/pi';

const OrderHistory = () => {
  const { user } = useAuthStore();
  const { data: orderInfo, isLoading, error } = useOrderData(user?.uid);

  if (isLoading) return <Loading />;
  if (error) return <>{error.message}</>;

  return (
    <>
      <div className="mt-8 p-4 pb-2 text-xs opacity-60 tracking-wide flex justify-between">
        <h2 className="flex items-center gap-2 font-bold text-xl">
          <HiOutlineTicket size={20} /> 주문 내역
        </h2>

        <Link
          to="/orderhistory"
          className="text-primary font-bold">
          더 보기
        </Link>
      </div>

      <ul className="list bg-base-100 rounded-box shadow-md mb-10">
        {orderInfo?.slice(0, 3).map((order, index) => (
          <li
            className="list-row flex-col flex"
            key={index}>
            <div className="text-xs uppercase font-bold flex items-center justify-start gap-4">
              {compareToday(order.room.check_in) && (
                <div className="badge badge-soft badge-primary text-xs">
                  {compareToday(order.room.check_in)}
                </div>
              )}
              <h4 className="text-md opacity-60 flex gap-2">
                {formatDate(order.order_date)}
                <div>
                  {order.payment_status === 'completed' ? '결제완료' : '취소'}
                </div>
              </h4>
              <div className="ml-auto"> 예약번호 : {order.id} </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-6">
                <img
                  className="size-24 rounded-box"
                  src={order.room?.images?.[0] || 'https://place-hold.it/96'}
                  alt={order.room?.name || '숙소 정보 없음'}
                />

                <div className="flex flex-col">
                  <div className="text-md font-bold mb-2">
                    {order.room?.name}
                    <p className="flex items-center gap-1 text-gray-500 text-xs mt-2">
                      <BiBuildings />
                      {order.accom.name}
                    </p>
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
              <div>
                {formatNumber(
                  order.room.original_price * (1 - order.room.discount_rate),
                )}
                원
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default OrderHistory;
