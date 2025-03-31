import { BiUser } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { useUserData } from '../../../hooks/useUserData';
import useAuthStore from '../../../stores/useAuthStore';
import { useState, useRef } from 'react';
import { useClickAway } from 'react-use';

const UserDropdown = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const { data: userData } = useUserData();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useClickAway(dropdownRef, () => setIsOpen(false));

  return (
    <div
      className="relative"
      ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="btn btn-ghost btn-circle fill-current">
        <BiUser className="h-5 w-5" />
      </button>

      {isOpen && (
        <ul className="absolute right-0 z-10 mt-2 w-52 rounded-box bg-base-100 p-2 shadow menu menu-sm">
          {isAuthenticated && (
            <li>
              <Link to="/mypage">{userData?.username}님 마이페이지</Link>
            </li>
          )}
          <li>
            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}>
                로그아웃
              </button>
            ) : (
              <Link to="/signin">로그인</Link>
            )}
          </li>
          <li>
            <Link to="/signup">회원가입</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserDropdown;
