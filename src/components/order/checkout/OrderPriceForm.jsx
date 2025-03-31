import { serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../../../hooks/useOrderData';
import { useUserData } from '../../../hooks/useUserData';
import useAuthStore from '../../../stores/useAuthStore';
import useCheckoutStore from '../../../stores/useCheckoutStore';
import useOrderStore from '../../../stores/useOrderStore';
import useRoomSelectionStore from '../../../stores/useRoomSelectionStore';
import { formatNumber } from '../../../utils/format';
import ToastMessage from '../../common/ToastMessage';

const OrderPriceForm = ({ data, reservationInfo }) => {
  const { user } = useAuthStore();
  const { data: userData } = useUserData(user?.uid);
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const { clearReservationInfo } = useRoomSelectionStore();
  const { roomIds, setRoomIds, resetRoomIds } = useCheckoutStore();
  const { setOrderIds } = useOrderStore();

  // 새로고침시 언마운트라고 판단함 -> orderConfirm 페이지 이동시로 변경 필요.
  // useEffect(() => {
  //   return () => {
  //     clearReservationInfo();
  //     resetRoomIds();
  //   };
  // }, []);

  // 토스트 보여주기
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  // 총합 구하기
  const getTotalPrice = (data) => {
    return data?.reduce((total, item) => {
      return total + item.original_price * (1 - item.discount_rate);
    }, 0);
  };

  // 남은 포인트
  const getRemainingPoints = (userPoints, data) => {
    return userPoints - getTotalPrice(data);
  };

  const { mutate } = useCheckout(user?.uid, data, showToast);

  // 결제하기 버튼 클릭
  const handleCheckOut = async (e) => {
    e.preventDefault();
    console.log('reservationInfo reservationInfo : ', reservationInfo);

    console.log('handleCheckOut - data : ', data);
    const updatedData = data.map((item) => {
      console.log('item : ', item);
      const matchedRoom = reservationInfo.find(
        (room) =>
          // console.log('room : ', room);
          // return
          room.room_id === item.roomId,
      );

      console.log('matchedRoom : ', matchedRoom);

      if (matchedRoom && item.stay_type === 'day_use') {
        return {
          ...item,
          duration: matchedRoom.duration,
          selectedTime: matchedRoom.selectedTime,
        };
      }

      return item;
    });

    // 포인트 부족 시 결제 불가
    if (getRemainingPoints(userData.points, updatedData) < 0) {
      showToast('error', '포인트가 부족합니다.');
      return;
    }

    // navigate('/orderconfirmation', { state: updatedData });

    const orderPromises = updatedData.map(
      (item) =>
        new Promise(async (resolve, reject) => {
          try {
            const orderData = {
              user_id: user?.uid,
              room_id: item.roomId,
              order_date: serverTimestamp(),
              payment_status: 'completed',
              used_points: item.original_price * (1 - item.discount_rate),
            };
            console.log('item :', item);
            console.log('orderData before mutate:', orderData);

            if (item.stay_type === 'day_use') {
              orderData.duration = item.duration;
              orderData.selectedTime = item.selectedTime;
            }

            // 다시 한번 로그를 출력
            console.log(
              'orderData after condition 여기서 undefinded 나오면 안됨:',
              orderData,
            );

            // mutate(orderData, {
            //   onSuccess: (response) => {
            //     console.log('orderData : ', orderData);
            //     console.log('response : ', response);
            //     resolve(response);
            //   },
            //   onError: reject,
            // });

            console.log();
            mutate(orderData, {
              onSuccess: (response) => {
                console.log('response : ', response);
                resolve(response);
              },
              onError: (error) => {
                console.error('mutate error : ', error);
                reject(error);
              },
            });
          } catch (error) {
            console.error('Catch orderPromises error:', error);
            resolve(null);
          }
        }),
    );

    const orderIds = await Promise.all(orderPromises);
    // .then((orderIds) => {
    //   console.log('모든 주문 ID:', orderIds);
    //   return orderIds;
    // })
    // .catch((error) => {
    //   console.error('하나 이상의 주문 실패:', error);
    // });

    console.log('orderIds : ', orderIds);
    setOrderIds(orderIds.filter((id) => id !== null && id !== undefined));
    navigate('/orderconfirmation');
  };

  return (
    <>
      <div className="sticky card top-[100px] w-[340px]">
        <div className="shadow-sm dark:border-gray-400 dark:border-1 bg-base-100">
          <aside className="card-body">
            <div className="dark:font-bold">
              <h2 className="card-title mb-2">최종 결제 금액</h2>

              <div className="flex flex-col gap-4 py-4">
                {data?.map((item, index) => (
                  <div
                    className="flex justify-between"
                    key={index}>
                    <p>{item.name}</p>
                    <p className="flex justify-end">
                      {formatNumber(
                        item.original_price * (1 - item.discount_rate),
                      )}
                      원
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 border-t border-gray-200 py-4">
                <div className="flex justify-between text-indigo-600">
                  <p>보유 포인트</p>
                  <p className="flex justify-end">
                    {formatNumber(userData?.points)}원
                  </p>
                </div>

                <div className="flex justify-between">
                  <p>주문 총액</p>
                  <p className="flex justify-end">
                    {formatNumber(getTotalPrice(data))}원
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-gray-200 py-4">
                <div className="flex justify-between">
                  <p>결제 후 잔여 포인트</p>
                  <p
                    className={`flex justify-end ${
                      getRemainingPoints(userData?.points, data) < 0
                        ? 'text-red-500'
                        : 'text-indigo-500'
                    }`}>
                    {formatNumber(getRemainingPoints(userData?.points, data))}원
                  </p>
                </div>
              </div>
            </div>

            <div className="card-actions justify-end">
              <button
                type="button"
                onClick={(e) => handleCheckOut(e)}
                className="cursor-pointer flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
                결제하기
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* 토스트 메시지 */}
      {toast && (
        <ToastMessage
          toast={toast}
          setToast={setToast}
        />
      )}
    </>
  );
};

export default OrderPriceForm;
