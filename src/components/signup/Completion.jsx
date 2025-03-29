import React from 'react';
import { useNavigate } from 'react-router-dom';

const Completion = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center shadow-sm bg-base-100 py-5 px-5 round-md">
        <div className="mb-6 text-5xl">🎉</div>
        <p className="text-2xl font-semibold text-gray-800 mb-6">
          회원 가입이 완료되었습니다
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/')}
            className="cursor-pointer w-full py-2 px-4 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200">
            홈으로 가기
          </button>

          <button
            onClick={() => navigate('/signin')}
            className="cursor-pointer w-full py-2 px-4 text-gray-700 bg-indigo-500 rounded-md hover:bg-indigo-400 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200">
            로그인하러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Completion;
