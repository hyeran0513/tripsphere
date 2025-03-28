import React from 'react';
import { formatNumber } from '../../../utils/format';
import useAuthStore from '../../../stores/useAuthStore';
import { useUserData } from '../../../hooks/useUserData';

const OrderPriceForm = ({ data }) => {
  const { user } = useAuthStore();
  const { data: userData } = useUserData(user?.uid);

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

  return (
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
                <p className="flex justify-end">{userData.points}원</p>
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
                  className={`flex justify-end ${getRemainingPoints(userData.points, data) < 0 ? 'text-red-500' : 'text-indigo-500'}`}>
                  {formatNumber(getRemainingPoints(userData.points, data))}원
                </p>
              </div>
            </div>
          </div>

          <div className="card-actions justify-end">
            <button
              type="button"
              onClick={(e) => {}}
              className="cursor-pointer flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
              결제하기
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default OrderPriceForm;
