import { useState } from 'react';

const ToggleJson = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <button
        onClick={toggleContent}
        className="flex justify-between items-center w-full text-left p-4 bg-base-200 rounded-lg">
        <span className="text-lg font-medium">JSON 내용 열기/닫기</span>
        <span
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="mt-2 text-base-content">
          <p>{children}</p>
        </div>
      )}
    </div>
  );
};

export default ToggleJson;
