import React from 'react';
import { useAddCarts } from '../../hooks/useCartData';
import { serverTimestamp } from 'firebase/firestore';
import useAuthStore from '../../stores/useAuthStore';
import { BiCart } from 'react-icons/bi';

const CartAddButton = ({ productId, showToast }) => {
  const { user, isAuthenticated } = useAuthStore();

  // firebase에 장바구니 추가
  const { mutate } = useAddCarts(user?.uid, showToast);

  // 장바구니 추가
  const handleAddToCart = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      showToast('error', '로그인 후 장바구니 기능을 이용하실 수 있습니다.');
      document.getElementById('dayUse').close();
      return;
    }

    mutate({
      user_id: user?.uid,
      room_id: productId,
      created_at: serverTimestamp(),
    });
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="flex items-center justify-center w-[38px] h-[38px] text-gray-600 hover:text-white border border-gray-600 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm text-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-500 dark:focus:ring-gray-800 cursor-pointer">
      <BiCart className="text-lg" />
    </button>
  );
};

export default CartAddButton;
