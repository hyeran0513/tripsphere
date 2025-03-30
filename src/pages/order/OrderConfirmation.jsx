import { useLocation, useNavigate } from 'react-router-dom';
import OrderState from '../../components/order/orderConfirmation/OrderConfirmState';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="max-w-[1200px] mx-auto py-[40px] flex flex-col justify-start items-center gap-12">
      <div className="flex flex-col items-center">
        {/* 주문 문구 */}
        <OrderState />

        <div className="flex justify-center gap-x-2 mt-8">
          {/* 마이페이지로 이동 버튼 */}
          <button
            type="submit"
            onClick={() => navigate('/mypage')}
            className="cursor-pointer rounded-md border-1 border-stone-300 px-3 py-2 text-sm font-semibold text-black dark:text-white hover:shadow-xs hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors">
            마이페이지로 이동
          </button>

          {/* 홈으로 이동*/}
          <button
            type="submit"
            onClick={() => navigate('/')}
            className="cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors">
            홈으로 이동
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
