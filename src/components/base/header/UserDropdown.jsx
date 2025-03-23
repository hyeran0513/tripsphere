import { BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useUserData } from '../../../hooks/useUserData';
import useAuthStore from '../../../stores/useAuthStore';

const UserDropdown = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const { data: userData } = useUserData();

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle fill-current">
        <BiUser className="h-5 w-5" />
      </div>

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {isAuthenticated && (
          <li>
            <Link to="/mypage">{userData?.username}님 마이페이지</Link>
          </li>
        )}
        <li>
          {isAuthenticated ? (
            <button
              type="button"
              onClick={logout}>
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
    </div>
  );
};

export default UserDropdown;
