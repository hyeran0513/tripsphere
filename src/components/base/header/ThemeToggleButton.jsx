import React, { useEffect, useState } from 'react';
import { BiSun, BiMoon } from 'react-icons/bi';

const ThemeToggleButton = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const labelText =
    theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환';

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
        aria-label={labelText}
      />

      {/* 해 아이콘 - 라이트 모드 */}
      <span
        className="btn btn-ghost btn-circle swap-on fill-current"
        aria-hidden="true">
        <BiSun className="h-5 w-5" />
      </span>

      {/* 달 아이콘 - 다크 모드 */}
      <span
        className="btn btn-ghost btn-circle swap-off fill-current"
        aria-hidden="true">
        <BiMoon className="h-5 w-5" />
      </span>
    </label>
  );
};

export default ThemeToggleButton;
