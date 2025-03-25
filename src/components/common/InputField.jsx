import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PasswordToggle from './PasswordToggle';
import { Link } from 'react-router-dom';

const InputField = ({
  label,
  type,
  value,
  placeholder,
  onChange,
  error,
  showPassword,
  onTogglePassword,
  disabled,
  isResetPassword,
}) => {
  return (
    <div>
      {/* 라벨 영역 */}
      <div className="flex items-center justify-between">
        <label
          htmlFor={label}
          className="dark:text-gray-400 block text-sm font-medium text-gray-900">
          {label}
        </label>

        {isResetPassword && (
          <div className="text-sm">
            <Link
              to="/resetpassword"
              className="font-semibold text-indigo-600 hover:text-indigo-500">
              비밀번호 재설정
            </Link>
          </div>
        )}
      </div>
      <div className="mt-2 relative">
        {/* 인풋 영역 */}
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          className={`dark:text-white block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm ${
            error ? 'outline-red-600' : 'outline-gray-300 '
          } ${disabled ? 'bg-gray-100 cursor-not-allowed dark:bg-gray-800' : ''}`}
        />

        {/* 비밀번호일 경우, 패스워드 토글 노출 */}
        {type === 'password' && (
          <PasswordToggle
            showPassword={showPassword}
            onTogglePassword={onTogglePassword}
          />
        )}
      </div>

      {/* 오류 문구 */}
      {error && <p className="mt-2 text-red-600 text-xs">{error}</p>}
    </div>
  );
};

export default InputField;
