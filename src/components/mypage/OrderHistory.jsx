import { BiUser, BiCalendarAlt, BiBuildings } from 'react-icons/bi';
import { HiOutlineTicket } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { compareToday, formatDate, formatNumber } from '../../utils/format';
import { useOrderData } from '../../hooks/useOrderData';
import Loading from '../common/Loading';
import useAuthStore from '../../stores/useAuthStore';
import { useEffect } from 'react';

const OrderHistory = () => {
  const { user } = useAuthStore();
  const { data: orderInfo, isLoading, error } = useOrderData(user?.uid);

  useEffect(() => {
    if (orderInfo) {
      console.log(JSON.stringify(orderInfo));
    }
  }, [orderInfo]);

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
        {orderInfo?.map((order, index) => (
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
                  <div className=" text-md uppercase font-bold text-2xl">
                    {order.room?.name}
                    <p className="flex items-center gap-1 text-gray-500 text-xs mt-2">
                      <BiBuildings />
                      {order.accom.name}
                    </p>
                  </div>

                  <div className="flex-col flex gap-[4px] mt-auto">
                    <div className="flex items-center gap-2 text-xs">
                      <BiUser />
                      <div className="mr-1 text-xs">
                        인원수 (성인: {order.room.capacity.adults}명 소아:
                        {order.room.capacity.children}
                        명)
                      </div>
                    </div>

                    <div className="flex items-center gap-10">
                      <div className="flex items-center gap-2 text-xs">
                        <BiCalendarAlt />
                        <span>체크인:</span>
                        <span>{formatDate(order.room.check_in)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <BiCalendarAlt />
                        <span>체크아웃:</span>
                        <span>{formatDate(order.room.check_out)}</span>
                      </div>
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
