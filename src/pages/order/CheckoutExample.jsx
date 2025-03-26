import { useEffect, useState } from 'react';
import { BiHotel } from 'react-icons/bi';
import { FaMapLocationDot } from 'react-icons/fa6';
import KakaoMap from '../../components/common/KakaoMap';
import OrderList from '../../components/order/checkout/OrderList';
import { useRoomData } from '../../hooks/useProductData';
import useRoomSelectionStore from '../../stores/useRoomSelectionStore';
import { formatNumber, formatTimeStampTime } from '../../utils/format';
import { PiBabyLight } from 'react-icons/pi';
import { BiX, BiTrash, BiUser, BiMap } from 'react-icons/bi';
import ServiceList from '../../components/common/ServiceList';
import RoomTypeMapping from '../../components/common/RoomTypeMapping';
import ToggleJson from '../../components/common/ToggleJson';

const CheckoutExample = () => {
  const { reservationInfo } = useRoomSelectionStore();
  const [saveRoomId, setSaveRoomId] = useState(null);
  const { data } = useRoomData(saveRoomId);

  useEffect(() => {
    if (reservationInfo?.roomId) {
      setSaveRoomId(reservationInfo.roomId);
    }
  }, [reservationInfo?.roomId]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (!reservationInfo || !reservationInfo.roomId) {
    return <div>Loading...</div>;
  }

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

          <ul>
            <li className="mt-6 border-t ">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium">숙소명</dt>
                  <dd className="mt-1 text-sm/6  sm:col-span-2 sm:mt-0">
                    {data?.accomData?.name}
                  </dd>
                </div>

                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium">객실명</dt>
                  <dd className="mt-1 text-sm/6  sm:col-span-2 sm:mt-0 flex items-center gap-2">
                    {data?.name} <RoomTypeMapping type={data?.type} />
                  </dd>
                </div>

                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium ">예약 정보</dt>
                  <dd className="mt-2 text-sm sm:col-span-2 sm:mt-0">
                    <ul
                      role="list"
                      className="divide-y divide-gray-200 rounded-md border border-gray-200">
                      <OrderList
                        IconComponent={FaMapLocationDot}
                        Title={'숙소 위치'}
                        description={`${data?.accomData?.location?.city}
                                ${data?.accomData?.location?.sub_city}`}
                      />
                      <div className="border-t border-gray-100 h-">
                        <div className="divide-y divide-gray-100">
                          <KakaoMap
                            latitude={data?.accomData?.location?.latitude}
                            longitude={data?.accomData?.location?.longitude}
                          />
                        </div>
                      </div>

                      <OrderList
                        IconComponent={BiHotel}
                        Title={'숙박 시설'}
                        type={data?.accomData?.type}
                      />

                      <li>
                        <div className="py-4 px-6 flex flex-col gap-3">
                          {/* 체크인 · 체크아웃 */}
                          체크인: {formatTimeStampTime(data?.check_in)} ~
                          체크아웃: {formatTimeStampTime(data?.check_out)}
                          <span className="flex items-center gap-1">
                            <BiUser /> 성인 {data?.capacity?.adults || 0}명
                          </span>
                          <span className="flex items-center gap-1">
                            <PiBabyLight /> 미성년자{' '}
                            {data?.capacity?.children || 0}명
                          </span>
                        </div>
                      </li>
                    </ul>
                  </dd>
                </div>

                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ">
                  <dt className="text-sm/6 font-medium">호스트 연락처</dt>
                  <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0">
                    {data?.accomData?.host?.contact}
                  </dd>
                </div>

                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium ">객실 소개</dt>
                  <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0">
                    {data?.description}
                  </dd>
                </div>

                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium">서비스</dt>
                  <dd className="mt-2 text-sm sm:col-span-2 sm:mt-0">
                    {data?.services && (
                      <ServiceList services={data?.services} />
                    )}
                  </dd>
                </div>
              </dl>
            </li>
          </ul>
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
