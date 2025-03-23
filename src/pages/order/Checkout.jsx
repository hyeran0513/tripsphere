import { useState } from 'react';
import { BiHotel } from 'react-icons/bi';
import { FaMapLocationDot } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import KakaoMap from '../../components/common/KakaoMap';
import PeopleSelector from '../../components/common/PeopleSelector';
import ServiceIcon from '../../components/common/ServiceIcon';
import OrderList from '../../components/order/checkout/OrderList';
import OrderSummary from '../../components/order/checkout/OrderSummary';
import DateSelector from '../../components/common/DateSelector';
import useReservationStore from '../../stores/useReservationStore';

const accommodation = {
  id: '1',
  type: 'pension',
  name: '양평 독채 풀빌라 스테이호은',
  check_in: '2025.03.11',
  check_out: '2025.03.13',
  description:
    '예약 전 숙소 이용 안내 및 이용 수칙을 반드시 읽어주세요. 호젓한 은신처를 의미하는 호은.',
  original_price: '80000',
  discount_rate: '20',
  final_price: '64000',
  images: [
    'https://ak-d.tripcdn.com/images/220713000000ubfbb2422_R_600_400_R5.webp',
    'https://search.pstatic.net/common/?src=%22https%3A%2F%2Fimg.tripplat.com%2Fdomestic%2Fproduct%2Fpackage%2F5%2Fb1df43231016311a21c18139bcda6d08%2Fd2071f084774e9d137837f63a757b432.jpg%22&type=m1500',
    'https://search.pstatic.net/common?src=https://img.tripplat.com/domestic/product/package/63/745afb46c4487cb27af34116d44ca34f/2bc579ebce57266a57247ff884947fe7.jpg&type=f174_174',
    'https://search.pstatic.net/common/?src=%22https%3A%2F%2Fimg.tripplat.com%2Fdomestic%2Fproduct%2Fpackage%2F5%2Fb1df43231016311a21c18139bcda6d08%2Fd2071f084774e9d137837f63a757b432.jpg%22&type=m1500',
    'https://search.pstatic.net/common/?src=%22https%3A%2F%2Fimg.tripplat.com%2Fdomestic%2Fproduct%2Fpackage%2F92%2F39eecb19671866113575816b92ff5ac3%2F14de7183c8784b2b44d7a08bf1ef0a7c.png%22&type=m1500',
  ],
  host: {
    name: '홍길동',
    experience: '3',
    contact: '010-1234-5678',
  },
  services: ['wifi', 'parking', 'tv', 'breakfast', 'barbecue'],
  location: {
    latitude: '33.450701',
    longitude: '126.570667',
    place_name: '양평군, 경기도, 한국',
  },
};

const orderInfo = {
  commission: '1000',
  total_price: '10000',
  used_points: '800',
  userInfo: {
    points: '900',
  },
};

const serviceNames = {
  wifi: '와이파이',
  parking: '주차장',
  tv: 'TV',
  breakfast: '조식',
  barbecue: '바비큐',
};

const Checkout = () => {
  const navigate = useNavigate();
  const [openDate, setOpenDate] = useState(false);
  // const { checkIn, checkOut, adultCount, childrenCount, totalPrice } =
  //   useReservationStore();

  return (
    <div className="max-w-[1200px] mx-auto px-[20px] py-[40px] dark:text-gray-200">
      {/* <div className="inline-block py-4 px-4 bg-gray-100 rounded-md">
        checkIn: {checkIn}
        <br />
        checkOut: {checkOut}
        <br />
        adultCount: {adultCount} <br />
        childrenCount: {childrenCount} <br />
        totalPrice: {totalPrice}
      </div> */}

      <div className="flex space-y-6 gap-10 py-[30px] max-lg:flex-col max-lg:items-center">
        {/* 주문 결제 정보 */}
        <div className="flex-10/12 max-lg:w-full">
          <div className="px-4 sm:px-0">
            <h3 className="text-base/7 font-semibold">주문 결제</h3>
            <p className="mt-1 max-w-2xl text-sm/6 text-gray-500 dark:text-gray-400">
              결제 정보를 확인해 주세요.
            </p>
          </div>

          <div className="mt-6 border-t ">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium">숙소명</dt>
                <dd className="mt-1 text-sm/6  sm:col-span-2 sm:mt-0">
                  {accommodation.name}
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
                      description={accommodation.location.place_name}
                    />
                    <div className="border-t border-gray-100 h-">
                      <div className="divide-y divide-gray-100">
                        <KakaoMap
                          latitude={accommodation.location.latitude}
                          longitude={accommodation.location.longitude}
                        />
                      </div>
                    </div>

                    <OrderList
                      IconComponent={BiHotel}
                      Title={'숙박 시설'}
                      type={accommodation.type}
                    />

                    <li>
                      <div className="py-4 px-6">
                        {/* 체크인 · 체크아웃 */}
                        <DateSelector
                          openDate={openDate}
                          setOpenDate={setOpenDate}
                        />

                        {/* 인원수 */}
                        <PeopleSelector />
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ">
                <dt className="text-sm/6 font-medium">호스트 연락처</dt>
                <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0">
                  {accommodation.host.contact}
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium ">숙소 소개</dt>
                <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0">
                  {accommodation.description}
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium">서비스</dt>
                <dd className="mt-2 text-sm sm:col-span-2 sm:mt-0">
                  <ul
                    role="list"
                    className="divide-y divide-gray-100 rounded-md border border-gray-200">
                    {accommodation.services &&
                      accommodation.services.map((service, index) => (
                        <li
                          key={index}
                          className="flex items-center py-4 px-4 text-sm">
                          <div className="flex items-center gap-2">
                            <ServiceIcon
                              key={service}
                              type={service}
                            />
                            <span className="font-medium">
                              {serviceNames[service]}
                            </span>
                          </div>
                        </li>
                      ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* 최종 결제 금액 */}
        <div className="">
          <div className="sticky card top-15 bg-base-100 w-96 shadow-sm dark:border-gray-400 dark:border-1">
            <form className="card-body">
              <OrderSummary orderInfo={orderInfo} />

              <div className="card-actions justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/orderconfirmation')}
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
                  결제하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
