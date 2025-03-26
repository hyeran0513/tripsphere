import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrderState from '../../components/order/orderConfirmation/OrderConfirmState';
import SwiperComponent from '../../components/recommendation/SwiperComponent';

const orderInfo = [
  {
    id: 'order1',
    user_id: 'user1',
    accommodation_id: '1',
    check_in: '2025.03.11',
    check_out: '2025.03.13',
    guest_count: '4',
    adults: '3',
    children: '1',
    total_price: '10000',
    payment_status: 'completed',
    order_date: '2025.03.11',
    accommodation: {
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
        email: 'example@naver.com',
        contact: '010-1234-5678',
      },
      services: ['wifi', 'parking', 'tv', 'breakfast', 'barbecue'],
      location: {
        latitude: '33.450701',
        longitude: '126.570667',
        place_name: '양평군, 경기도, 한국',
      },
    },
  },
];

const recommandProducts = [
  {
    id: '1',
    type: 'pension',
    location: {
      place_name: '양평군, 경기도, 한국',
    },
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
    ],
    reviews: {
      rating: '3',
    },
  },
  {
    id: '2',
    type: 'pension',
    location: {
      place_name: '양평군, 경기도, 한국',
    },
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
    ],
    reviews: {
      rating: '3',
    },
  },
  {
    id: '1',
    type: 'pension',
    location: {
      place_name: '양평군, 경기도, 한국',
    },
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
    ],
    reviews: {
      rating: '3',
    },
  },
  {
    id: '2',
    type: 'pension',
    location: {
      place_name: '양평군, 경기도, 한국',
    },
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
    ],
    reviews: {
      rating: '3',
    },
  },
  {
    id: '1',
    type: 'pension',
    location: {
      place_name: '양평군, 경기도, 한국',
    },
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
    ],
    reviews: {
      rating: '3',
    },
  },
  {
    id: '2',
    type: 'pension',
    location: {
      place_name: '양평군, 경기도, 한국',
    },
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
    ],
    reviews: {
      rating: '3',
    },
  },
];

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1200px] mx-auto py-[40px] flex flex-col justify-start items-center gap-12">
      <div className="flex flex-col items-center">
        {/* 주문 문구 */}
        <OrderState orderInfo={orderInfo} />

        <div className="flex justify-center gap-x-2 mt-8">
          {/* 마이페이지로 이동 버튼 */}
          <button
            type="submit"
            onClick={() => navigate('/mypage')}
            className="rounded-md border-1 border-stone-300 px-3 py-2 text-sm font-semibold text-black dark:text-white hover:shadow-xs hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors">
            마이페이지로 이동
          </button>

          {/* 홈으로 이동*/}
          <button
            type="submit"
            onClick={() => navigate('/')}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors">
            홈으로 이동
          </button>
        </div>
      </div>

      {/* 추천 여행 숙소 */}
      <div className="w-full p-3 flex flex-col gap-3">
        <h3>추천 여행 숙소</h3>

        <div className="max-w-[1200px]">
          <SwiperComponent products={recommandProducts} />
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
