import OrderCard from './OrderCard';
import { FcApproval, FcCancel, FcClock, FcQuestions } from 'react-icons/fc';

const OrderState = ({ orderList }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <FcApproval size={50} />

      <h1 className="text-4xl font-semibold tracking-tight">
        결제가 완료되었습니다.
      </h1>

      {orderList.map((item, index) => (
        <OrderCard
          data={item}
          index={index}
        />
      ))}
    </div>
  );
};

export default OrderState;
