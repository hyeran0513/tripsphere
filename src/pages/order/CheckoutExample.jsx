import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoomData } from '../../hooks/useProductData';
import { createUserOrder } from '../../services/orderService';
import { usedPoints } from '../../services/pointService';
import { fetchUserData } from '../../services/userService';
import useRoomSelectionStore from '../../stores/useRoomSelectionStore';
import { formatNumber } from '../../utils/format';
import ToggleOrderList from '../../components/order/checkout/ToggleOrderList';

// 1. 카트 상품 동시 결제 테스트
// 1-1. 카트 상품 동시 결제시 카트 정보 비우기 필요.
// 2. 상품 결제 페이지 벗어날때 예약정보 초기화 필요?
// 3. 잔액부족으로 인한 결제 실패 테스트 필요

const CheckoutExample = () => {
  const { reservationInfo } = useRoomSelectionStore();

  console.log('reservationInfo : ', reservationInfo);
  // 방 아이디 일괄저장할 상태
  const [saveRoomId, setSaveRoomId] = useState(null);
  // 객실정보 조회 결과를 저장할 상태
  const { data, isLoading, error } = useRoomData(saveRoomId);
  const [roomDataArray, setRoomDataArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const [userInfo, setUserInfo] = useState(null);

  // 버튼 클릭시 동작
  const payment = async (event) => {
    event.preventDefault();
    console.log('payPoint : ', totalPrice);

    const orderResult = [];
    console.log('roomDataArray :: ', roomDataArray);
    console.log('reservationInfo :: ', reservationInfo);

    for (let room of roomDataArray) {
      console.log('room : ', room);
    }

    // 1. DB에서 불러온 유저의 포인트와 상품목록의 금액 합산을 비교
    if (user.points < totalPrice) {
      // 2-1. 비교결과 유저의 포인트가 적다면
      // 유저의 포인트는 처리하지 않고,
      // 결제 내역 (컬랙션 order)에 주문 취소 or 주문 실패로 남긴다
      for (let room of roomDataArray.flat()) {
        console.log(
          'let room of roomDataArray roomDataArray: ',
          roomDataArray.flat(),
        );
        console.log('let room of roomDataArray room: ', room);
        console.log(
          'let room of roomDataArray room.accommodation_id : ',
          room.accommodation_id,
        );

        const reservationInfoEle = reservationInfo.filter((ele) => {
          console.log(ele);
          ele.id === room.id;
        });

        const orderId = await createUserOrder({
          userId: user.uid,
          room: room.roomId,
          accomId: room.accommodation_id,
          checkin: room.check_in,
          checkout: room.check_out,
          status: 'canceled',
          points: 0,
          selectedTime: reservationInfoEle.selectedTime
            ? reservationInfoEle.selectedTime
            : [],
        });

        // 주문아이디, 유저아이디, 방 정보, 숙소아이디, 주문정보 전달
        console.log('orderReulst :: ', {
          orderId,
          userId: user.uid,
          room: room,
          accomId: room.accommodation_id,
          reservationInfo: reservationInfoEle,
        });
        orderResult.push({
          orderId,
          userId: user.uid,
          room: room,
          accomId: room.accommodation_id,
          reservationInfo: reservationInfoEle,
        });
      }
    } else {
      // 2-2. 비교결과 상품 합계가 적다면
      // 유저의 포인트 감소시킨 쿼리 결과 반영후
      // 결제 내역 (컬랙션 order)을 생성한다.
      for (let room of roomDataArray.flat()) {
        console.log(
          'let room of roomDataArray roomDataArray: ',
          roomDataArray.flat(),
        );
        console.log('let room of roomDataArray room: ', room);
        console.log(
          'let room of roomDataArray room.accommodation_id : ',
          room.accommodation_id,
        );

        usedPoints({
          userId: user.uid,
          points: room.original_price * (1 - room.accomData.discount_rate),
        });

        console.log('room info for compare reservation : ', room);
        const reservationInfoEle = reservationInfo.filter((ele) => {
          console.log(ele);
          ele.id === room.id;
        });
        console.log('reservationInfoEle : ', reservationInfoEle);

        // 주문정보 입력
        const orderId = await createUserOrder({
          userId: user.uid,
          room: room.roomId,
          accomId: room.accommodation_id,
          checkin: room.check_in,
          checkout: room.check_out,
          points: room.original_price * (1 - room.accomData.discount_rate),
          selectedTime: reservationInfoEle.selectedTime
            ? reservationInfoEle.selectedTime
            : [],
        });

        // 주문아이디, 유저아이디, 방 정보, 숙소아이디, 주문정보 전달
        console.log('orderReulst :: ', {
          orderId,
          userId: user.uid,
          room: room,
          accomId: room.accommodation_id,
          reservationInfo: reservationInfoEle,
        });
        orderResult.push({
          orderId,
          userId: user.uid,
          room: room,
          accomId: room.accommodation_id,
          reservationInfo: reservationInfoEle,
        });
      }
    }
    navigate('/orderconfirmation', { state: { orderList: [...orderResult] } });
  };

  // 유저의 아이디, 포인트 정보 호출용
  useEffect(() => {
    setLoading(true);
    console.log(user.uid);

    const userDataWait = async (uid) => {
      const data = await fetchUserData(uid);
      console.log(data);
      setUserInfo(data);
      setLoading(false);
    };
    userDataWait(user.uid);
  }, []);

  // 방 아이디 일괄저장
  useEffect(() => {
    if (reservationInfo) {
      const newRoomIds = reservationInfo.map((info) => {
        return info.room_id;
      });
      setSaveRoomId(newRoomIds);
    }

    console.log('SaveRoomId : ', saveRoomId);
  }, [reservationInfo]);

  // 데이터가 로드되면 roomDataArray에 추가
  useEffect(() => {
    if (data) {
      // 이미 배열에 있는지 확인
      const exists = roomDataArray.some((room) => room.id === data.id);
      if (!exists) {
        setRoomDataArray((prev) => [...prev, data]);
      }
    }
    console.log('checkout - data : ', data);
  }, [data]);

  useEffect(() => {
    console.log('saveRoomId, isLoading, error :', saveRoomId, isLoading, error);
  }, [saveRoomId, isLoading, error]);

  // // 여러 객실 ID 처리
  // useEffect(() => {
  //   if (reservationInfo && reservationInfo.length > 0) {
  //     reservationInfo.map((ele) => {
  //       // 이미 처리된 roomId는 제외하고 하나씩 처리
  //       const processRoomIds = async () => {
  //         for (const roomId of ele.room_id) {
  //           // 이미 처리된 roomId인지 확인
  //           const exists = roomDataArray.some((room) => room.id === roomId);
  //           if (!exists) {
  //             setSaveRoomId(roomId);
  //             // 각 roomId 설정 후 약간의 지연을 줘서 데이터가 로드될 시간을 확보
  //             await new Promise((resolve) => setTimeout(resolve, 100));
  //           }
  //         }
  //       };

  //       processRoomIds();
  //     });
  //   }

  //   console.log(saveRoomId);
  // }, [reservationInfo, roomDataArray]);

  // 총 가격 계산
  useEffect(() => {
    if (roomDataArray.length > 0) {
      console.log('roomDataArray : ', roomDataArray);
      // const total = roomDataArray.reduce((sum, room) => {
      //   console.log('room : ', room);

      //   room.map((ele, index) => {
      //     ele.original_price;
      //     console.log(`room[${index}].original_price : `, ele.original_price);
      //     console.log(`room[${index}].original_price: `, ele.original_price);
      //     console.log(`room[${index}].accomData : `, ele.accomData);
      //     console.log(
      //       'sum + ele.original_price * (1 - ele.accomData.discount_rate) :',
      //       sum + ele.original_price * (1 - ele.accomData.discount_rate),
      //     );
      //     return sum + ele.original_price * (1 - ele.accomData.discount_rate);
      //   });
      // }, 0);
      const total = roomDataArray.flat().reduce((sum, room) => {
        console.log('room : ', room);
        console.log('room.original_price: ', room.original_price);
        console.log('room.accomData : ', room.accomData);

        return sum + room.original_price * (1 - room.accomData.discount_rate);
      }, 0);
      setTotalPrice(total);
      console.log('total : ', total);
    }
  }, [roomDataArray]);

  useEffect(() => {
    console.log('roomDataArray:', roomDataArray);
  }, [roomDataArray, userInfo]);

  if (!reservationInfo || reservationInfo.length === 0) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>유저 정보를 로드 중...</div>;
  }

  // 데이터가 아직 로드되지 않았거나 roomDataArray가 비어있는 경우
  if (roomDataArray.length === 0) {
    return <div>객실 정보를 로드 중...</div>;
  } else {
    console.log('roomDataArray : ', roomDataArray);
  }

  return (
    <div className="max-w-[1200px] mx-auto px-[20px] py-[40px] dark:text-gray-200">
      {/* <ToggleJson>
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
      </ToggleJson> */}

      <div className="flex space-y-6 gap-10 py-[30px] max-lg:flex-col max-lg:items-center">
        {/* 주문 결제 정보 */}
        <div className="flex-10/12 max-lg:w-full">
          <div className="mb-5 px-4 sm:px-0">
            <h3 className="text-base/7 font-semibold">주문 결제</h3>
            <p className="mt-1 max-w-2xl text-sm/6 text-gray-500 dark:text-gray-400">
              결제 정보를 확인해 주세요.
            </p>
          </div>

          <div className="flex gap-10">
            <ToggleOrderList data={data} />

            {/* 최종 결제 금액 */}
            <div className="sticky card top-[100px] w-[340px]">
              <div className="shadow-sm dark:border-gray-400 dark:border-1 bg-base-100">
                <aside className="card-body">
                  <div className="dark:font-bold">
                    <h2 className="card-title mb-2">최종 결제 금액</h2>

                    <div className="flex justify-between py-2">
                      {/* <p>주문 정보</p>
                  <p className="flex justify-end"> */}
                      {/* {formatNumber(
                      data?.original_price * (1 - data?.discount_rate),
                    )}
                    원 */}
                      {/* </p> */}
                    </div>
                    {roomDataArray.flat().map((data, index) => {
                      console.log(
                        '주문정보 roomDataArray.flat().map((data :',
                        data,
                      );
                      return (
                        <div
                          className="flex justify-between py-2"
                          key={index}>
                          <p>
                            {data.accomData.name} - {data.name}
                          </p>
                          <p className="flex justify-end">
                            {formatNumber(
                              data.original_price *
                                (1 - data.accomData.discount_rate),
                            )}
                            원
                          </p>
                        </div>
                      );
                    })}

                    <div className="border-t border-gray-200">
                      <div className="flex justify-between py-4">
                        <p>주문 총액</p>
                        <p className="flex justify-end">
                          {formatNumber(totalPrice)}원
                        </p>
                      </div>

                      <div className="flex justify-between py-4 text-red-600 dark:text-red-400">
                        <p>사용 포인트</p>
                        <p className="flex justify-end">
                          {formatNumber(totalPrice)}원
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200">
                      <div className="flex justify-between py-4">
                        <p>결제 후 잔여 포인트</p>
                        <p className="flex justify-end">
                          {formatNumber(userInfo.points - totalPrice)}원
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card-actions justify-end">
                    <button
                      type="button"
                      onClick={(e) => {
                        payment(e);
                      }}
                      className="cursor-pointer flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
                      결제하기
                    </button>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutExample;
