import Logo from '../Atoms/Logo';
import CartButton from '../Molecules/CartButton';
import UserDropdown from '../Atoms/UserDropdown';
import ShoppingCart from '../Organisms/ShoppingCart';
import { useState } from 'react';
import ThemeToggleButton from '../Atoms/ThemeToggleButton';
import useAuthStore from '../../stores/useAuthStore';

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

        {/* 우측 버튼 영역 */}
        <div className="navbar-end">
          <div className="flex items-center gap-2">
            {/* 테마 버튼 */}
            <ThemeToggleButton />

            {/* 장바구니 버튼 */}
            {isAuthenticated && <CartButton onClick={toggleCart} />}

            {/* 유저 드롭다운 */}
            <UserDropdown />
          </div>
        </div>
      </div>

      {/* 장바구니 모달 */}
      <ShoppingCart
        open={open}
        setOpen={setOpen}
      />
    </header>
  );
};

export default Header;
