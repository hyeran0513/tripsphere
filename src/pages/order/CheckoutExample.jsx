import { useEffect, useState } from 'react';
import { useRoomData } from '../../hooks/useProductData';
import useRoomSelectionStore from '../../stores/useRoomSelectionStore';
import { formatNumber } from '../../utils/format';
import ToggleJson from '../../components/common/ToggleJson';
import Loading from '../../components/common/Loading';
import ToggleOrderList from '../../components/order/checkout/ToggleOrderList';

const CheckoutExample = () => {
  const { reservationInfo } = useRoomSelectionStore();
  const [roomIds, setRoomIds] = useState([]);

  useEffect(() => {
    if (reservationInfo) {
      const newRoomIds = reservationInfo.map((info) => info.room_id);
      setRoomIds(newRoomIds);
    }
  }, [reservationInfo]);

  const { data } = useRoomData(roomIds);

  useEffect(() => {
    if (roomIds.length > 0) {
      console.log('roomIds 변경됨:', roomIds);
    }
  }, [roomIds]);

  if (!data) return <Loading />;

  return (
    <div className="max-w-[1200px] mx-auto px-[20px] py-[40px] dark:text-gray-200">
      <ToggleJson>
        <p className="text-lg font-semibold">store에 저장된 값</p>
        {reservationInfo && (
          <pre className="text-sm">
            {JSON.stringify(reservationInfo, null, 2)}
          </pre>
        )}{' '}
        <br />
        <p className="text-lg font-semibold">
          store의 roomId를 이용해서 가져온 숙소 및 객실 값
        </p>
        {data && <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>}
      </ToggleJson>

      <div className="flex space-y-6 gap-10 py-[30px] max-lg:flex-col max-lg:items-center">
        {/* 주문 결제 정보 */}
        <div className="flex-10/12 max-lg:w-full">
          <div className="px-4 sm:px-0">
            <h3 className="text-base/7 font-semibold">주문 결제</h3>
            <p className="mt-1 max-w-2xl text-sm/6 text-gray-500 dark:text-gray-400">
              결제 정보를 확인해 주세요.
            </p>
          </div>

          <ToggleOrderList data={data} />
        </div>

        {/* 최종 결제 금액 */}
        <div className="sticky card top-15 w-96">
          <div className="shadow-sm dark:border-gray-400 dark:border-1 bg-base-100">
            <aside className="card-body">
              <div className="dark:font-bold">
                <h2 className="card-title mb-2">최종 결제 금액</h2>

                <div className="flex justify-between py-2">
                  <p>주문 금액</p>
                  <p className="flex justify-end">
                    {formatNumber(
                      data?.original_price * (1 - data?.discount_rate),
                    )}
                    원
                  </p>
                </div>

                <div className="border-t border-gray-200">
                  <div className="flex justify-between py-4">
                    <p>주문 총액</p>
                    <p className="flex justify-end">
                      {formatNumber(
                        data?.original_price * (1 - data?.discount_rate),
                      )}
                      원
                    </p>
                  </div>

                  <div className="flex justify-between py-4 text-red-600 dark:text-red-400">
                    <p>사용 포인트</p>
                    <p className="flex justify-end">
                      {formatNumber(
                        data?.original_price * (1 - data?.discount_rate),
                      )}
                      원
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200">
                  <div className="flex justify-between py-4">
                    <p>결제 후 잔여 포인트</p>
                    <p className="flex justify-end">
                      {formatNumber(
                        1000000 -
                          data?.original_price * (1 - data?.discount_rate),
                      )}
                      원
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-actions justify-end">
                <button
                  type="button"
                  onClick={(e) => {}}
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
                  결제하기
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutExample;
