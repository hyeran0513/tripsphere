import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordToggle = ({ showPassword, onTogglePassword }) => {
  return (
    <button
      type="button"
      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
      onClick={onTogglePassword}>
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  );
};

export default PasswordToggle;
