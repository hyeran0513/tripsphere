import Logo from './Logo';
import CartButton from './CartButton';
import UserDropdown from './UserDropdown';
import ShoppingCart from '../../cart/ShoppingCart';
import { useState } from 'react';
import ThemeToggleButton from './ThemeToggleButton';

const Header = () => {
  const [open, setOpen] = useState(false);

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

        {/* 장바구니 사이드 패널 */}
        <ShoppingCart
          open={open}
          setOpen={setOpen}
        />

        {/* 우측 버튼 영역 */}
        <div className="navbar-end">
          <div className="flex items-center gap-2">
            <ThemeToggleButton />
            <CartButton onClick={toggleCart} />
            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
