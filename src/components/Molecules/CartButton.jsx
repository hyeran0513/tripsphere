import { useCartItems } from '../../hooks/useCartData';
import useAuthStore from '../../stores/useAuthStore';

const CartButton = ({ onClick }) => {
  const { user } = useAuthStore();
  const { data } = useCartItems(user?.uid);

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        className="btn btn-ghost btn-circle"
        onClick={onClick}
        aria-label="장바구니 버튼">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
            role="img"
            aria-label="장바구니 아이콘">
            <title>장바구니</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 
          2.293c-.63.63-.184 1.707.707 1.707H17m0 
          0a2 2 0 100 4 2 2 0 000-4zm-8 
          2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span
            className="badge badge-sm indicator-item"
            aria-label={`장바구니 ${data?.length || 0}건`}>
            {data?.length || 0}
          </span>
        </div>
      </button>
    </div>
  );
};

export default CartButton;
