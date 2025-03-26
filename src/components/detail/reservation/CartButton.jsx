import React from 'react';
import { useAddCarts } from '../../../hooks/useCartData';
import { formatToTimestamp } from '../../../utils/format';
import { serverTimestamp } from 'firebase/firestore';
import useAuthStore from '../../../stores/useAuthStore';

const CartButton = ({
  productId,
  showToast,
  checkIn,
  checkOut,
  adultCount,
  childrenCount,
  totalPrice,
}) => {
  const { user } = useAuthStore();

  // firebase에 장바구니 추가
  const { mutate } = useAddCarts(user?.uid, showToast);

  // 장바구니 추가
  const handleAddToCart = (e) => {
    e.preventDefault();

    mutate({
      accommodation_id: productId,
      check_in: formatToTimestamp(checkIn),
      check_out: formatToTimestamp(checkOut),
      guest_count: { adults: adultCount, children: childrenCount },
      cart_date: serverTimestamp(),
      user_id: user?.uid,
      total_price: totalPrice,
    });
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="text-base font-medium flex-1 border border-gray-300 px-8 py-3 rounded hover:bg-gray-100 cursor-pointer">
      장바구니
    </button>
  );
};

export default CartButton;
