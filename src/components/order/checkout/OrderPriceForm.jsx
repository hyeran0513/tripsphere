import React from 'react';
import { formatNumber } from '../../../utils/format';

const OrderPriceForm = () => {
  return (
    <div className="sticky card top-[100px] w-[340px]">
      <div className="shadow-sm dark:border-gray-400 dark:border-1 bg-base-100">
        <aside className="card-body">
          <div className="dark:font-bold">
            <h2 className="card-title mb-2">최종 결제 금액</h2>

            <div className="flex justify-between py-2">
              <p></p>
              <p className="flex justify-end"></p>
            </div>

            <div className="border-t border-gray-200">
              <div className="flex justify-between py-4">
                <p>주문 총액</p>
                <p className="flex justify-end">원</p>
              </div>

              <div className="flex justify-between py-4 text-red-600 dark:text-red-400">
                <p>사용 포인트</p>
                <p className="flex justify-end">원</p>
              </div>
            </div>

            <div className="border-t border-gray-200">
              <div className="flex justify-between py-4">
                <p>결제 후 잔여 포인트</p>
                <p className="flex justify-end">원</p>
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
