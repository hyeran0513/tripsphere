import { useNavigate } from 'react-router-dom';

const ReservationButton = ({
  setTotalPrice,
  totalPrice,
  setAccommodationId,
  productId,
}) => {
  const navigate = useNavigate();

  // 예약하기 핸들러
  const handleReservation = (e) => {
    e.preventDefault();

    setAccommodationId(productId);
    setTotalPrice(totalPrice);
    navigate('/checkout');
  };

  return (
    <button
      type="button"
      onClick={handleReservation}
      className="text-base font-medium flex-1 border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden rounded cursor-pointer">
      예약하기
    </button>
  );
};

export default ReservationButton;
