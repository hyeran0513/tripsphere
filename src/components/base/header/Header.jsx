import Logo from './Logo';
import CartButton from './CartButton';
import UserDropdown from './UserDropdown';
import ShoppingCart from '../../cart/ShoppingCart';
import { useState } from 'react';
import ThemeToggleButton from './ThemeToggleButton';
import useAuthStore from '../../../stores/useAuthStore';

const Header = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const toggleCart = () => {
    setOpen(true);
  };

  return (
    <header className="bg-base-100 shadow-sm fixed w-full z-100">
      <div className="navbar max-w-[1200px] mx-auto">
        {/* 로고 */}
        <div className="navbar-start">
          <Logo />
        </div>

        {/* 장바구니 */}
        <ShoppingCart
          open={open}
          setOpen={setOpen}
        />

        {/* 우측 버튼 영역 */}
        <div className="navbar-end">
          <div className="flex items-center gap-2">
            <ThemeToggleButton />

            {isAuthenticated && <CartButton onClick={toggleCart} />}

            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
